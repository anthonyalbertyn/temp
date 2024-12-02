// src/components/Editor.stories.tsx

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import Editor from './Editor';

const meta: Meta<typeof Editor> = {
  title: 'Components/Editor',
  component: Editor,
};

export default meta;

type Story = StoryObj<typeof Editor>;

export const BasicEditor: Story = {
  args: {
    name: 'test',
  },
  render: (args) => (
    <div className="w-96">
      <Editor {...args} />
    </div>
  ),
};

export const EditorWithLabel: Story = {
  args: {
    name: 'test',
    label: 'Your Message',
  },
  render: (args) => (
    <div className="w-96">
      <Editor {...args} />
    </div>
  ),
};

export const EditorWithController: Story = {
  args: {
    name: 'test',
    label: 'Your Message',
    withController: true,
  },
  render: (args) => {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <div className="w-96">
          <Editor {...args} />
        </div>
      </FormProvider>
    );
  },
};
