'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/util';

export default function CategoryDropdown({
  category = [],
  value,
  onChange,
  placeholder = '카테고리',
  className,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (category) => {
    if (onChange) {
      onChange(category);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className={cn('relative w-full', className)} ref={dropdownRef}>
      <div className="relative">
        <input
          {...props}
          type="text"
          readOnly
          value={value || ''}
          placeholder={placeholder}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full cursor-pointer rounded-lg border bg-white p-4 pr-10 text-left shadow-sm outline-none transition-all caret-transparent',
            'text-gray-900 placeholder:text-gray-400',
            isOpen
              ? 'border-purple-500 ring-2 ring-purple-500'
              : 'border-gray-200 hover:border-gray-300',
          )}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M11.4372 8.55699C11.749 8.24845 12.251 8.24845 12.5628 8.55699L16.6794 12.6314C17.1874 13.1342 16.8314 14 16.1166 14H7.88336C7.16865 14 6.81262 13.1342 7.3206 12.6314L11.4372 8.55699Z"
                fill="#262626"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M11.4372 15.443C11.749 15.7516 12.251 15.7516 12.5628 15.443L16.6794 11.3686C17.1874 10.8658 16.8314 10 16.1166 10H7.88336C7.16865 10 6.81262 10.8658 7.3206 11.3686L11.4372 15.443Z"
                fill="#262626"
              />
            </svg>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg ring-1 ring-black">
          <ul className="divide-y divide-gray-100 max-h-60 overflow-y-auto">
            {category.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => handleSelect(category)}
                  className={cn(
                    'w-full py-4 text-center transition-colors hover:bg-gray-50',
                    value === category
                      ? 'bg-purple-50 text-purple-600 font-bold'
                      : 'text-gray-600',
                  )}
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
