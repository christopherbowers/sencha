from rest_framework import generics
from tickets.models import Ticket
from .serializers import TicketSerializer
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAdminUser, IsAuthenticated


class TicketUserPermission(BasePermission):
  message = 'Editing posts is restricted to the creator only.'

  def has_object_permission(self, request, view, obj):

    if request.user != obj.created_by:
      return False
    else:
      return obj.created_by == request.user


class TicketList(generics.ListAPIView, TicketUserPermission):
  permission_classes = [IsAdminUser]
  queryset = Ticket.objects.all()
  serializer_class = TicketSerializer

class TicketDetails(generics.RetrieveUpdateDestroyAPIView, TicketUserPermission):
  permission_classes = [TicketUserPermission]
  queryset = Ticket.objects.all()
  serializer_class = TicketSerializer

class TicketCreate(generics.CreateAPIView, TicketUserPermission):
  permission_classes = [IsAuthenticated]
  queryset = Ticket.objects.all()
  serializer_class = TicketSerializer
