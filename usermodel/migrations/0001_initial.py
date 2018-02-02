# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nickname', models.CharField(max_length=42)),
                ('contact_number', models.CharField(max_length=20, blank=True)),
                ('birth_date', models.DateField(null=True, blank=True)),
                ('birth', models.DateField(null=True, blank=True)),
                ('sex', models.SmallIntegerField(default=0, choices=[(0, b''), (1, b'male'), (2, b'female'), (3, b'else')])),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'UserProfile',
                'verbose_name_plural': 'User Profile',
            },
        ),
    ]
