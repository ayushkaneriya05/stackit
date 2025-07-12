from django.db import models
from django.contrib.auth.models import User
from questions.models import Question


class Answer(models.Model):
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="answers"
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()  # Rich text (HTML)
    is_accepted = models.BooleanField(default=False)
    votes = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Answer by {self.user.username} on {self.question.title}"


class AnswerVote(models.Model):
    VOTE_CHOICES = (
        (1, "Upvote"),
        (-1, "Downvote"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    answer = models.ForeignKey(
        Answer, on_delete=models.CASCADE, related_name="votes_detail"
    )
    vote = models.IntegerField(choices=VOTE_CHOICES)

    class Meta:
        unique_together = ("user", "answer")

    def __str__(self):
        return (
            f"{self.user.username} voted {self.get_vote_display()} on {self.answer.id}"
        )
