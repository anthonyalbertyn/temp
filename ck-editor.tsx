import React, { useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// Define the types for the CKEditor change event
type EditorChangeEvent = {
  editor: {
    getData: () => string;
  };
};

const Editor: React.FC = () => {
  const [editorState, setEditorState] = useState<string>('');

  // Handle editor changes and update state with editor's content
  const handleEditorChange = (event: EditorChangeEvent, editor: any): void => {
    setEditorState(editor.getData());
  };

  // CKEditor configuration for the toolbar and features
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
          data={editorState}
          onChange={handleEditorChange}
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium">Editor Output (HTML):</h3>
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">{editorState}</div>
      </div>
    </div>
  );
};

export default Editor;
