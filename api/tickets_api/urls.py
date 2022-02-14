from django.urls import path
from .views import OpenTicketList, TicketList, TicketDetails, TicketCreate, TicketDetailsAdmin

app_name = 'tickets_api'

urlpatterns = [
  path('<int:pk>/', TicketDetails.as_view()),
  path('admin/<int:pk>/', TicketDetailsAdmin.as_view()),
  path('', OpenTicketList.as_view()),
  path('all/', TicketList.as_view()),
  path('create/', TicketCreate.as_view()),
]
