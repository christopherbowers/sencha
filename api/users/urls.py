from django.urls import path
from .views import CreateUser, BlacklistTokenUpdateView, UserDetails, UserTickets

app_name = 'users'

urlpatterns = [
  path('register/', CreateUser.as_view()),
  path('logout/blacklist/', BlacklistTokenUpdateView.as_view()),
  path('<int:pk>/', UserDetails.as_view()),
  path('<int:pk>/tickets/', UserTickets.as_view())
]
