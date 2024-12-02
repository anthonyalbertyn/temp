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

  it('renders the Tiptap editor correctly', () => {
    render(
      <Wrapper>
        <Editor label="Your Message" name="test" />
      </Wrapper>
    );

    // Check if the Tiptap editor container is rendered
    const editorContainer = screen.getByRole('textbox');
    expect(editorContainer).toBeInTheDocument();
  });

  it('renders toolbar buttons correctly', () => {
    render(
      <Wrapper>
        <Editor label="Your Message" name="test" />
      </Wrapper>
    );

    // Check for bold button
    expect(screen.getByTitle('Bold')).toBeInTheDocument();
    expect(screen.getByTitle('Italic')).toBeInTheDocument();
    expect(screen.getByTitle('Underline')).toBeInTheDocument();
    expect(screen.getByTitle('Blockquote')).toBeInTheDocument();
  });

  it('can change heading size using the select list', () => {
    render(
      <Wrapper>
        <Editor label="Your Message" name="test" />
      </Wrapper>
    );

    const select = screen.getByLabelText('Heading') as HTMLSelectElement;

    // Select a heading size (e.g., Heading 1)
    fireEvent.change(select, { target: { value: '1' } });
    
    expect(select.value).toBe('1'); // Heading 1 selected
  });
});
