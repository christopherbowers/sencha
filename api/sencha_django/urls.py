from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('tickets.urls', namespace='tickets')),
    path('api/', include('tickets_api.urls', namespace='tickets_api'))
]
