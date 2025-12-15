'use client';

import { X } from 'lucide-react';
import Button from '@/components/Button';

export default function LoadAlert({ onConfirm, onClose }) {
  return (
    <div className="fixed bottom-10 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="bg-white border border-gray-200 shadow-xl rounded-lg p-4 flex items-center justify-between w-full max-w-3xl pointer-events-auto animate-fade-in-up">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="닫기"
            className="rounded-full"
          >
            <X />
          </Button>

          <span className="text-gray-700 font-medium text-sm sm:text-base">
            임시 저장된 작업물이 있어요. 저장된 작업물을 불러오시겠어요?
          </span>
        </div>

        <Button
          variant="solid"
          onClick={onConfirm}
          className="ml-4 bg-gray-900 hover:bg-black text-white px-5 py-2 rounded-md text-sm font-bold transition-colors whitespace-nowrap"
        >
          불러오기
        </Button>
      </div>
    </div>
  );
}
