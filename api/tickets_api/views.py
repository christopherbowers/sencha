from rest_framework import generics
from tickets.models import Ticket
from .serializers import TicketSerializer
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAdminUser, IsAuthenticated
# IsADjangoModelPermissionsOrAnonReadOnly


class TicketUserWritePermission(BasePermission):
  message = 'Editing posts is restricted to the creator only.'

  def has_object_permission(self, request, view, obj):

    # if request.method in SAFE_METHODS:
    if request.user != obj.created_by:
      return False

    else:
      return obj.created_by == request.user


class TicketList(generics.ListCreateAPIView, TicketUserWritePermission):
  permission_classes = [TicketUserWritePermission]
  queryset = Ticket.ticketobjects.all()
  serializer_class = TicketSerializer

class TicketDetails(generics.RetrieveUpdateDestroyAPIView, TicketUserWritePermission):
  permission_classes = [TicketUserWritePermission]
  queryset = Ticket.objects.all()
  serializer_class = TicketSerializer
