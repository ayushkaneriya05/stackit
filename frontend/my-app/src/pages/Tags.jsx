import { tags } from '../data/mockData';

const Tags = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tags</h1>
        <p className="text-gray-600 mt-2">
          A tag is a keyword or label that categorizes your question with other, similar questions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tags.map((tag) => (
          <div key={tag.id} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className={`tag-badge text-lg ${tag.color}`}>
                {tag.name}
              </span>
              <span className="text-sm text-gray-500">
                {Math.floor(Math.random() * 100) + 1} questions
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Questions about {tag.name} development, best practices, and troubleshooting.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;