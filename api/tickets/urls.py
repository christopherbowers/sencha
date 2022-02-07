from django.urls import path
from . import views

urlpatterns = [
    path('', views.ListTickets.as_view()),
    path('create/', views.CreateTicket.as_view()),
    path('<int:pk>/', views.UpdateTicket.as_view()),
    path('<int:pk>/delete/', views.DeleteTicket.as_view()),
]
