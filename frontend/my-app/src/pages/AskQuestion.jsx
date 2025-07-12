import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RichTextEditor from '../components/RichTextEditor';
import TagInput from '../components/TagInput';
import { currentUser } from '../data/mockData';
import toast from 'react-hot-toast';
import { Save, Eye, AlertCircle } from 'lucide-react';

const AskQuestion = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters';
    } else if (title.length > 150) {
      newErrors.title = 'Title must be less than 150 characters';
    }

    if (!content.trim() || content === '<p><br></p>') {
      newErrors.content = 'Question description is required';
    } else if (content.length < 30) {
      newErrors.content = 'Description must be at least 30 characters';
    }

    if (selectedTags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    } else if (selectedTags.length > 5) {
      newErrors.tags = 'Maximum 5 tags allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create new question object
      const newQuestion = {
        id: Date.now(),
        title: title.trim(),
        content: content,
        author: currentUser,
        tags: selectedTags,
        votes: 0,
        answers: 0,
        views: 0,
        createdAt: new Date().toISOString(),
        isAnswered: false
      };

      toast.success('Question published successfully!');
      navigate('/questions');
    } catch (error) {
      console.error('Failed to create question:', error);
      toast.error('Failed to publish question. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = title.trim() && content.trim() && selectedTags.length > 0 && !isSubmitting;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Ask a Question</h1>
        <p className="text-gray-600 mt-2">
          Get help from the community by asking a detailed question about your problem.
        </p>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Writing a good question</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Be specific and clear in your title</li>
              <li>• Provide context and what you've tried</li>
              <li>• Include relevant code snippets or error messages</li>
              <li>• Add appropriate tags to help others find your question</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <div className="card p-6">
          <label htmlFor="title" className="block text-lg font-semibold text-gray-900 mb-2">
            Question Title *
          </label>
          <p className="text-sm text-gray-600 mb-4">
            Be specific and imagine you're asking a question to another person.
          </p>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) {
                setErrors({ ...errors, title: null });
              }
            }}
            placeholder="e.g., How do I implement authentication in React with JWT tokens?"
            className={`w-full px-4 py-3 border rounded-lg text-lg font-medium transition-colors ${
              errors.title 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
            }`}
            maxLength={150}
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-2">{errors.title}</p>
          )}
          <div className="text-right text-sm text-gray-500 mt-1">
            {title.length}/150 characters
          </div>
        </div>

        {/* Content */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="content" className="block text-lg font-semibold text-gray-900">
              Question Details *
            </label>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700"
            >
              <Eye className="w-4 h-4" />
              <span>{showPreview ? 'Edit' : 'Preview'}</span>
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Include all the information someone would need to answer your question.
          </p>
          
          {showPreview ? (
            <div className="border border-gray-300 rounded-lg p-4 min-h-[200px] bg-gray-50">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Preview:</h4>
              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: content || '<p class="text-gray-400">No content to preview</p>' }}
              />
            </div>
          ) : (
            <RichTextEditor
              value={content}
              onChange={(value) => {
                setContent(value);
                if (errors.content) {
                  setErrors({ ...errors, content: null });
                }
              }}
              placeholder="Describe your problem in detail. Include what you've tried, error messages, and relevant code snippets..."
            />
          )}
          
          {errors.content && (
            <p className="text-red-600 text-sm mt-2">{errors.content}</p>
          )}
        </div>

        {/* Tags */}
        <div className="card p-6">
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            Tags *
          </label>
          <p className="text-sm text-gray-600 mb-4">
            Add tags to describe what your question is about. Maximum 5 tags.
          </p>
          
          <TagInput
            selectedTags={selectedTags}
            onTagsChange={(tags) => {
              setSelectedTags(tags);
              if (errors.tags) {
                setErrors({ ...errors, tags: null });
              }
            }}
            maxTags={5}
          />
          
          {errors.tags && (
            <p className="text-red-600 text-sm mt-2">{errors.tags}</p>
          )}
        </div>

        {/* Submit buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/questions')}
            className="btn-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!canSubmit}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              canSubmit
                ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Publish Question</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AskQuestion;