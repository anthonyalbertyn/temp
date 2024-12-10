import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { useForm, Controller } from 'react-hook-form';
import RichTextInput from './RichTextInput'; // Path to your component

// Mocking ReactQuill
jest.mock('react-quill', () => {
  return ({ value, onChange, placeholder, ref, ...props }: any) => {
    return (
      <div data-testid="react-quill" {...props} onClick={() => onChange('new value')}>
        {value || placeholder || 'Empty'}
      </div>
    );
  };
});

describe('RichTextInput Component', () => {
  afterEach(() => {
    cleanup();
  });

  test('should render without crashing', () => {
    render(<RichTextInput />);
    expect(screen.getByTestId('react-quill')).toBeInTheDocument();
  });

  test('should render with label and error message', () => {
    render(<RichTextInput label="Content" errorMessage="This field is required" />);
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  test('should render with default value', () => {
    render(<RichTextInput defaultValue="Hello World" />);
    expect(screen.getByTestId('react-quill')).toHaveTextContent('Hello World');
  });

  test('should render with placeholder text', () => {
    render(<RichTextInput placeholderText="Enter text here..." />);
    expect(screen.getByTestId('react-quill')).toHaveTextContent('Enter text here...');
  });

  test('should call onChange when the editor is clicked (React Quill interaction)', async () => {
    const onChangeMock = jest.fn();
    render(<RichTextInput defaultValue="Initial content" onChange={onChangeMock} />);
    fireEvent.click(screen.getByTestId('react-quill'));
    await waitFor(() => expect(onChangeMock).toHaveBeenCalled());
  });

  test('should integrate with react-hook-form and apply validation', async () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = jest.fn();
    render(
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="richTextInput"
          control={control}
          render={({ field }) => <RichTextInput {...field} withController isRequired label="Content" />}
        />
        <button type="submit">Submit</button>
      </form>
    );
    
    fireEvent.submit(screen.getByRole('button'));
    
    await waitFor(() => expect(errors.richTextInput).toBeDefined());
  });

  test('should show H3 in the toolbar (header 3)', () => {
    render(<RichTextInput />);
    
    const toolbar = screen.getByTestId('react-quill');
    expect(toolbar).toHaveTextContent('header 3');
  });
});
