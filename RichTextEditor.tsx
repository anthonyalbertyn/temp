import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Blockquote from '@tiptap/extension-blockquote';
import Indent from '@tiptap/extension-indent';
import { Button, Select, MenuItem, Box } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease';

const RichTextEditor: React.FC = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Bold,
      Italic,
      Underline,
      ListItem,
      BulletList,
      OrderedList,
      Blockquote,
      Indent.configure({ minLevel: 0, maxLevel: 8 }),
    ],
    content: '',
  });

  if (!editor) {
    return null;
  }

  return (
    <Box className="p-4 bg-white rounded shadow">
      <Box className="mb-2 flex gap-2">
        <Button onClick={() => editor.chain().focus().toggleBold().run()}><FormatBoldIcon /></Button>
        <Button onClick={() => editor.chain().focus().toggleItalic().run()}><FormatItalicIcon /></Button>
        <Button onClick={() => editor.chain().focus().toggleUnderline().run()}><FormatUnderlinedIcon /></Button>
        <Button onClick={() => editor.chain().focus().toggleBulletList().run()}><FormatListBulletedIcon /></Button>
        <Button onClick={() => editor.chain().focus().toggleOrderedList().run()}><FormatListNumberedIcon /></Button>
        <Button onClick={() => editor.chain().focus().toggleBlockquote().run()}><FormatQuoteIcon /></Button>
        <Button onClick={() => editor.chain().focus().indent().run()}><FormatIndentIncreaseIcon /></Button>
        <Button onClick={() => editor.chain().focus().outdent().run()}><FormatIndentDecreaseIcon /></Button>
        <Select
          value={editor.getAttributes('heading').level || ''}
          onChange={(e) => editor.chain().focus().toggleHeading({ level: +e.target.value }).run()}
          displayEmpty
          className="ml-2"
        >
          <MenuItem value="">Normal</MenuItem>
          {[1, 2, 3, 4, 5, 6].map((level) => (
            <MenuItem key={level} value={level}>{`H${level}`}</MenuItem>
          ))}
        </Select>
      </Box>
      <EditorContent editor={editor} className="prose max-w-none" />
    </Box>
  );
};

export default RichTextEditor;
