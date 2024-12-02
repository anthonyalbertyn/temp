// src/components/Editor.tsx

import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's default theme CSS
import { TextField, TextareaAutosize } from '@mui/material';

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
  placeholder = "Start typing here...",
}) => {
  const { control } = useFormContext();

  // Default options for Quill's toolbar
  const modules = {
    toolbar: [
      [{ 'bold': true }, { 'italic': true }, { 'underline': true }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['blockquote'],
    ],
  };

  const renderEditor = () => {
    if (withController && control) {
      return (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <ReactQuill
              {...field}
              theme="snow"
              modules={modules}
              placeholder={placeholder}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
      );
    }

    return (
      <TextareaAutosize
        style={{ width: '100%' }}
        minRows={4}
        placeholder={placeholder}
      />
    );
  };

  return (
    <div>
      {label && <label>{label}</label>}
      {renderEditor()}
    </div>
  );
};

export default Editor;
