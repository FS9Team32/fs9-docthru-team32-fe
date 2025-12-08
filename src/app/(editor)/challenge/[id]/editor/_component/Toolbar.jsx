'use client';

import { useRef } from 'react';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Highlighter,
} from 'lucide-react';
import Button from '@/components/Button';

export default function Toolbar({ editor }) {
  const colorInputRef = useRef(null);
  if (!editor) return null;

  // 텍스트 스타일
  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();

  const toggleAlignLeft = () =>
    editor.chain().focus().setTextAlign('left').run();
  const toggleAlignCenter = () =>
    editor.chain().focus().setTextAlign('center').run();
  const toggleAlignRight = () =>
    editor.chain().focus().setTextAlign('right').run();

  const toggleBulletList = () =>
    editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () =>
    editor.chain().focus().toggleOrderedList().run();

  // 배경색
  const handleButtonClick = () => {
    colorInputRef.current?.click();
  };

  const handleColorChange = (e) => {
    editor.chain().focus().toggleHighlight({ color: e.target.value }).run();
  };

  const btnClass = (isActive) =>
    `p-2 rounded hover:bg-gray-100 text-gray-600 transition-colors ${isActive ? 'bg-gray-200 text-black' : ''}`;

  return (
    <div className="flex items-center gap-1 border-b p-2 bg-white sticky top-0 z-10">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleBold}
        className={btnClass(editor.isActive('bold'))}
        title="굵게"
      >
        <Bold size={18} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleItalic}
        className={btnClass(editor.isActive('italic'))}
        title="기울임"
      >
        <Italic size={18} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleUnderline}
        className={btnClass(editor.isActive('underline'))}
        title="밑줄"
      >
        <Underline size={18} />
      </Button>

      <div className="w-px h-5 bg-gray-300 mx-2"></div>

      <Button
        variant="ghost"
        size="icon"
        onClick={toggleAlignLeft}
        className={btnClass(editor.isActive({ textAlign: 'left' }))}
        title="왼쪽 정렬"
      >
        <AlignLeft size={18} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleAlignCenter}
        className={btnClass(editor.isActive({ textAlign: 'center' }))}
        title="가운데 정렬"
      >
        <AlignCenter size={18} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleAlignRight}
        className={btnClass(editor.isActive({ textAlign: 'right' }))}
        title="오른쪽 정렬"
      >
        <AlignRight size={18} />
      </Button>

      <div className="w-px h-5 bg-gray-300 mx-2"></div>

      <Button
        variant="ghost"
        size="icon"
        onClick={toggleBulletList}
        className={btnClass(editor.isActive('bulletList'))}
        title="글머리 기호"
      >
        <List size={18} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleOrderedList}
        className={btnClass(editor.isActive('orderedList'))}
        title="번호 매기기"
      >
        <ListOrdered size={18} />
      </Button>

      <div className="w-px h-5 bg-gray-300 mx-2"></div>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleButtonClick}
        className={btnClass(editor.isActive('highlight'))}
        title="형광펜"
      >
        <Highlighter
          size={18}
          style={{
            color: editor.isActive('highlight')
              ? editor.getAttributes('highlight').color
              : 'inherit',
          }}
        />
      </Button>

      <input
        type="color"
        ref={colorInputRef}
        onInput={handleColorChange}
        value={editor.getAttributes('highlight').color || '#fef08a'}
        className="hidden"
      />
    </div>
  );
}
