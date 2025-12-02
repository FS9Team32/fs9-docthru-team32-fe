'use client';

import { useState, useRef, useEffect } from 'react';

// figma 버전에서 필터,정렬 구분 전체보기,삭제 추가
// 필터 및 정렬 옵션 데이터
const FILTER_OPTIONS = [
  { label: '전체 보기', value: 'ALL' },
  { label: '승인 대기', value: 'WAITING' },
  { label: '신청 승인', value: 'APPROVED' },
  { label: '신청 거절', value: 'REJECTED' },
  { label: '챌린지 삭제', value: 'DELETED' },
];

const SORT_OPTIONS = [
  { label: '신청 시간 빠른순', value: 'APPLY_ASC' },
  { label: '신청 시간 느린순', value: 'APPLY_DESC' },
  { label: '마감 기한 빠른순', value: 'DEADLINE_ASC' },
  { label: '마감 기한 느린순', value: 'DEADLINE_DESC' },
];

export default function ListDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('ALL'); //전체보기 기본값
  const [selectedSort, setSelectedSort] = useState('APPLY_ASC'); // 신청 빠른순 기본값

  const dropdownRef = useRef(null);

  // 현재 버튼에 표시될 텍스트 (필터 우선 표시)
  const currentLabel =
    FILTER_OPTIONS.find((o) => o.value === selectedFilter)?.label ||
    '전체 보기';

  const handleSelect = (type, value) => {
    // 선택 시 닫힘
    if (type === 'filter') setSelectedFilter(value);
    if (type === 'sort') setSelectedSort(value);
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
  }, [dropdownRef]);

  return (
    <div className="relative inline-block w-48 text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between rounded-lg border bg-white px-4 py-2.5 ${isOpen ? 'border-purple-500 text-purple-600 ring-1 ring-purple-500' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
      >
        <span>{currentLabel}</span>
        <svg
          className={`h-4 w-4 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* 드롭다운 패널 */}
      {isOpen && (
        <div className="ring-opacity-5 absolute left-0 z-50 mt-2 w-full rounded-lg bg-white shadow-xl ring-1 ring-black">
          <ul className="py-2   text-gray-700">
            {/* 1. 상태 필터 영역 */}
            {FILTER_OPTIONS.map((option) => (
              <li key={option.value}>
                <button
                  onClick={() => handleSelect('filter', option.value)}
                  className={`w-full px-4 py-2.5 text-left hover:bg-gray-50 ${selectedFilter === option.value ? 'bg-purple-50    text-purple-600' : 'text-gray-500'}`}
                >
                  {option.label}
                </button>
              </li>
            ))}

            <li className="my-1 border-t border-gray-100"></li>

            {/* 2. 정렬 옵션 영역 */}
            {SORT_OPTIONS.map((option) => (
              <li key={option.value}>
                <button
                  onClick={() => handleSelect('sort', option.value)}
                  className={`w-full px-4 py-2.5 text-left hover:bg-gray-50 ${selectedSort === option.value ? 'bg-purple-50    text-purple-600' : 'text-gray-500'}`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
