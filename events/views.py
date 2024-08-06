# events/views.py
from rest_framework import viewsets
from .models import Activity, TrainingStep
from .serializers import ActivitySerializer, TrainingStepSerializer, ActivityCreateSerializer

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

    def get_serializer_class(self):
        if self.action in ['create', 'update']:
            return ActivityCreateSerializer
        return ActivitySerializer

class TrainingStepViewSet(viewsets.ModelViewSet):
    queryset = TrainingStep.objects.all()
    serializer_class = TrainingStepSerializer
