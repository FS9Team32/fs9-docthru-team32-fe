'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import arrowDown from '@/assets/arrowDown.png';
import arrowUp from '@/assets/arrowUp.png';
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
            <Image src={arrowUp} alt="arrow" width={24} height={24} />
          ) : (
            <Image src={arrowDown} alt="arrow" width={24} height={24} />
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
