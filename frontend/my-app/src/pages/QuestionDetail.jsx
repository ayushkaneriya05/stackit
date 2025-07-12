import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { questions, answers, currentUser } from '../data/mockData';
import AnswerCard from '../components/AnswerCard';
import RichTextEditor from '../components/RichTextEditor';
import VotingButtons from '../components/VotingButtons';
import { formatTimeAgo, formatNumber } from '../utils/helpers';
import toast from 'react-hot-toast';
import { 
  Bookmark, 
  Share2, 
  Edit, 
  Flag, 
  MessageSquare,
  Eye,
  Calendar,
  User,
  CheckCircle
} from 'lucide-react';

const QuestionDetail = () => {
  const { id } = useParams();
  // Convert id to number for proper comparison
  const questionId = parseInt(id);
  const question = questions.find(q => q.id === questionId);
  const questionAnswers = answers.filter(a => a.questionId === questionId);
  const [newAnswer, setNewAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!question) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Question not found</h1>
          <p className="text-gray-600 mt-2">The question you're looking for doesn't exist or has been removed.</p>
          <Link to="/questions" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
            Back to questions
          </Link>
        </div>
      </div>
    );
  }

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim() || newAnswer === '<p><br></p>') {
      toast.error('Please write an answer before submitting');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newAnswerObj = {
        id: Date.now(),
        questionId: questionId,
        content: newAnswer,
        author: currentUser,
        votes: 0,
        isAccepted: false,
        createdAt: new Date().toISOString()
      };

      toast.success('Answer submitted successfully!');
      setNewAnswer('');
    } catch (error) {
      console.error('Failed to submit answer:', error);
      toast.error('Failed to submit answer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const acceptedAnswer = questionAnswers.find(a => a.isAccepted);
  const otherAnswers = questionAnswers.filter(a => !a.isAccepted);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link to="/questions" className="text-gray-500 hover:text-gray-700 transition-colors">
              Questions
            </Link>
          </li>
          <li>
            <span className="text-gray-400 mx-2">/</span>
            <span className="text-gray-900 font-medium">
              {question.title.length > 60 ? question.title.substring(0, 60) + '...' : question.title}
            </span>
          </li>
        </ol>
      </nav>

      {/* Question */}
      <div className="card p-8 mb-8">
        <div className="flex items-start space-x-6">
          {/* Voting sidebar */}
          <div className="flex flex-col items-center space-y-4">
            <VotingButtons 
              initialVotes={question.votes}
              size="large"
              onVote={(type, previousVote) => {
                console.log('Question vote:', type, previousVote);
              }}
            />

            <button
              onClick={handleBookmark}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked
                  ? 'text-yellow-600 bg-yellow-100'
                  : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
            >
              <Bookmark className="w-6 h-6" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Question content */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{question.title}</h1>
            
            {/* Question meta */}
            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Asked {formatTimeAgo(question.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{formatNumber(question.views)} views</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare className="w-4 h-4" />
                <span>{question.answers} answers</span>
              </div>
              {question.isAnswered && (
                <div className="flex items-center space-x-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Answered</span>
                </div>
              )}
            </div>

            {/* Question body */}
            <div 
              className="prose prose-lg max-w-none text-gray-700 mb-6"
              dangerouslySetInnerHTML={{ __html: question.content }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {question.tags.map((tag) => (
                <Link
                  key={tag.id}
                  to={`/tags/${tag.name}`}
                  className={`tag-badge ${tag.color} hover:opacity-80 transition-opacity`}
                >
                  {tag.name}
                </Link>
              ))}
            </div>

            {/* Question actions and author */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex space-x-4">
                <button 
                  onClick={handleShare}
                  className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
                <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  <Flag className="w-4 h-4" />
                  <span>Flag</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <img
                  src={question.author.avatar}
                  alt={question.author.name}
                  className="w-10 h-10 rounded-full ring-2 ring-gray-200"
                />
                <div>
                  <div className="font-medium text-gray-900">{question.author.username}</div>
                  <div className="text-sm text-gray-500 flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{formatNumber(question.author.reputation)} reputation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answers section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {questionAnswers.length} Answer{questionAnswers.length !== 1 ? 's' : ''}
          </h2>
          {questionAnswers.length > 1 && (
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option value="votes">Sort by votes</option>
              <option value="newest">Sort by newest</option>
              <option value="oldest">Sort by oldest</option>
            </select>
          )}
        </div>

        {/* Accepted answer first */}
        {acceptedAnswer && (
          <div className="mb-6">
            <AnswerCard answer={acceptedAnswer} isAccepted={true} />
          </div>
        )}

        {/* Other answers */}
        <div className="space-y-6">
          {otherAnswers.map((answer) => (
            <AnswerCard key={answer.id} answer={answer} />
          ))}
        </div>

        {questionAnswers.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No answers yet</h3>
            <p className="text-gray-600">Be the first to answer this question!</p>
          </div>
        )}
      </div>

      {/* Answer form */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Answer</h3>
        <p className="text-sm text-gray-600 mb-4">
          Thanks for contributing an answer! Please be sure to answer the question and provide details.
        </p>
        
        <form onSubmit={handleAnswerSubmit}>
          <RichTextEditor
            value={newAnswer}
            onChange={setNewAnswer}
            placeholder="Write your answer here. Be specific and provide examples if possible..."
          />
          
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500">
              <p>By posting your answer, you agree to our terms of service.</p>
            </div>
            <button
              type="submit"
              disabled={!newAnswer.trim() || newAnswer === '<p><br></p>' || isSubmitting}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                newAnswer.trim() && newAnswer !== '<p><br></p>' && !isSubmitting
                  ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Post Your Answer</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionDetail;