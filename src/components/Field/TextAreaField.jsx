'use client';

import { forwardRef, useId } from 'react';
import { twMerge } from 'tailwind-merge';

const TextAreaField = forwardRef(
  ({ label, placeholder, error, className = '', ...props }, ref) => {
    const id = useId();

    const baseClasses = `
      w-full px-4 py-3.5 border rounded-lg outline-none transition-colors text-[16px] placeholder-gray-400
      h-48 resize-none align-top
      ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white '}
    `;

    const combinedClasses = twMerge(baseClasses, className);

    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label
            htmlFor={id}
            className="text-gray-900 font-normal text-[16px] cursor-pointer"
          >
            {label}
          </label>
        )}

        <textarea
          id={id}
          ref={ref}
          placeholder={placeholder}
          className={combinedClasses}
          {...props}
        />

        {error && <p className="text-red-500 text-xs mt-1 pl-1">{error}</p>}
      </div>
    );
  },
);

TextAreaField.displayName = 'TextAreaField';
export default TextAreaField;
