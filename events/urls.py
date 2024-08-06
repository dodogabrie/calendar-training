# events/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ActivityViewSet, TrainingStepViewSet

router = DefaultRouter()
router.register(r'activities', ActivityViewSet)
router.register(r'training-steps', TrainingStepViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
