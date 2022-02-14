from rest_framework import generics
from tickets.models import Ticket
from .serializers import TicketSerializer, TicketStringSerializer
from rest_framework.permissions import BasePermission, IsAdminUser, IsAuthenticated


class TicketUserPermission(BasePermission):
  message = 'Editing posts is restricted to the creator only.'

  def has_object_permission(self, request, view, obj):

    if request.user != obj.created_by:
      return False
    else:
      return obj.created_by == request.user


class TicketList(generics.ListAPIView):
  permission_classes = [IsAdminUser]
  queryset = Ticket.objects.all()
  serializer_class = TicketStringSerializer

class OpenTicketList(generics.ListAPIView):
  permission_classes = [IsAdminUser]
  queryset = Ticket.ticketobjects.all()
  serializer_class = TicketStringSerializer

class TicketDetails(generics.RetrieveUpdateDestroyAPIView, TicketUserPermission):
  permission_classes = [TicketUserPermission]
  queryset = Ticket.objects.all()
  serializer_class = TicketStringSerializer

class TicketEditDetails(generics.RetrieveUpdateDestroyAPIView, TicketUserPermission):
  permission_classes = [TicketUserPermission]
  queryset = Ticket.objects.all()
  serializer_class = TicketSerializer

class TicketDetailsAdmin(generics.RetrieveUpdateDestroyAPIView):
  permission_classes = [IsAdminUser]
  queryset = Ticket.objects.all()
  serializer_class = TicketStringSerializer

class TicketCreate(generics.CreateAPIView):
  permission_classes = [IsAuthenticated]
  queryset = Ticket.objects.all()
  serializer_class = TicketSerializer
