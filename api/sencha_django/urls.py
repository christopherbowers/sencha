from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
  path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
  path('admin/', admin.site.urls),
  path('', include('tickets.urls', namespace='tickets')),
  path('api/tickets/', include('tickets_api.urls', namespace='tickets_api')),
  path('api/users/', include('users.urls')),
  path('api/', include('djoser.urls')),
]
