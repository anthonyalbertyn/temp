// src/components/Editor.tsx

import React, { useEffect, useRef } from 'react';
import { TextField, TextareaAutosize } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill's default theme CSS

interface EditorProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  withController?: boolean;
  label?: string;
  name: string;
}

const Editor: React.FC<EditorProps> = ({
  withController = false,
  label,
  name,
  ...props
}) => {
  const { control } = useFormContext();
  const quillRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);

  // Initialize Quill editor
  useEffect(() => {
    if (quillRef.current) {
      const options = {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'bold': true }, { 'italic': true }, { 'underline': true }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['blockquote'],
          ],
        },
      };

      quillInstance.current = new Quill(quillRef.current, options);

      // Bind Quill content to form value for react-hook-form
      if (control) {
        const { setValue } = useFormContext();
        quillInstance.current.on('text-change', () => {
          setValue(name, quillInstance.current?.root.innerHTML);
        });
      }
    }

    return () => {
      // Cleanup Quill instance on unmount
      if (quillInstance.current) {
        quillInstance.current = null;
      }
    };
  }, [name, control]);

  const renderEditor = () => {
    if (withController && control) {
      return (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={label}
              multiline
              minRows={4}
              {...props}
            />
          )}
        />
      );
    }

    return (
      <TextareaAutosize
        {...props}
        minRows={4}
        style={{ width: '100%' }}
      />
    );
  };

  return (
    <div>
      {label && <label>{label}</label>}
      <div ref={quillRef} {...props}></div>
    </div>
  );
};

export default Editor;
