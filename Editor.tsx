// src/components/Editor.tsx

import React, { useEffect, useCallback } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Heading } from '@tiptap/extension-heading';
import { Bold, Italic, Underline } from '@tiptap/extension-bold';
import { Blockquote } from '@tiptap/extension-blockquote';
import { TextField, TextareaAutosize, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { FormatBold, FormatItalic, FormatUnderlined, FormatQuote } from '@mui/icons-material';

interface EditorProps {
  withController?: boolean;
  label?: string;
  name: string;
  placeholder?: string;
}

const Editor: React.FC<EditorProps> = ({
  withController = false,
  label,
  name,
  placeholder = 'Start typing here...',
}) => {
  const { control } = useFormContext();

  // Initialize Tiptap editor with the required extensions
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6], // Heading levels h1 to h6
      }),
      Bold,
      Italic,
      Underline,
      Blockquote,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      if (control) {
        // Update form value when the editor content changes
        control.setValue(name, editor.getHTML());
      }
    },
  });

  // Function to handle heading size change from the select list
  const handleHeadingChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const headingLevel = event.target.value as number;
      editor?.commands.setHeading({ level: headingLevel });
    },
    [editor]
  );

  // Render editor with or without Controller
  const renderEditor = () => {
    if (withController && control) {
      return (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className="editor-container">
              <EditorContent editor={editor} />
            </div>
          )}
        />
      );
    }

    return (
      <div className="editor-container">
        <EditorContent editor={editor} />
      </div>
    );
  };

  return (
    <div>
      {label && <label>{label}</label>}

      <div className="toolbar">
        {/* Toolbar with buttons for bold, italic, underline, blockquote */}
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className="toolbar-button"
        >
          <FormatBold />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className="toolbar-button"
        >
          <FormatItalic />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className="toolbar-button"
        >
          <FormatUnderlined />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          className="toolbar-button"
        >
          <FormatQuote />
        </button>

        {/* Heading Size Select List */}
        <FormControl fullWidth>
          <InputLabel>Heading</InputLabel>
          <Select
            value={editor?.isActive('heading') ? editor?.getAttributes('heading').level : 0}
            label="Heading"
            onChange={handleHeadingChange}
          >
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <MenuItem key={level} value={level}>
                {`Heading ${level}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {renderEditor()}
    </div>
  );
};

export default Editor;
