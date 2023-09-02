from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    # title = models.CharField(max_length=100)
    # host = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now= True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.body