from django.contrib import admin
from users.models import AppUser
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models


class UserAdminConfig(UserAdmin):
    model = AppUser
    search_fields = ('email', 'user_name', 'first_name', 'last_name')
    list_filter = ('email', 'user_name', 'is_active', 'is_staff')
    ordering = ('-date_joined',)
    list_display = ('id', 'email', 'user_name', 'first_name', 'last_name', 'is_active', 'is_staff')
    fieldsets = (
      (None, {'fields': ('email', 'user_name', 'first_name', 'last_name', 'password')}),
      ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
      (None, {
        'classes': ('wide',),
        'fields': ('email', 'user_name', 'first_name', 'last_name', 'password1', 'password2', 'is_active', 'is_staff')}
       ),
    )


admin.site.register(AppUser, UserAdminConfig)
