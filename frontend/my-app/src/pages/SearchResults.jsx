import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { questions } from '../data/mockData';
import QuestionCard from '../components/QuestionCard';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [filterBy, setFilterBy] = useState('all');
  
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query.trim()) {
      performSearch(query);
    }
  }, [query, sortBy, filterBy]);

  const performSearch = async (searchQuery) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter questions based on search query
      let filteredQuestions = questions.filter(question => {
        const searchTerm = searchQuery.toLowerCase();
        const titleMatch = question.title.toLowerCase().includes(searchTerm);
        const contentMatch = question.content.toLowerCase().includes(searchTerm);
        const tagsMatch = question.tags.some(tag => 
          tag.name.toLowerCase().includes(searchTerm)
        );
        
        return titleMatch || contentMatch || tagsMatch;
      });

      // Apply filters
      if (filterBy === 'unanswered') {
        filteredQuestions = filteredQuestions.filter(q => q.answers === 0);
      } else if (filterBy === 'answered') {
        filteredQuestions = filteredQuestions.filter(q => q.answers > 0);
      } else if (filterBy === 'recent') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        filteredQuestions = filteredQuestions.filter(q => 
          new Date(q.createdAt) > oneWeekAgo
        );
      }

      // Apply sorting
      switch (sortBy) {
        case 'newest':
          filteredQuestions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'oldest':
          filteredQuestions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        case 'votes':
          filteredQuestions.sort((a, b) => b.votes - a.votes);
          break;
        case 'answers':
          filteredQuestions.sort((a, b) => b.answers - a.answers);
          break;
        case 'views':
          filteredQuestions.sort((a, b) => b.views - a.views);
          break;
        default: // relevance - keep original order
          break;
      }

      setSearchResults(filteredQuestions);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleFilterChange = (newFilterBy) => {
    setFilterBy(newFilterBy);
  };

  const highlightSearchTerm = (text) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Search className="w-5 h-5 text-gray-400" />
          <h1 className="text-2xl font-bold text-gray-900">
            Search Results
          </h1>
        </div>
        
        {query && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              <span className="font-medium">Searching for:</span> "{query}"
            </p>
            <p className="text-blue-600 text-sm mt-1">
              Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>

      {/* Filters and sorting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <select
              value={filterBy}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All questions</option>
              <option value="unanswered">Unanswered</option>
              <option value="answered">Answered</option>
              <option value="recent">Recent (1 week)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="votes">Most votes</option>
            <option value="answers">Most answers</option>
            <option value="views">Most views</option>
          </select>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          <span className="ml-3 text-gray-600">Searching...</span>
        </div>
      )}

      {/* Search results */}
      {!isLoading && (
        <div className="space-y-6">
          {searchResults.length > 0 ? (
            searchResults.map((question) => (
              <div key={question.id} className="card p-6">
                <div className="flex items-start space-x-4">
                  {/* Voting sidebar */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">{question.votes}</div>
                      <div className="text-xs text-gray-500">votes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">{question.answers}</div>
                      <div className="text-xs text-gray-500">answers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900">{question.views}</div>
                      <div className="text-xs text-gray-500">views</div>
                    </div>
                  </div>

                  {/* Question content */}
                  <div className="flex-1">
                    <Link 
                      to={`/question/${question.id}`}
                      className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors mb-2 block"
                      dangerouslySetInnerHTML={{ __html: highlightSearchTerm(question.title) }}
                    />
                    
                    <div 
                      className="text-gray-600 mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: highlightSearchTerm(question.content.substring(0, 200)) + (question.content.length > 200 ? '...' : '') }}
                    />

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
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

                    {/* Meta information */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span>Asked {new Date(question.createdAt).toLocaleDateString()}</span>
                        <span>by {question.author.username}</span>
                        {question.isAnswered && (
                          <span className="text-green-600 font-medium">✓ Answered</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : query ? (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any questions matching "{query}"
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Try:</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Using different keywords</li>
                  <li>• Checking your spelling</li>
                  <li>• Using more general terms</li>
                  <li>• Removing filters</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Enter a search term</h3>
              <p className="text-gray-600">
                Use the search bar above to find questions
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults; 