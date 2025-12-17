'use client';

import Image from 'next/image';
import checkIcon from '@/assets/check.svg';

export default function CancelModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[320px] rounded-2xl bg-white p-6 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex justify-center">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black">
            <Image src={checkIcon} alt="확인" width={12} height={12} />
          </div>
        </div>

        <h3 className="mb-8 text-lg font-medium text-gray-800">
          정말 취소하시겠어요?
        </h3>

        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-[90px] items-center justify-center rounded-xl border-2 border-black bg-white text-base font-bold text-gray-700"
          >
            아니오
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex h-10 w-[90px] items-center justify-center rounded-xl bg-black text-base font-bold text-white"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
}
