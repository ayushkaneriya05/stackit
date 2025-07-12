from rest_framework import serializers
from .models import Question, Tag

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'color']

class QuestionSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(queryset=Tag.objects.all(), many=True, write_only=True)
    author = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'title', 'content', 'tags', 'tag_ids', 'author', 'created_at', 'views', 'votes', 'is_answered']

    def create(self, validated_data):
        tags = validated_data.pop('tag_ids')
        question = Question.objects.create(**validated_data)
        question.tags.set(tags)
        return question

from rest_framework import serializers
from .models import Tag

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'color']  # include `color` if used in frontend
