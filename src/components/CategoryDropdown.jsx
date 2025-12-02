'use client';

import { useState, useRef, useEffect } from 'react';

const CATEGORIES = ['Next.js', 'API', 'Career', 'Modern JS', 'Web'];

export default function CategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const dropdownRef = useRef(null);

  const handleSelect = (category) => {
    // 카테고리 선택 시
    setSelected(category);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      // 외부 클릭시 닫힘
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm hover:border-gray-300 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
      >
        <span
          className={selected ? 'font-medium text-gray-900' : 'text-gray-400'}
        >
          {selected || '카테고리'}
        </span>
        <svg
          className={`h-5 w-5 text-gray-400 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* 리스트 목록 */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg">
          <ul className="divide-y divide-gray-100">
            {CATEGORIES.map((category) => (
              <li key={category}>
                <button
                  onClick={() => handleSelect(category)}
                  className={`w-full py-4 text-center hover:bg-gray-50 ${selected === category ? 'bg-purple-50 font-bold text-purple-600' : 'text-gray-600'}`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
