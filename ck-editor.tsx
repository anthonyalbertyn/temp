import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { EditorProps } from '@ckeditor/ckeditor5-react';
import '@ckeditor/ckeditor5-build-classic/build/translations/en.js';

// Dynamically import CKEditor to avoid server-side rendering issues in Next.js
const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react').then((module) => module.Editor), { ssr: false });

const Editor: React.FC = () => {
  const [editorState, setEditorState] = useState<string>('');

  const handleEditorChange = (event: any, editor: any) => {
    setEditorState(editor.getData());
  };

  // Configuration for CKEditor
  const editorConfig: EditorProps['config'] = {
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
          editor={require('@ckeditor/ckeditor5-build-classic')}
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
