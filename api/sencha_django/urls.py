from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
# from . import views

urlpatterns = [
  path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
  path('admin/', admin.site.urls),
  path('api/users/', include('users.urls')),
  path('api/tickets/', include('tickets.urls'))
]
