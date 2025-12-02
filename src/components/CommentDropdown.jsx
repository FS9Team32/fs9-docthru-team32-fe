'use client';
import { useState, useEffect, useRef } from 'react';

// 본격적으로 댓글 수정/삭제 구현하면서 수정 필요
export default function CommentDropdown(
  {
    /* onEdit, onDelete */
  },
) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const handleToggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleEdit = () => {
    //onEdit();
    setDropdownOpen(false);
  };

  const handleDelete = () => {
    //onDelete();
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // 외부 클릭시
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={handleToggleDropdown}>
        <p className="text-2xl font-bold text-gray-400">︙</p>
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 z-10 mt-2 w-28 rounded-md border bg-white shadow-lg">
          <button
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            onClick={handleEdit}
          >
            수정하기
          </button>
          <button
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            onClick={handleDelete}
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
