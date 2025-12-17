'use client';

import { useState, useEffect, useRef } from 'react';

export default function CancelMenu({ onCancel }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggle = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggle}
        className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-600"
      >
        <span className="text-2xl leading-none">︙</span>
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-28 rounded-md border border-gray-300 bg-white ">
          <button
            type="button"
            className="block w-full px-4 py-2 text-center text-sm text-gray-500"
            onClick={() => {
              onCancel?.();
              setOpen(false);
            }}
          >
            취소하기
          </button>
        </div>
      )}
    </div>
  );
}
