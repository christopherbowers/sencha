from django.urls import path
from .views import TicketList, TicketDetails, TicketCreate

# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

app_name = 'tickets_api'

urlpatterns = [
  path('<int:pk>/', TicketDetails.as_view(), name='ticket_detail'),
  path('', TicketList.as_view(), name='ticket_list'),
  path('create/', TicketCreate.as_view(), name='ticket_create'),
]
