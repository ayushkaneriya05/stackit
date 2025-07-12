import { useState } from 'react';
import { Link } from 'react-router-dom';
import { questions } from '../data/mockData';
import QuestionCard from '../components/QuestionCard';

const Home = () => {
  const [sortBy, setSortBy] = useState('newest');
  const [filteredQuestions, setFilteredQuestions] = useState(questions);

  // Sort questions based on selected criteria
  const sortQuestions = (criteria) => {
    const sorted = [...questions].sort((a, b) => {
      switch (criteria) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'active':
          return b.answers - a.answers;
        case 'votes':
          return b.votes - a.votes;
        case 'unanswered':
          return a.isAnswered - b.isAnswered;
        default:
          return 0;
      }
    });
    
    if (criteria === 'unanswered') {
      return sorted.filter(q => !q.isAnswered);
    }
    
    setFilteredQuestions(sorted);
    setSortBy(criteria);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Questions</h1>
          <p className="text-gray-600 mt-1">{questions.length} questions</p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <Link to="/ask" className="btn-primary">
            Ask Question
          </Link>
        </div>
      </div>

      {/* Sorting tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'newest', label: 'Newest' },
            { key: 'active', label: 'Active' },
            { key: 'votes', label: 'Most Votes' },
            { key: 'unanswered', label: 'Unanswered' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => sortQuestions(tab.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                sortBy === tab.key
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.712-3.714M14 40v-4a9.971 9.971 0 01.712-3.714m0 0A9.971 9.971 0 0118 32a9.971 9.971 0 013.288.712M30 20a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No questions found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by asking a question.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;