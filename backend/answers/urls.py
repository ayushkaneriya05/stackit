from django.urls import path
from .views import (
    AnswerCreateView,
    AnswerVoteView,
    AcceptAnswerView,
)

urlpatterns = [
    path("create/", AnswerCreateView.as_view(), name="create_answer"),
    path("<int:answer_id>/vote/", AnswerVoteView.as_view(), name="vote_answer"),
    path("<int:answer_id>/accept/", AcceptAnswerView.as_view(), name="accept_answer"),
]
