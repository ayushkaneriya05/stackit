from django.db import models
from django.contrib.auth.models import User


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Question(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()  # Rich text (HTML)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, related_name="questions")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
