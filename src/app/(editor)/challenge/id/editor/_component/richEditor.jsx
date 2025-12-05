'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Toolbar from './toolbar';

export default function RichEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({ multicolor: true }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({
        placeholder: '번역 내용을 적어주세요',
        emptyEditorClass:
          'before:content-[attr(data-placeholder)] before:italic before:float-left before:text-gray-400',
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-lg shadow-md p-4 overflow-hidden ">
      <Toolbar editor={editor} />

      <EditorContent editor={editor} />
    </div>
  );
}
