# events/management/commands/import_activities.py
import datetime
import json
from django.core.management.base import BaseCommand
from garminconnect import Garmin, GarminConnectConnectionError, GarminConnectTooManyRequestsError, GarminConnectAuthenticationError
from events.models import Activity, TrainingStep, HeartRateDataPoint

class Command(BaseCommand):
    help = 'Fetch activities from Garmin Connect and store them in the database'

    def add_arguments(self, parser):
        parser.add_argument('email', type=str, help='Email address for Garmin Connect')
        parser.add_argument('password', type=str, help='Password for Garmin Connect')
        parser.add_argument(
            '--days',
            type=int,
            default=None,
            help='Number of days of activities to fetch from Garmin Connect'
        )

    def handle(self, *args, **kwargs):
        email = kwargs['email']
        password = kwargs['password']
        days = kwargs['days']

        try:
            client = Garmin(email, password)
            client.login()
        except (GarminConnectConnectionError, GarminConnectTooManyRequestsError, GarminConnectAuthenticationError) as err:
            self.stdout.write(self.style.ERROR(f"Error connecting to Garmin Connect: {err}"))
            return

        # Calculate the date range if 'days' argument is provided
        if days:
            end_date = datetime.datetime.now()
            start_date = end_date - datetime.timedelta(days=days)
            activities = client.get_activities_by_date(start_date.strftime('%Y-%m-%d'), end_date.strftime('%Y-%m-%d'))
        else:
            activities = client.get_activities(0, 10)  # Fetch the last 10 activities

        for activity in activities:
            activity_id = activity['activityId']
            title = activity['activityName']
            start_time = datetime.datetime.strptime(activity['startTimeLocal'], '%Y-%m-%d %H:%M:%S')
            duration = activity['duration']
            distance = activity['distance']
            calories = activity['calories']
            elevation_gain = activity.get('elevationGain', 0)

            # Save or update the activity
            activity_obj, created = Activity.objects.update_or_create(
                activity_id=activity_id,
                defaults={
                    'source': Activity.GARMIN,
                    'title': title,
                    'start_time': start_time,
                    'duration': duration,
                    'distance': distance,
                    'calories': calories,
                    'elevation_gain': elevation_gain,
                    'time_in_zones': {},  # Placeholder for time in heart rate zones
                }
            )

            # Clear previous heart rate data points if updating
            if not created:
                HeartRateDataPoint.objects.filter(activity=activity_obj).delete()
                TrainingStep.objects.filter(activity=activity_obj).delete()

            # Fetch and save heart rate data points and heart rate zones
            try:
                # Fetch and save heart rate time zones
                hr_zones = client.get_activity_hr_in_timezones(activity_id)
                activity_obj.time_in_zones = hr_zones
                activity_obj.save()
            except Exception as e:
                self.stdout.write(self.style.WARNING(f"Could not fetch heart rate data for activity {activity_id}: {e}"))

            # Get and save training steps
            try:
                activity_details = client.get_activity_details(activity_id)
                steps_data = activity_details.get('activityDetailMetrics', [])
                for step in steps_data:
                    step_type = step.get('metricName', 'Step')
                    duration = step.get('duration', None)
                    distance = step.get('distance', None)
                    TrainingStep.objects.create(
                        activity=activity_obj,
                        step_type=step_type,
                        duration=datetime.timedelta(seconds=duration) if duration else None,
                        distance=distance
                    )
            except Exception as e:
                self.stdout.write(self.style.WARNING(f"Could not fetch training steps for activity {activity_id}: {e}"))

        self.stdout.write(self.style.SUCCESS('Successfully fetched and stored Garmin activities with steps.'))
