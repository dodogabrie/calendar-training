from rest_framework import serializers
from .models import TrainingEvent, TrainingStep

class TrainingStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingStep
        fields = '__all__'

class TrainingEventSerializer(serializers.ModelSerializer):
    steps = TrainingStepSerializer(many=True, read_only=True)

    class Meta:
        model = TrainingEvent
        fields = '__all__'
