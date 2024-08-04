from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TrainingEventViewSet, TrainingStepViewSet

router = DefaultRouter()
router.register(r'training_events', TrainingEventViewSet)
router.register(r'training_steps', TrainingStepViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
