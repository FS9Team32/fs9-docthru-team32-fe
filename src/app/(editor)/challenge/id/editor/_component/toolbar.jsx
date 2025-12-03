import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Pallette,
} from 'lucide-react';

export default function Toolbar({ editor }) {
  if (!editor) return null;

  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();
  const toggleAlignLeft = () =>
    editor.chain().focus().setTextAlign('left').run();
  const toggleAlignCenter = () =>
    editor.chain().focus().setTextAlign('center').run();
  const toggleAlignRight = () =>
    editor.chain().focus().setTextAlign('right').run();
  const toggleList = () => editor.chain().focus().toggleList().run();
  const toggleListOrdered = () =>
    editor.chain().focus().toggleList({ list: 'ordered' }).run();
  const togglePallette = () => editor.chain().focus().togglePallette().run();

  const btnClass = (isActive) =>
    `p-2 rounded hover:bg-gray-100 text-gray-600 ${isActive ? 'bg-gray-200 text-black' : ''}`;

  return (
    <div className="flex items-center gap-1 ">
      <button
        onClick={toggleBold}
        className={btnClass(editor.isActive('bold'))}
      >
        <Bold />
      </button>
      <button
        onClick={toggleItalic}
        className={btnClass(editor.isActive('italic'))}
      >
        <Italic />
      </button>
      <button
        onClick={toggleUnderline}
        className={btnClass(editor.isActive('underline'))}
      >
        <Underline />
      </button>

      <div className="w-px h-5 bg-white mx-2"></div>

      <button
        onClick={toggleAlignLeft}
        className={btnClass(editor.isActive({ textAlign: 'left' }))}
      >
        <AlignLeft />
      </button>
      <button
        onClick={toggleAlignCenter}
        className={btnClass(editor.isActive({ textAlign: 'center' }))}
      >
        <AlignCenter />
      </button>
      <button
        onClick={toggleAlignRight}
        className={btnClass(editor.isActive({ textAlign: 'right' }))}
      >
        <AlignRight />
      </button>

      <div className="w-px h-5 bg-white mx-2"></div>
      <button
        onClick={toggleList}
        className={btnClass(editor.isActive('bulletList'))}
      >
        <List />
      </button>
      <button
        onClick={toggleListOrdered}
        className={btnClass(editor.isActive('orderedList'))}
      >
        <ListOrdered />
      </button>

      <div className="w-px h-5 bg-white mx-2"></div>

      <button
        onClick={togglePallette}
        className={btnClass(editor.isActive('pallette'))}
      >
        <Pallette />
      </button>
    </div>
  );
}
