from rest_framework import generics
from tickets.models import Ticket
from .serializers import TicketSerializer


class TicketList(generics.ListCreateAPIView):
  queryset = Ticket.open_tickets.all()
  serializer_class = TicketSerializer

class TicketDetails(generics.RetrieveUpdateDestroyAPIView):
  queryset = Ticket.tickets.all()
  serializer_class = TicketSerializer
