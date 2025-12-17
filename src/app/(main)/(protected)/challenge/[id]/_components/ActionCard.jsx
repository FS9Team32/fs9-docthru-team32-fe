'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import timeIcon from '@/assets/time.svg';
import personIcon from '@/assets/person.svg';

const formatDeadline = (dateString) => {
  if (!dateString) return '날짜 미정';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '날짜 오류';
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 마감`;
};

export default function ActionCard({
  id,
  status,
  deadline,
  currentParticipants = 0,
  maxParticipants,
  originalLink,
  isFull,

  isParticipating,
}) {
  const router = useRouter();
  const isClosed = status === 'CLOSED';

  const getButtonState = () => {
    if (isClosed) return { isDisabled: true, text: '작업 도전하기' };
    if (isParticipating) return { isDisabled: false, text: '도전 계속하기' };
    if (isFull) return { isDisabled: true, text: '작업 도전하기' };
    return { isDisabled: false, text: '작업 도전하기' };
  };

  const { isDisabled, text } = getButtonState();

  const handleViewOriginal = () => {
    if (originalLink) window.open(originalLink, '_blank');
  };

  const handleAction = () => {
    router.push(`/challenge/${id}/editor`);
  };

  return (
    <div className="rounded-2xl border-2  w-[285px] h-[174px] border-gray-100 bg-white p-5">
      <div className="mb-6 flex flex-row items-center justify-center gap-6">
        <div className="flex items-center gap-1.5 text-[13px] font-normal text-gray-500">
          <Image src={timeIcon} alt="마감일" width={24} height={24} />

          <span className="shrink-0">{formatDeadline(deadline)}</span>
        </div>

        <div className="flex items-center gap-1.5 text-sm font-normal text-gray-600">
          <Image src={personIcon} alt="참여 인원" width={24} height={24} />

          <span className="shrink-0">
            <span
              className={`font-normal ${isFull ? 'font-bold text-orange-500' : 'text-gray-600'}`}
            >
              {currentParticipants}
            </span>

            {maxParticipants ? `/${maxParticipants}` : ''}
          </span>
        </div>
      </div>

      <div className="space-y-3 flex flex-col items-center">
        <button
          onClick={handleViewOriginal}
          className=" rounded-xl w-[253px] h-10 border-2 bg-yellow-400 text-sm font-bold text-black "
        >
          원문 보기
        </button>
        <button
          disabled={isDisabled}
          onClick={isDisabled ? undefined : handleAction}
          className={` rounded-xl  w-[253px] h-10 text-sm font-bold transition ${
            isDisabled
              ? 'cursor-not-allowed bg-gray-200 text-gray-500'
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          {text}
        </button>
      </div>
    </div>
  );
}
