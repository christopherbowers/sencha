# Generated by Django 4.0.2 on 2022-02-12 16:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tickets', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='priority',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, related_name='priority', to='tickets.priority'),
        ),
    ]