# events/serializers.py
from rest_framework import serializers
from events.models import Activity, TrainingStep, TrainingLoop, HeartRateDataPoint

class HeartRateDataPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeartRateDataPoint
        fields = ['timestamp', 'heart_rate']

class TrainingStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingStep
        fields = ['id', 'step_type', 'duration', 'distance']

class TrainingLoopSerializer(serializers.ModelSerializer):
    steps = TrainingStepSerializer(many=True)

    class Meta:
        model = TrainingLoop
        fields = ['id', 'name', 'repeat_count', 'steps']

class ActivitySerializer(serializers.ModelSerializer):
    training_steps = TrainingStepSerializer(many=True, read_only=True)
    training_loops = TrainingLoopSerializer(many=True, read_only=True)
    heart_rate_data = HeartRateDataPointSerializer(many=True, read_only=True)

    class Meta:
        model = Activity
        fields = [
            'id', 'activity_id', 'title', 'source', 'start_time',
            'duration', 'distance', 'calories', 'elevation_gain',
            'time_in_zones', 'training_steps', 'training_loops',
            'heart_rate_data'
        ]

class ActivityCreateSerializer(serializers.ModelSerializer):
    training_steps = TrainingStepSerializer(many=True)
    training_loops = TrainingLoopSerializer(many=True)
    heart_rate_data = HeartRateDataPointSerializer(many=True)

    class Meta:
        model = Activity
        fields = [
            'id', 'activity_id', 'title', 'source', 'start_time',
            'duration', 'distance', 'calories', 'elevation_gain',
            'time_in_zones', 'training_steps', 'training_loops',
            'heart_rate_data'
        ]

    def create(self, validated_data):
        training_steps_data = validated_data.pop('training_steps')
        training_loops_data = validated_data.pop('training_loops')
        heart_rate_data_data = validated_data.pop('heart_rate_data')

        activity = Activity.objects.create(**validated_data)

        for step_data in training_steps_data:
            TrainingStep.objects.create(activity=activity, **step_data)

        for loop_data in training_loops_data:
            steps = loop_data.pop('steps')
            loop = TrainingLoop.objects.create(activity=activity, **loop_data)
            for step_data in steps:
                step = TrainingStep.objects.create(activity=activity, **step_data)
                loop.steps.add(step)

        for hr_data in heart_rate_data_data:
            HeartRateDataPoint.objects.create(activity=activity, **hr_data)

        return activity
