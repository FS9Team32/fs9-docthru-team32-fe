'use client';

import { X } from 'lucide-react';

export default function LoadAlert({ onConfirm, onClose }) {
  return (
    <div className="fixed bottom-10 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="bg-white border border-gray-200 shadow-xl rounded-lg p-4 flex items-center justify-between w-full max-w-3xl pointer-events-auto animate-fade-in-up">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="닫기"
          >
            <X />
          </button>

          <span className="text-gray-700 font-medium text-sm sm:text-base">
            임시 저장된 작업물이 있어요. 저장된 작업물을 불러오시겠어요?
          </span>
        </div>

        <button
          onClick={onConfirm}
          className="ml-4 bg-gray-900 hover:bg-black text-white px-5 py-2 rounded-md text-sm font-bold transition-colors whitespace-nowrap"
        >
          불러오기
        </button>
      </div>
    </div>
  );
}
