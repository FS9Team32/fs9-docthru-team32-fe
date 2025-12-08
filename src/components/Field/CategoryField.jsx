'use client';

import { useState, useRef, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Image from 'next/image';
import arrowDown from '@/assets/arrowDown.png';
import arrowUp from '@/assets/arrowUp.png';
import { cn } from '@/lib/util';

export default function CategoryField({
  name,
  label,
  categories = [],
  placeholder = '카테고리',
  rules,
  className,
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-gray-900 font-medium text-[14px]">{label}</label>
      )}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <DropdownUI
            value={field.value}
            onChange={field.onChange}
            categories={categories}
            placeholder={placeholder}
            error={error}
            className={className}
          />
        )}
      />

      {error && <p className="text-red-500 text-xs pl-1">{error}</p>}
    </div>
  );
}

function DropdownUI({
  value,
  onChange,
  categories,
  placeholder,
  error,
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (v) => {
    onChange(v);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('relative w-full', className)} ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          readOnly
          value={value || ''}
          placeholder={placeholder}
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            'w-full cursor-pointer rounded-lg border bg-white p-4 pr-10 outline-none transition-all caret-transparent',
            error && 'border-red-500 bg-red-50',
            !error &&
              (isOpen
                ? 'border-black'
                : 'border-gray-200 hover:border-gray-300'),
          )}
        />

        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <Image
            src={isOpen ? arrowUp : arrowDown}
            alt="arrow"
            width={24}
            height={24}
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          <ul className="max-h-60 overflow-y-auto divide-y divide-gray-100">
            {categories.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => handleSelect(item)}
                  className={cn(
                    'w-full py-4 text-center transition-colors hover:bg-gray-50',
                    value === item && 'bg-gray-50 text-gray-600 font-bold',
                    'text-gray-600',
                  )}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
