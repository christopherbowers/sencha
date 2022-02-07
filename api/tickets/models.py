from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class Ticket(models.Model):
    created_by = models.ForeignKey(User,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    priority = models.CharField(max_length=25)
    status = models.CharField(max_length=25)
    closed_at = models.DateTimeField(blank=True)
