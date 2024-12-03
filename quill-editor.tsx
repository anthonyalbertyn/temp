import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's styles

interface EditorProps {
  value: string;
  onChange: (data: string) => void;
}

const EditorComponent: React.FC<EditorProps> = ({ value, onChange }) => {
  // Handle change in the editor content
  const handleEditorChange = (content: string) => {
    onChange(content); // Pass updated content to the parent
  };

  // Custom toolbar options
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['bold', 'italic', 'underline'],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      ['blockquote'],
      ['link'],
      [{ 'direction': 'rtl' }],
      ['clean'], // For clearing the editor
    ],
  };

  return (
    <div className="editor-container space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Rich Text Editor</h2>
      <div className="border border-gray-300 p-4 rounded-lg shadow-sm bg-white">
        <ReactQuill
          value={value}
          onChange={handleEditorChange}
          modules={modules} // Pass in the toolbar configuration
          theme="snow" // Use the default snow theme
        />
      </div>
    </div>
  );
};

export default EditorComponent;
