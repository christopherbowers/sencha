from django.contrib.auth.models import User
from django.db import models

class Ticket(models.Model):

    class OpenTickets(models.Manager):
      def get_queryset(self):
        return super().get_queryset().filter(status='open')

    priority_options = (
      ('high', 'High'),
      ('normal', 'Normal'),
      ('low', 'Low')
    )

    status_options = (
      ('open', 'Open'),
      ('closed', 'Closed')
    )

    created_by = models.ForeignKey(User,on_delete=models.CASCADE, related_name='tickets')
    created_at = models.DateTimeField(auto_now_add=True, null=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    priority = models.CharField(max_length=10, choices=priority_options, default='normal')
    status = models.CharField(max_length=10, choices=status_options, default='normal')
    closed_at = models.DateTimeField(null=True, blank=True)

    tickets = models.Manager() # Default all tickets
    open_tickets = OpenTickets() # Send only open tickets

    class Meta:
      ordering = ('-created_at',)

    def __str__(self):
      return self.title

