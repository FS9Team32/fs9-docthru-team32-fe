'use client';

import { useState, useRef, useEffect, useId } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import calendarIcon from '@/assets/Calendar.svg';

export default function CalendarField({ name, label, placeholder, rules }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef(null);
  const id = useId();

  const error = errors[name]?.message;

  useEffect(() => {
    function handleClickOutside(e) {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full" ref={calendarRef}>
      {label && (
        <label
          htmlFor={id}
          className="text-gray-900 font-medium text-[14px] cursor-pointer"
        >
          {label}
        </label>
      )}

      <div className="relative w-full">
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, value, ref } }) => (
            <>
              <input
                id={id}
                ref={ref}
                type="text"
                value={value ? formatDate(value) : ''}
                placeholder={placeholder}
                onClick={() => setIsOpen((prev) => !prev)}
                readOnly
                className={`
                  w-full px-4 py-3.5 border rounded-2xl outline-none text-[16px] transition-colors cursor-pointer
                  placeholder-gray-400
                  ${
                    error
                      ? 'border-red-500 bg-red-50 text-gray-900'
                      : 'border-gray-300 bg-white text-gray-900 focus:border-black'
                  }
                `}
              />

              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                tabIndex={-1}
              >
                <Image
                  src={calendarIcon}
                  alt="calendar"
                  width={27}
                  height={27}
                />
              </button>

              {isOpen && (
                <div className="absolute z-50 mt-2 shadow-lg">
                  <DatePicker
                    selected={value}
                    onChange={(date) => {
                      onChange(date);
                      setIsOpen(false);
                    }}
                    inline
                  />
                </div>
              )}
            </>
          )}
        />
      </div>

      {error && <p className="text-red-500 text-xs mt-1 pl-1">{error}</p>}
    </div>
  );
}

function formatDate(date) {
  if (!date) return '';
  const y = String(date.getFullYear()).slice(-2);
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}/${m}/${d}`;
}
