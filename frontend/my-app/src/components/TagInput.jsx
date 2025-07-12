import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { tags as availableTags } from '../data/mockData';

const TagInput = ({ selectedTags, onTagsChange, maxTags = 5 }) => {
  const [tagInput, setTagInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredTags = availableTags.filter(tag => 
    tag.name.toLowerCase().includes(tagInput.toLowerCase()) &&
    !selectedTags.find(t => t.id === tag.id)
  );

  const handleTagSelect = (tag) => {
    if (selectedTags.length < maxTags) {
      onTagsChange([...selectedTags, tag]);
      setTagInput('');
      setShowSuggestions(false);
    }
  };

  const handleTagRemove = (tagId) => {
    onTagsChange(selectedTags.filter(t => t.id !== tagId));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      // Create new tag if it doesn't exist
      const existingTag = availableTags.find(tag => 
        tag.name.toLowerCase() === tagInput.toLowerCase()
      );
      
      if (existingTag && !selectedTags.find(t => t.id === existingTag.id)) {
        handleTagSelect(existingTag);
      } else if (!existingTag && selectedTags.length < maxTags) {
        // Create a new tag
        const newTag = {
          id: Date.now(),
          name: tagInput.toLowerCase(),
          color: 'bg-gray-100 text-gray-800'
        };
        handleTagSelect(newTag);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Selected tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <span
              key={tag.id}
              className={`inline-flex items-center ${tag.color} px-3 py-1 rounded-full text-sm font-medium`}
            >
              {tag.name}
              <button
                type="button"
                onClick={() => handleTagRemove(tag.id)}
                className="ml-2 text-xs hover:text-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Tag input */}
      <div className="relative">
        <div className="flex items-center">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => {
              setTagInput(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            onKeyPress={handleKeyPress}
            onFocus={() => setShowSuggestions(tagInput.length > 0)}
            placeholder={selectedTags.length < maxTags ? "Search for tags or create new ones..." : `Maximum ${maxTags} tags allowed`}
            disabled={selectedTags.length >= maxTags}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          {tagInput && (
            <button
              type="button"
              onClick={() => {
                if (tagInput.trim() && selectedTags.length < maxTags) {
                  const newTag = {
                    id: Date.now(),
                    name: tagInput.toLowerCase(),
                    color: 'bg-gray-100 text-gray-800'
                  };
                  handleTagSelect(newTag);
                }
              }}
              className="ml-2 p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              title="Add tag"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {/* Tag suggestions */}
        {showSuggestions && filteredTags.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {filteredTags.slice(0, 10).map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => handleTagSelect(tag)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
              >
                <span className={`inline-block ${tag.color} px-2 py-1 rounded text-sm`}>
                  {tag.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Helper text */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          {selectedTags.length}/{maxTags} tags selected
        </span>
        <span>
          Press Enter to add a tag
        </span>
      </div>
    </div>
  );
};

export default TagInput;