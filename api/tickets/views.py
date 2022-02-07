from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializer import TicketSerializer
from .models import Ticket

class CreateTicket(generics.CreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

class ListTickets(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

class UpdateTicket(generics.RetrieveUpdateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

class DeleteTicket(generics.DestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
