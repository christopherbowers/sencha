from django.urls import path
from .views import CreateUser, BlacklistTokenUpdateView, UserDetails

app_name = 'users'

urlpatterns = [
    path('register/', CreateUser.as_view(), name="regster_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),
    path('<int:pk>/', UserDetails.as_view())
]
