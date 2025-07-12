import { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
  const quillRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕'];

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean']
      ]
    }
  };

  const formats = [
    'header', 'bold', 'italic', 'strike',
    'list', 'bullet', 'align',
    'link', 'image'
  ];

  const insertEmoji = (emoji) => {
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();
    const position = range ? range.index : 0;
    quill.insertText(position, emoji);
    quill.setSelection(position + emoji.length);
    setShowEmojiPicker(false);
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        // In a real app, you would upload to a server and get back a URL
        const reader = new FileReader();
        reader.onload = (e) => {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          const position = range ? range.index : 0;
          quill.insertEmbed(position, 'image', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
  };

  return (
    <div className="relative">
      {/* Custom Toolbar */}
      <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-1">
        <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
          <button
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => {
              const quill = quillRef.current.getEditor();
              quill.format('bold', !quill.getFormat().bold);
            }}
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => {
              const quill = quillRef.current.getEditor();
              quill.format('italic', !quill.getFormat().italic);
            }}
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => {
              const quill = quillRef.current.getEditor();
              quill.format('strike', !quill.getFormat().strike);
            }}
          >
            <Strikethrough className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
          <button
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => {
              const quill = quillRef.current.getEditor();
              quill.format('list', 'bullet');
            }}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => {
              const quill = quillRef.current.getEditor();
              quill.format('list', 'ordered');
            }}
          >
            <ListOrdered className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
          <button
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => {
              const quill = quillRef.current.getEditor();
              quill.format('align', 'left');
            }}
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => {
              const quill = quillRef.current.getEditor();
              quill.format('align', 'center');
            }}
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => {
              const quill = quillRef.current.getEditor();
              quill.format('align', 'right');
            }}
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-1">
          <button
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => {
              const url = prompt('Enter URL:');
              if (url) {
                const quill = quillRef.current.getEditor();
                const range = quill.getSelection();
                if (range) {
                  quill.format('link', url);
                }
              }
            }}
          >
            <Link className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
            onClick={handleImageUpload}
          >
            <Image className="w-4 h-4" />
          </button>
          <div className="relative">
            <button
              type="button"
              className="p-1 hover:bg-gray-200 rounded"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
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

      {/* Quill Editor */}
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        className="rich-text-editor"
      />

      <style jsx global>{`
        .rich-text-editor .ql-toolbar {
          display: none;
        }
        .rich-text-editor .ql-container {
          border-top: none;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }
        .rich-text-editor .ql-editor {
          min-height: 200px;
          font-size: 14px;
          line-height: 1.6;
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          font-style: normal;
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;