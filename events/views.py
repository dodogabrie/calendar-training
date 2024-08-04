from rest_framework import viewsets
from .models import TrainingEvent, TrainingStep
from .serializers import TrainingEventSerializer, TrainingStepSerializer

class TrainingEventViewSet(viewsets.ModelViewSet):
    queryset = TrainingEvent.objects.all()
    serializer_class = TrainingEventSerializer

class TrainingStepViewSet(viewsets.ModelViewSet):
    queryset = TrainingStep.objects.all()
    serializer_class = TrainingStepSerializer
