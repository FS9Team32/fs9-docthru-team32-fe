'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import CategoryChip from '@/components/CategoryChip';
import TypeChip from '@/components/TypeChip';
import icFilter from '@/assets/ic_filter.svg';
import icOut from '@/assets/ic_out.svg';

const CATEGORY_OPTIONS = Object.entries(TypeChip.text).map(
  ([value, label]) => ({
    label,
    value,
  }),
);
const DOCUMENT_TYPE_OPTIONS = [
  { label: '공식문서', value: 'official' },
  { label: '블로그', value: 'blog' },
];
const STATUS_OPTIONS = [
  { label: '진행중', value: 'RECRUITING' },
  { label: '마감', value: 'CLOSED' },
];

export default function FilterBar({ onApply, onReset }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDocumentType, setSelectedDocumentType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const modalRef = useRef(null);

  const handleCategory = (value) => {
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const handleApply = () => {
    onApply({
      categories: selectedCategories,
      documentType: selectedDocumentType,
      status: selectedStatus,
    });
    setIsOpen(false);
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedDocumentType('');
    setSelectedStatus('');
    onReset();
  };

  return (
    <div className="relative">
      <CategoryChip
        data-filter-button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-4 border"
        style={{ borderColor: '#D4D4D4' }}
      >
        <span style={{ color: '#A3A3A3' }}>필터</span>
        <Image src={icFilter} alt="필터" width={16} height={16} />
      </CategoryChip>

      {isOpen && (
        <div
          ref={modalRef}
          className="absolute left-0 top-full z-50 mt-2 rounded-lg bg-white p-6 shadow-xl"
          style={{ width: '343px', height: '541px' }}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">필터</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <Image src={icOut} alt="Close" width={20} height={20} />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="mb-3 text-sm font-medium text-gray-900">분야</h3>
            <div className="space-y-2">
              {CATEGORY_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(option.value)}
                    onChange={() => handleCategory(option.value)}
                    className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-3 text-sm font-medium text-gray-900">
              문서 타입
            </h3>
            <div className="space-y-2">
              {DOCUMENT_TYPE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="radio"
                    name="documentType"
                    checked={selectedDocumentType === option.value}
                    onChange={() => setSelectedDocumentType(option.value)}
                    className="h-4 w-4 border-gray-300 text-gray-900 focus:ring-gray-500"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-3 text-sm font-medium text-gray-900">상태</h3>
            <div className="space-y-2">
              {STATUS_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="radio"
                    name="status"
                    checked={selectedStatus === option.value}
                    onChange={() => setSelectedStatus(option.value)}
                    className="h-4 w-4 border-gray-300 text-gray-900 focus:ring-gray-500"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              초기화
            </button>
            <button
              onClick={handleApply}
              className="flex-1 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              적용하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
