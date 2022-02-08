from django.contrib import admin
from . import models


@admin.register(models.Ticket)
class PriorityAdmin(admin.ModelAdmin):
    list_display = ('title', 'id', 'status', 'priority', 'created_by')
    # prepopulated_fields = {'slug': ('title',), }


admin.site.register(models.Priority)
