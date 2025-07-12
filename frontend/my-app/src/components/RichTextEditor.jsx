import { useState } from 'react';
import { 
  Bold, 
  Italic, 
  Strikethrough, 
  List, 
  ListOrdered, 
  Link, 
  Image, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Smile
} from 'lucide-react';

const RichTextEditor = ({ value, onChange, placeholder = "Write your content here..." }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕'];

  const insertEmoji = (emoji) => {
    const textarea = document.getElementById('rich-text-editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = value.substring(0, start) + emoji + value.substring(end);
    onChange(newValue);
    setShowEmojiPicker(false);
    
    // Set cursor position after emoji
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 0);
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const textarea = document.getElementById('rich-text-editor');
          const start = textarea.selectionStart;
          const imageMarkdown = `![${file.name}](${e.target.result})`;
          const newValue = value.substring(0, start) + imageMarkdown + value.substring(start);
          onChange(newValue);
        };
        reader.readAsDataURL(file);
      }
    };
  };

  const insertFormat = (format) => {
    const textarea = document.getElementById('rich-text-editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    let newText = '';
    switch (format) {
      case 'bold':
        newText = `**${selectedText}**`;
        break;
      case 'italic':
        newText = `*${selectedText}*`;
        break;
      case 'strike':
        newText = `~~${selectedText}~~`;
        break;
      case 'bullet':
        newText = selectedText ? selectedText.split('\n').map(line => `- ${line}`).join('\n') : '- ';
        break;
      case 'ordered':
        newText = selectedText ? selectedText.split('\n').map((line, index) => `${index + 1}. ${line}`).join('\n') : '1. ';
        break;
      case 'link':
        const url = prompt('Enter URL:');
        if (url) {
          newText = `[${selectedText || 'link'}](${url})`;
        } else {
          return;
        }
        break;
      default:
        return;
    }
    
    const newValue = value.substring(0, start) + newText + value.substring(end);
    onChange(newValue);
  };

  return (
    <div className="relative">
      {/* Custom Toolbar */}
      <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-1">
        <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
          <button
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => insertFormat('bold')}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => insertFormat('italic')}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => insertFormat('strike')}
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
          <button
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => insertFormat('bullet')}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => insertFormat('ordered')}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
          <button
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-1">
          <button
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => insertFormat('link')}
            title="Insert Link"
          >
            <Link className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
            onClick={handleImageUpload}
            title="Insert Image"
          >
            <Image className="w-4 h-4" />
          </button>
          <div className="relative">
            <button
              type="button"
              className="p-1 hover:bg-gray-200 rounded"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              title="Insert Emoji"
            >
              <Smile className="w-4 h-4" />
            </button>
            {showEmojiPicker && (
              <div className="absolute top-8 left-0 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-50 w-64 max-h-48 overflow-y-auto">
                <div className="grid grid-cols-8 gap-1">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      type="button"
                      className="p-1 hover:bg-gray-100 rounded text-lg"
                      onClick={() => insertEmoji(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Textarea Editor */}
      <textarea
        id="rich-text-editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-b-lg p-4 min-h-[200px] resize-y focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
        style={{ borderTop: 'none' }}
      />

      {/* Helper text */}
      <div className="mt-2 text-xs text-gray-500">
        <p>Supports Markdown: **bold**, *italic*, ~~strikethrough~~, [links](url), ![images](url), - lists, 1. numbered lists</p>
      </div>
    </div>
  );
};

export default RichTextEditor;