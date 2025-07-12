from django.db import models
from django.contrib.auth.models import User


class FlaggedContent(models.Model):
    FLAG_TYPE_CHOICES = (
        ("question", "Question"),
        ("answer", "Answer"),
    )

    flagger = models.ForeignKey(User, on_delete=models.CASCADE)
    content_type = models.CharField(max_length=10, choices=FLAG_TYPE_CHOICES)
    content_id = models.IntegerField()
    reason = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.content_type} flagged by {self.flagger.username}"
