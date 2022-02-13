from rest_framework import serializers
from tickets.models import Ticket
# from django.conf import settings

class TicketSerializer(serializers.ModelSerializer):

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
