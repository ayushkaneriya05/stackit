import { useState } from 'react';
import { formatTimeAgo } from '../utils/helpers';
import VotingButtons from './VotingButtons';
import { CheckCircle, MessageSquare, Share2, Flag, User } from 'lucide-react';
import toast from 'react-hot-toast';

const AnswerCard = ({ answer, isAccepted = false, onAccept }) => {
  const [showComments, setShowComments] = useState(false);

  const handleAccept = () => {
    if (onAccept) {
      onAccept(answer.id);
      toast.success('Answer marked as accepted!');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.href}#answer-${answer.id}`);
    toast.success('Answer link copied to clipboard!');
  };

  return (
    <div 
      id={`answer-${answer.id}`}
      className={`card p-6 ${isAccepted ? 'ring-2 ring-green-200 bg-green-50' : ''}`}
    >
      {/* Accepted answer badge */}
      {isAccepted && (
        <div className="flex items-center space-x-2 mb-4">
          <div className="bg-green-500 text-white p-1 rounded-full">
            <CheckCircle className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium text-green-700">Accepted Answer</span>
        </div>
      )}

      <div className="flex space-x-4">
        {/* Voting buttons */}
        <div className="flex flex-col items-center space-y-4">
          <VotingButtons 
            initialVotes={answer.votes}
            onVote={(type, previousVote) => {
              console.log('Answer vote:', type, previousVote);
            }}
          />
          
          {!isAccepted && onAccept && (
            <button
              onClick={handleAccept}
              className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors"
              title="Accept this answer"
            >
              <CheckCircle className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Answer content */}
        <div className="flex-1">
          <div 
            className="prose prose-sm max-w-none text-gray-700 leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: answer.content }}
          />

          {/* Answer actions */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-4">
              <button 
                onClick={handleShare}
                className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                <Flag className="w-4 h-4" />
                <span>Flag</span>
              </button>
              <button 
                onClick={() => setShowComments(!showComments)}
                className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Add comment</span>
              </button>
            </div>
          </div>

          {/* Comments section */}
          {showComments && (
            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <textarea
                  placeholder="Add a comment..."
                  className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
                  rows={2}
                />
                <div className="flex justify-end mt-2">
                  <button className="text-sm bg-primary-500 text-white px-3 py-1 rounded hover:bg-primary-600 transition-colors">
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Author and timestamp */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              answered {formatTimeAgo(answer.createdAt)}
            </div>
            
            <div className="flex items-center space-x-3">
              <img
                src={answer.author.avatar}
                alt={answer.author.name}
                className="w-8 h-8 rounded-full ring-2 ring-gray-200"
              />
              <div>
                <div className="text-sm font-medium text-gray-900">{answer.author.username}</div>
                <div className="text-xs text-gray-500 flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span>{answer.author.reputation.toLocaleString()} reputation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;