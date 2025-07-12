import { useState } from 'react';
import { ChevronUp, ChevronDown, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const VotingButtons = ({ initialVotes, onVote, userVote = null, size = 'default' }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [currentVote, setCurrentVote] = useState(userVote);
  const { isAuthenticated } = useAuth();

  const handleVote = (type) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to vote');
      return;
    }

    if (currentVote === type) {
      // Remove vote if clicking the same button
      const change = type === 'up' ? -1 : 1;
      setVotes(votes + change);
      setCurrentVote(null);
      toast.success('Vote removed');
    } else {
      // Add new vote or change existing vote
      const change = type === 'up' ? 1 : -1;
      const previousChange = currentVote === 'up' ? -1 : currentVote === 'down' ? 1 : 0;
      setVotes(votes + change + previousChange);
      setCurrentVote(type);
      toast.success(type === 'up' ? 'Upvoted!' : 'Downvoted!');
    }

    if (onVote) {
      onVote(type, currentVote);
    }
  };

  const buttonSize = size === 'large' ? 'p-3' : 'p-2';
  const iconSize = size === 'large' ? 'w-8 h-8' : 'w-6 h-6';
  const textSize = size === 'large' ? 'text-2xl' : 'text-lg';

  return (
    <div className="flex flex-col items-center space-y-2">
      {isAuthenticated ? (
        <>
          <button
            onClick={() => handleVote('up')}
            className={`${buttonSize} rounded-lg transition-all duration-200 ${
              currentVote === 'up'
                ? 'bg-green-100 text-green-600 shadow-md'
                : 'text-gray-400 hover:text-green-500 hover:bg-green-50'
            }`}
            title="Upvote"
          >
            <ChevronUp className={iconSize} strokeWidth={2.5} />
          </button>
          
          <span className={`font-bold ${textSize} ${
            currentVote === 'up' 
              ? 'text-green-600' 
              : currentVote === 'down' 
                ? 'text-red-500' 
                : 'text-gray-700'
          }`}>
            {votes}
          </span>
          
          <button
            onClick={() => handleVote('down')}
            className={`${buttonSize} rounded-lg transition-all duration-200 ${
              currentVote === 'down'
                ? 'bg-red-100 text-red-600 shadow-md'
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
            title="Downvote"
          >
            <ChevronDown className={iconSize} strokeWidth={2.5} />
          </button>
        </>
      ) : (
        <>
          <button
            disabled
            className={`${buttonSize} rounded-lg text-gray-300 cursor-not-allowed`}
            title="Sign in to vote"
          >
            <ChevronUp className={iconSize} strokeWidth={2.5} />
          </button>
          
          <span className={`font-bold ${textSize} text-gray-700`}>
            {votes}
          </span>
          
          <button
            disabled
            className={`${buttonSize} rounded-lg text-gray-300 cursor-not-allowed`}
            title="Sign in to vote"
          >
            <ChevronDown className={iconSize} strokeWidth={2.5} />
          </button>
          
          {/* Login prompt tooltip */}
          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap">
              <div className="flex items-center space-x-1">
                <LogIn className="w-3 h-3" />
                <span>Sign in to vote</span>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VotingButtons;