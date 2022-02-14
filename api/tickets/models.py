# from django.contrib.auth.models import User
from django.db import models
from django.conf import settings


class Priority(models.Model):
  name = models.CharField(max_length=20)

  def __str__(self):
    return self.name

class Ticket(models.Model):

    class OpenTickets(models.Manager):
      def get_queryset(self):
        return super().get_queryset().filter(status='open')

    status_options = (
      ('open', 'Open'),
      ('closed', 'Closed')
    )

    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tickets')
    created_at = models.DateTimeField(auto_now_add=True, null=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    priority = models.ForeignKey(Priority, on_delete=models.PROTECT, default=1, related_name='priority')
    status = models.CharField(max_length=10, choices=status_options, default='open')
    closed_at = models.DateTimeField(null=True, blank=True)

    objects = models.Manager() # Default all tickets
    ticketobjects = OpenTickets() # Send only open tickets

    class Meta:
      ordering = ('created_at',)

    def __str__(self):
      return self.title

