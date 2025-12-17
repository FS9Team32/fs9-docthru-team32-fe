'use client';

import { useState, useEffect, useRef } from 'react';

export default function AdminDropdown({ onEdit, onDelete }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  const handleEdit = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (onEdit) onEdit();
    setDropdownOpen(false);
  };

  const handleDelete = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (onDelete) onDelete();
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggleDropdown}
        className="text-gray-400 hover:text-gray-600"
      >
        <p>︙</p>
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 z-10 mt-2 w-28 rounded-md border bg-white shadow-lg">
          <button
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            onClick={handleEdit}
          >
            수정하기
          </button>
          <button
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            onClick={handleDelete}
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
