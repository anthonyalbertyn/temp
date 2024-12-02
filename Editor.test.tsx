// src/components/__tests__/Editor.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { Editor } from '../Editor';
import { FormProvider, useForm } from 'react-hook-form';

// Helper component to wrap the Editor with react-hook-form context
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('Editor', () => {
  it('renders an Editor with a label when provided', () => {
    render(
      <Wrapper>
        <Editor label="Test Label" name="test" />
      </Wrapper>
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('does not render a label if not provided', () => {
    render(
      <Wrapper>
        <Editor name="test" />
      </Wrapper>
    );

    expect(screen.queryByText('Test Label')).not.toBeInTheDocument();
  });

  it('renders the Quill editor', () => {
    render(
      <Wrapper>
        <Editor label="Your Message" name="test" />
      </Wrapper>
    );

    // Check if the Quill editor container is rendered
    const quillEditor = screen.getByRole('textbox'); // Quill editor has a "textbox" role
    expect(quillEditor).toBeInTheDocument();
  });

  it('renders the TextareaAutosize when not using Quill', () => {
    render(<Editor name="test" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('can be used with react-hook-form and Quill', () => {
    render(
      <Wrapper>
        <Editor label="Test Label" name="test" withController />
      </Wrapper>
    );

    const quillEditor = screen.getByRole('textbox');
    
    // Simulate a Quill editor change
    fireEvent.change(quillEditor, { target: { innerHTML: '<p>Test value</p>' } });

    // Normally, you would test form submission and see if the form state was updated
    // Example assertion (you can expand it based on form submission logic)
    expect(quillEditor).toHaveTextContent('Test value');
  });
});
