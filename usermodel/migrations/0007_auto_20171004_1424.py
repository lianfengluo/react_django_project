# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-04 06:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usermodel', '0006_auto_20171004_1406'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='image',
            field=models.ImageField(null=True, upload_to=b'media/images/'),
        ),
    ]
