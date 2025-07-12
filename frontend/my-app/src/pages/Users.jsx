import { users } from '../data/mockData';
import { formatNumber, formatTimeAgo } from '../utils/helpers';

const Users = () => {
  const sortedUsers = [...users].sort((a, b) => b.reputation - a.reputation);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-600 mt-2">
          Meet the amazing developers in our community
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedUsers.map((user) => (
          <div key={user.id} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full ring-4 ring-gray-100"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                <p className="text-gray-600">@{user.username}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Reputation</span>
                <span className="font-semibold text-primary-600">
                  {formatNumber(user.reputation)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Member since</span>
                <span>{new Date(user.joinDate).getFullYear()}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full bg-primary-50 text-primary-600 py-2 rounded-lg hover:bg-primary-100 transition-colors font-medium">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;