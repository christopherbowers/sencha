from rest_framework import serializers
from .models import Ticket
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'email')

class TicketSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(many=False)

    class Meta:
        model = Ticket
        fields = ('created_by','created_at','title','description','priority','status','closed_at')
