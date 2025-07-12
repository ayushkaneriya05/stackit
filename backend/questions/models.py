from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    color = models.CharField(max_length=30, default="bg-blue-100 text-blue-800")

    def __str__(self):
        return self.name

class Question(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    tags = models.ManyToManyField(Tag, related_name='questions')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='questions')
    created_at = models.DateTimeField(auto_now_add=True)
    views = models.IntegerField(default=0)
    votes = models.IntegerField(default=0)
    is_answered = models.BooleanField(default=False)

    def __str__(self):
        return self.title
