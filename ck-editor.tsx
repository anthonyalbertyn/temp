import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Editor } from '@ckeditor/ckeditor5-core';

// Define the props for your EditorComponent
interface EditorProps {
  value: string;
  onChange: (data: string) => void;
}

const EditorComponent: React.FC<EditorProps> = ({ value, onChange }) => {
  // Handle editor content changes
  const handleEditorChange = (event: Event, editor: Editor) => {
    const data = editor.getData();
    onChange(data); // Pass the updated content to the parent component
  };

  // Configuration for the CKEditor
  const editorConfig = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'underline',
      '|',
      'bulletedList',
      'numberedList',
      'blockQuote',
      '|',
      'outdent',
      'indent',
    ],
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
      ],
    },
  };

  return (
    <div className="editor-container space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Rich Text Editor</h2>
      <div className="border border-gray-300 p-4 rounded-lg shadow-sm bg-white">
        <CKEditor
          editor={ClassicEditor}
          config={editorConfig}
          data={value}
          onChange={handleEditorChange}
        />
      </div>
    </div>
  );
};

export default EditorComponent;
