'use client';

import { useState, useEffect, useRef } from 'react';

export default function InputModal({
  onClose,
  onSubmit,
  title = '입력',
  label = '내용',
  placeholder = '내용을 입력해주세요',
  submitButtonText = '전송',
  itemName,
  isLoading = false,
}) {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  }, []);
  useEffect(() => {
    return () => {
      setInputValue('');
    };
  }, []);

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      return;
    }

    onSubmit(trimmedValue);
  };

  const isSubmitDisabled = isLoading || !inputValue.trim();

  return (
    <div
      className="relative bg-white rounded-lg shadow-xl border border-gray-200"
      style={{ width: '496px' }}
    >
      <div className="flex items-center justify-between px-6 pt-6 pb-5">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mr-1"
          aria-label="모달 닫기"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="px-6 pb-6">
        {itemName && <p className="text-sm text-gray-600 mb-4">{itemName}</p>}

        <div>
          <label
            htmlFor="text-input"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            {label}
          </label>
          <textarea
            id="text-input"
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-gray-900 placeholder:text-gray-400 bg-white"
            aria-label={label}
            aria-required="true"
          />
        </div>
      </div>

      <div className="px-6 pb-6">
        <button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 disabled:bg-black disabled:text-white/70 disabled:cursor-not-allowed disabled:hover:bg-black transition-colors"
        >
          {isLoading ? '전송 중...' : submitButtonText}
        </button>
      </div>
    </div>
  );
}
