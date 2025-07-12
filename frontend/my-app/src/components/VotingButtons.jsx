import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const VotingButtons = ({ initialVotes, onVote, userVote = null, size = 'default' }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [currentVote, setCurrentVote] = useState(userVote);

  const handleVote = (type) => {
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
    </div>
  );
};

export default VotingButtons;