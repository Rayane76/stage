# Generated by Django 5.0.2 on 2024-02-21 14:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Comptoire', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='etatsclient',
            name='etat',
        ),
    ]
