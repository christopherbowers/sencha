from rest_framework import serializers
from tickets.models import Ticket
# from django.conf import settings

class TicketSerializer(serializers.ModelSerializer):
  class Meta:
      model = Ticket
      fields = (
        'id',
        'created_by',
        'title',
        'description',
        'priority',
        'status',
      )
