from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    """
    UserProfile
    """
    SEX_CHOICES = {
        0:'',
        1: 'male',
        2: 'female',
        3: 'else',
    }
    user = models.OneToOneField(User, on_delete = models.CASCADE)
    nickname = models.CharField(null = False,max_length = 20)
    phone = models.CharField(max_length = 20, unique = True, null = True)
    birth_date = models.DateField(null = True, blank = True)
    sex = models.SmallIntegerField(default = 0, choices = SEX_CHOICES.items())
    image = models.ImageField(upload_to = 'UserImages/',blank = True, default = '/UserImages/default.png')
    def __unicode__(self):
        return self.username
    class Meta:
        db_table = 'UserProfile'
        verbose_name_plural="User Profile"


# class UserTable(models.Model):
#     """
#     UserTable
#     """
#     SEX_CHOICES = {
#         0:'',
#         1: 'male',
#         2: 'female',
#         3: 'else',
#     }
#     # user = models.OneToOneField(User, on_delete=models.CASCADE)
#     username=models.CharField(null=False,max_length=18)
#     password=models.CharField(null=False,max_length=88)
#     email=models.EmailField(null=False)
#     nickname=models.CharField(null=False,max_length=42)
#     contact_number = models.CharField(max_length=20, blank=True, null=False)
#     birth_date = models.DateField(null=True, blank=True)
#     birth = models.DateField(blank=True, null=True)
#     sex = models.SmallIntegerField(default=0, choices=SEX_CHOICES.items())
#     def __unicode__(self):
#         return self.username
#     class Meta:
#         db_table = 'UserTable'
#         verbose_name_plural="User Table"