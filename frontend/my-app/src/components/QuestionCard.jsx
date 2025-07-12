import { Link } from 'react-router-dom';
import { formatTimeAgo, formatNumber, stripHtml, truncateText } from '../utils/helpers';

const QuestionCard = ({ question }) => {
  const excerpt = truncateText(stripHtml(question.content), 150);

  return (
    <div className="card p-6 mb-4">
      {/* Question stats */}
      <div className="flex items-start space-x-4">
        {/* Vote and answer counts */}
        <div className="flex flex-col items-center space-y-2 text-sm text-gray-500 min-w-16">
          <div className="flex flex-col items-center">
            <span className="font-semibold text-gray-900">{question.votes}</span>
            <span>votes</span>
          </div>
          <div className={`flex flex-col items-center ${question.isAnswered ? 'text-accent-600' : ''}`}>
            <span className={`font-semibold ${question.isAnswered ? 'text-accent-600' : 'text-gray-900'}`}>
              {question.answers}
            </span>
            <span>answers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-gray-900">{formatNumber(question.views)}</span>
            <span>views</span>
          </div>
        </div>

        {/* Question content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Link
                to={`/question/${question.id}`}
                className="text-xl font-semibold text-primary-600 hover:text-primary-700 transition-colors line-clamp-2"
              >
                {question.title}
              </Link>
              
              {/* Question excerpt */}
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                {excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {question.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className={`tag-badge ${tag.color}`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Answered badge */}
            {question.isAnswered && (
              <div className="ml-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-100 text-accent-800">
                  ✓ Answered
                </span>
              </div>
            )}
          </div>

          {/* Author and timestamp */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <img
                src={question.author.avatar}
                alt={question.author.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm text-gray-600">{question.author.username}</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-500">{formatTimeAgo(question.createdAt)}</span>
            </div>
            
            <div className="text-sm text-gray-500">
              {formatNumber(question.author.reputation)} reputation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;