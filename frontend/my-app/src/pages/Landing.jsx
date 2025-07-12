import { Link } from 'react-router-dom';
import { questions, users, tags } from '../data/mockData';
import { formatNumber } from '../utils/helpers';

const Landing = () => {
  const totalQuestions = questions.length;
  const totalAnswers = questions.reduce((sum, q) => sum + q.answers, 0);
  const totalUsers = users.length;
  const totalTags = tags.length;

  const featuredQuestions = questions.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                StackIt
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              The ultimate platform for developers to ask questions, share knowledge, and build amazing things together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/ask"
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-primary-600 hover:to-primary-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Ask Your First Question
              </Link>
              <Link
                to="/questions"
                className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-primary-300 hover:text-primary-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Browse Questions
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join Our Growing Community
            </h2>
            <p className="text-xl text-gray-600">
              Thousands of developers helping each other every day
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 group-hover:from-primary-100 group-hover:to-primary-200 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {formatNumber(totalQuestions * 1000)}+
                </div>
                <div className="text-gray-600 font-medium">Questions</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 group-hover:from-green-100 group-hover:to-green-200 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  {formatNumber(totalAnswers * 1500)}+
                </div>
                <div className="text-gray-600 font-medium">Answers</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 group-hover:from-purple-100 group-hover:to-purple-200 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                  {formatNumber(totalUsers * 500)}+
                </div>
                <div className="text-gray-600 font-medium">Developers</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 group-hover:from-orange-100 group-hover:to-orange-200 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                  {formatNumber(totalTags * 100)}+
                </div>
                <div className="text-gray-600 font-medium">Tags</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose StackIt?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built by developers, for developers. Everything you need to learn, share, and grow.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ask Anything</h3>
              <p className="text-gray-600 leading-relaxed">
                Get help with any programming question. Our community of experts is here to help you solve problems and learn new concepts.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with experienced developers from around the world. Learn from the best and share your own knowledge.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fast Answers</h3>
              <p className="text-gray-600 leading-relaxed">
                Get quick, accurate answers to your questions. Our voting system ensures the best solutions rise to the top.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Questions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trending Questions
            </h2>
            <p className="text-xl text-gray-600">
              See what the community is discussing right now
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredQuestions.map((question) => (
              <Link
                key={question.id}
                to={`/question/${question.id}`}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-primary-200 transition-all duration-300 group"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {question.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {question.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag.id}
                      className={`px-2 py-1 rounded-md text-xs font-medium ${tag.color}`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      {question.answers}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                      {question.votes}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <img
                      src={question.author.avatar}
                      alt={question.author.name}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span>{question.author.username}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/questions"
              className="inline-flex items-center px-6 py-3 border border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium"
            >
              View All Questions
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join the Community?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Start asking questions, sharing knowledge, and connecting with developers worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/ask"
              className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Ask Your First Question
            </Link>
            <Link
              to="/questions"
              className="bg-transparent text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white hover:bg-white hover:text-primary-600 transition-all duration-200"
            >
              Explore Questions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;