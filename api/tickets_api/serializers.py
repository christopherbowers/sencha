from rest_framework import serializers
from tickets.models import Ticket


class TicketSerializer(serializers.ModelSerializer):

  class Meta:
      model = Ticket
      fields = (
        'id',
        'created_by',
        'title',
        'description',
        'priority',
        'created_at',
        'status',
      )

class TicketStringSerializer(serializers.ModelSerializer):

  priority = serializers.StringRelatedField()
  created_by = serializers.StringRelatedField()

  class Meta:
      model = Ticket
      fields = (
        'id',
        'created_by',
        'title',
        'description',
        'priority',
        'created_at',
        'status',
      )
