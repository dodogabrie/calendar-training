from django.db import models

class Activity(models.Model):
    MANUAL = 'manual'
    GARMIN = 'garmin'

    SOURCE_CHOICES = [
        (MANUAL, 'Manual'),
        (GARMIN, 'Garmin'),
    ]

    source = models.CharField(max_length=10, choices=SOURCE_CHOICES, default=MANUAL)
    activity_id = models.CharField(max_length=100, unique=True, null=True, blank=True)  # For external IDs
    title = models.CharField(max_length=200)
    start_time = models.DateTimeField()
    duration = models.FloatField()  # in seconds
    distance = models.FloatField(null=True, blank=True)  # in meters
    calories = models.FloatField(null=True, blank=True)  # in calories
    elevation_gain = models.FloatField(null=True, blank=True)  # in meters
    time_in_zones = models.JSONField(default=dict, blank=True)  # to store time in heart rate zones

    def __str__(self):
        return f"{self.title} - {self.start_time}"

class TrainingStep(models.Model):
    activity = models.ForeignKey(Activity, related_name='training_steps', on_delete=models.CASCADE)
    step_type = models.CharField(max_length=100)
    duration = models.DurationField(null=True, blank=True)
    distance = models.FloatField(null=True, blank=True)  # in meters

    def __str__(self):
        return f"{self.step_type} - {self.activity.title}"

class TrainingLoop(models.Model):
    activity = models.ForeignKey(Activity, related_name='training_loops', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    repeat_count = models.IntegerField(default=1)  # Number of times this loop repeats
    steps = models.ManyToManyField(TrainingStep, related_name='loops')

    def __str__(self):
        return f"{self.name} - {self.activity.title}"

class HeartRateDataPoint(models.Model):
    activity = models.ForeignKey(Activity, related_name='heart_rate_data', on_delete=models.CASCADE)
    timestamp = models.DateTimeField()
    heart_rate = models.IntegerField()

    def __str__(self):
        return f"{self.timestamp} - {self.heart_rate} BPM"
