from django.db import models

class TrainingEvent(models.Model):
    DURATION = 'DUR'
    DISTANCE = 'DIS'

    EVENT_TYPE_CHOICES = [
        (DURATION, 'Duration'),
        (DISTANCE, 'Distance'),
    ]

    title = models.CharField(verbose_name='Titolo', max_length=200)
    event_type = models.CharField(verbose_name='Tipo Allenamento', max_length=3, choices=EVENT_TYPE_CHOICES)
    start_time = models.DateTimeField()
    duration = models.DurationField(null=True, blank=True)
    distance = models.FloatField(null=True, blank=True)  # in kilometers

    def __str__(self):
        return str(self.title)

class TrainingStep(models.Model):
    training_event = models.ForeignKey(TrainingEvent, related_name='steps', on_delete=models.CASCADE)
    step_number = models.PositiveIntegerField()
    description = models.TextField()
    duration = models.DurationField(null=True, blank=True)
    distance = models.FloatField(null=True, blank=True)  # in kilometers
    elevation_gain = models.FloatField(null=True, blank=True)
    rest_duration = models.DurationField(null=True, blank=True)

    def __str__(self):
        return f"{self.training_event.title} - Step {self.step_number}"





