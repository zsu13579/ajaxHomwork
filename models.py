from __future__ import unicode_literals

from django.db import models

# Create your models here.

class SearchContent(models.Model):
    searchkey = models.TextField(max_length=500)

    class Meta:
        db_table = 'SearchContent'