# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-04 16:31
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usermodel', '0008_auto_20171004_1653'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='image',
            field=models.ImageField(default=b'/UserImages/default.png', null=True, upload_to=b'UserImages/'),
        ),
    ]
