import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { notifications, currentUser } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import NotificationDropdown from './NotificationDropdown';
import { Bell, Menu, X, Search, User, LogIn, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationList, setNotificationList] = useState(notifications);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Count unread notifications
  const unreadCount = notificationList.filter(n => !n.isRead).length;
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-gray-900';
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.notification-dropdown') && !event.target.closest('.notification-button')) {
        setIsNotificationsOpen(false);
      }
      if (!event.target.closest('.profile-dropdown') && !event.target.closest('.profile-button')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleMarkAsRead = (notificationId) => {
    setNotificationList(prev => 
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
    toast.success('Notification marked as read');
  };

  const handleMarkAllAsRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, isRead: true })));
    toast.success('All notifications marked as read');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page with query parameter
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    toast.success('Successfully logged out');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-lg font-bold text-xl shadow-lg hover:shadow-xl transition-shadow">
                StackIt
              </div>
            </Link>
            
            <div className="hidden md:flex space-x-6">
              <Link
                to="/questions"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/questions')}`}
              >
                Questions
              </Link>
              <Link
                to="/ask"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/ask')}`}
              >
                Ask a Question
              </Link>
              <Link
                to="/tags"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/tags')}`}
              >
                Tags
              </Link>
              <Link
                to="/users"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/users')}`}
              >
                Users
              </Link>
            </div>
          </div>

          {/* Center - Search bar */}
          <div className="hidden md:flex flex-1 justify-center max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                />
              </div>
            </form>
          </div>

          {/* Right side - User actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Authenticated User Navigation */}
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <div className="relative notification-dropdown">
                  <button
                    onClick={() => {
                      setIsNotificationsOpen(!isNotificationsOpen);
                      setIsProfileOpen(false);
                    }}
                    className="notification-button relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Bell className="w-6 h-6" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse font-medium">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications dropdown */}
                  {isNotificationsOpen && (
                    <NotificationDropdown
                      notifications={notificationList}
                      onMarkAsRead={handleMarkAsRead}
                      onMarkAllAsRead={handleMarkAllAsRead}
                      onClose={() => setIsNotificationsOpen(false)}
                    />
                  )}
                </div>

                {/* Profile dropdown */}
                <div className="relative profile-dropdown">
                  <button
                    onClick={() => {
                      setIsProfileOpen(!isProfileOpen);
                      setIsNotificationsOpen(false);
                    }}
                    className="profile-button flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <img
                      src={user?.avatar || currentUser.avatar}
                      alt={user?.name || currentUser.name}
                      className="w-8 h-8 rounded-full ring-2 ring-gray-200 hover:ring-primary-300 transition-all"
                    />
                    <span className="hidden md:block text-sm font-medium">{user?.username || currentUser.username}</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Profile dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">{user?.name || currentUser.name}</p>
                        <p className="text-xs text-gray-500">{(user?.reputation || currentUser.reputation).toLocaleString()} reputation</p>
                      </div>
                      <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <User className="w-4 h-4 mr-3 text-gray-400" />
                        Profile
                      </Link>
                      <Link to="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </Link>
                      <Link to="/my-questions" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        My Questions
                      </Link>
                      <hr className="my-1" />
                      <button 
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Unauthenticated User Navigation */
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="hidden md:flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:from-primary-600 hover:to-primary-700 transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <UserPlus className="w-4 h-4 mr-2 inline" />
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              />
            </div>
          </form>

          {/* Mobile navigation links */}
          <div className="space-y-2">
            <Link 
              to="/questions" 
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/questions')}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Questions
            </Link>
            <Link 
              to="/ask" 
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/ask')}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ask a Question
            </Link>
            <Link 
              to="/tags" 
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/tags')}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tags
            </Link>
            <Link 
              to="/users" 
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/users')}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Users
            </Link>
            
            {/* Mobile auth buttons */}
            {!isAuthenticated && (
              <>
                <hr className="my-2" />
                <Link 
                  to="/login" 
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign in
                </Link>
                <Link 
                  to="/signup" 
                  className="flex items-center px-3 py-2 text-sm font-medium bg-primary-500 text-white hover:bg-primary-600 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;