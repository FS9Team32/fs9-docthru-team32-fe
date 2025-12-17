'use client';

import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Toolbar from './Toolbar';

export default function RichEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({ multicolor: true }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({
        placeholder: '번역 내용을 적어주세요',
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto py-10 px-6 focus:outline-none min-h-[calc(100vh-200px)]',
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);
  if (!editor) return null;

  return (
    <div className="w-full h-full flex flex-col bg-white shadow-sm border-x border-gray-100">
      <div className="w-full">
        <div className="max-w-4xl mx-auto">
          <Toolbar editor={editor} />
        </div>
      </div>

      <div className="flex-1 cursor-text">
        <div className="h-full px-8 py-4">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
