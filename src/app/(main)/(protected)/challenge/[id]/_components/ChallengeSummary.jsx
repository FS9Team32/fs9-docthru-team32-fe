'use client';

import React from 'react';
import Image from 'next/image';
import icDeadline from '@/assets/ic_deadline.svg';
import icPerson from '@/assets/ic_person.svg';
import TypeChip from '@/components/TypeChip';
import { CATEGORY_TEXT } from '@/constants/challengeConstants';
import ImgMember from '@/assets/member.png';

const getMatchingChipKey = (input) => {
  if (!input) return null;
  const cleanInput = input.trim().toUpperCase();
  const matchedEntry = Object.entries(CATEGORY_TEXT).find(([key, value]) => {
    return (
      key.toUpperCase() === cleanInput || value.toUpperCase() === cleanInput
    );
  });
  return matchedEntry ? matchedEntry[0] : null;
};

export default function ChallengeSummary({ challenge, isFull }) {
  const { title, description, creator, category, documentType, status } =
    challenge;
  const chipType = getMatchingChipKey(category);
  const isClosed = status === 'CLOSED';

  return (
    <div className="challenge-summary-container">
      {(isFull || isClosed) && (
        <div
          className={`mb-4 flex h-10 w-[200px] items-center gap-2.5 rounded-3xl px-4 py-2.5 ${
            isFull ? 'bg-gray-100 text-gray-700' : 'bg-gray-700 text-white'
          }`}
        >
          {isFull ? (
            <>
              <Image
                src={icPerson}
                alt="모집 완료"
                width={16}
                height={16}
                className="h-4 w-4"
              />
              <span className="text-sm">모집이 완료된 상태에요</span>
            </>
          ) : (
            <>
              <Image
                src={icDeadline}
                alt="마감"
                width={16}
                height={16}
                className="h-4 w-4"
              />
              <span className="text-sm">챌린지가 마감되었어요</span>
            </>
          )}
        </div>
      )}

      <h1 className="title mb-4 text-2xl font-bold leading-tight text-gray-900">
        {title}
      </h1>

      <div className="tags-area mb-6 flex flex-wrap gap-2">
        {chipType && (
          <TypeChip
            type={chipType}
            className="h-auto px-2.5 py-1 text-xs font-bold"
          />
        )}
        {documentType && (
          <span className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-500">
            {documentType === 'Official' ? '공식문서' : documentType}
          </span>
        )}
      </div>

      <p className="description mb-6 whitespace-pre-wrap leading-relaxed text-gray-700">
        {description}
      </p>

      <div className="author-info flex items-center gap-2 border-b border-gray-100 pb-5">
        <div className="relative h-6 w-6 overflow-hidden rounded-full border border-gray-200">
          <Image
            src={creator?.avatar || ImgMember}
            alt="작성자 프로필"
            fill
            className="object-cover"
          />
        </div>
        <span className="author-name text-sm font-bold text-gray-700">
          {creator?.nickname || '작성자'}
        </span>
      </div>
    </div>
  );
}
