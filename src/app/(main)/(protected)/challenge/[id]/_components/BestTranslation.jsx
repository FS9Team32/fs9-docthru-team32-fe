'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import IconHeartFilled from '@/assets/icon_heart.svg';
import IconHeartEmpty from '@/assets/icon_emptyheart.svg';
import ImgMedal from '@/assets/img_medal.svg';
import ImgMember from '@/assets/member.png';
import IcPlusArrow from '@/assets/ic_plusarrow_down.png';

export default function BestTranslation({ work }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(work?.likes || 0);

  if (!work) return null;

  const MAX_LENGTH = 100;
  const isLongContent = work.content.length > MAX_LENGTH;

  const displayContent =
    !isExpanded && isLongContent
      ? `${work.content.substring(0, MAX_LENGTH)}...`
      : work.content;

  const handleLikeToggle = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="relative mt-6 overflow-hidden rounded-xl border-2 border-gray-100 bg-gray-50">
      <div className="absolute left-0 top-0 z-10 flex items-center gap-1.5 rounded-br-2xl bg-gray-900 px-5 py-2.5 text-sm text-white">
        <Image src={ImgMedal} alt="medal" width={16} height={16} />
        <span>최다 추천 번역</span>
      </div>

      <div className="p-6 pt-12">
        <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-2">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-gray-100">
              <Image
                src={work.avatar || ImgMember}
                alt="avatar"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-900">{work.nickname}</span>
              <span className="text-xs text-gray-500">{work.role}</span>
            </div>

            <button
              onClick={handleLikeToggle}
              className="group ml-2 flex items-center gap-1.5 rounded-full px-2 py-1 transition-colors hover:bg-gray-50"
            >
              <Image
                src={liked ? IconHeartFilled : IconHeartEmpty}
                alt="heart"
                width={16}
                height={16}
                className={`transition-transform group-hover:scale-110 ${liked ? '' : 'opacity-60'}`}
              />
              <span
                className={`text-sm ${liked ? 'text-red-500' : 'text-gray-900'}`}
              >
                {likeCount.toLocaleString()}
              </span>
            </button>
          </div>

          <span className="text-sm text-gray-400">{work.date}</span>
        </div>

        <div className="whitespace-pre-wrap text-[16px] leading-relaxed text-gray-700">
          {displayContent}
        </div>

        {isLongContent && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 flex w-full items-center justify-center gap-1 py-2 text-[16px] font-medium text-gray-800 transition-colors hover:text-gray-600"
          >
            {isExpanded ? '접기' : '더보기'}
            <span
              className={`flex items-center transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            >
              <Image src={IcPlusArrow} alt="arrow" width={24} height={24} />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
