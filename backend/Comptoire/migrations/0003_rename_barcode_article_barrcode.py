# Generated by Django 5.0.2 on 2024-02-20 14:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Comptoire', '0002_alter_article_p_vente_alter_article_id_s_article_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='article',
            old_name='barcode',
            new_name='barrcode',
        ),
    ]