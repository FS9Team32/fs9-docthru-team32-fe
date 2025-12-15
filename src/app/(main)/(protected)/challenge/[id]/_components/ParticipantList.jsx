'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import ImgMember from '@/assets/member.png';
import IconArrowLeft from '@/assets/icon_arrow_left.svg';
import IconArrowRight from '@/assets/icon_arrow_right.svg';
import IconHeartFilled from '@/assets/icon_heart.svg';
import IcCrown from '@/assets/ic_crown.svg';

export default function ParticipantList({ participants }) {
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalCount = participants.length;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentParticipants = participants.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const formatRank = (rank) => String(rank).padStart(2, '0');

  return (
    <div className="rounded-2xl border-2 border-gray-800 p-6">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">참여 현황</h3>

        {totalCount > ITEMS_PER_PAGE && (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500">
              <span className="font-bold text-yellow-500">{currentPage}</span> /{' '}
              {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`flex h-8 w-8 items-center justify-center transition-opacity ${
                  currentPage === 1
                    ? 'cursor-not-allowed opacity-30'
                    : 'hover:opacity-70'
                }`}
              >
                <Image src={IconArrowLeft} alt="이전" width={32} height={32} />
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`flex h-8 w-8 items-center justify-center transition-opacity ${
                  currentPage === totalPages
                    ? 'cursor-not-allowed opacity-30'
                    : 'hover:opacity-70'
                }`}
              >
                <Image src={IconArrowRight} alt="다음" width={32} height={32} />
              </button>
            </div>
          </div>
        )}
      </div>

      {totalCount === 0 ? (
        <div className="flex h-[150px] w-full flex-col items-center justify-center gap-1 text-center text-gray-500">
          <p>아직 참여한 도전자가 없어요,</p>
          <p>지금 바로 도전해보세요!</p>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-gray-100">
          {currentParticipants.map((user, index) => {
            const isRealFirstPlace =
              user.rank === 1 && startIndex + index === 0;
            const isYellowText = user.rank !== 1 || isRealFirstPlace;

            return (
              <div
                key={user.id}
                className="flex items-center justify-between py-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-[21px] w-[51px] items-center justify-center gap-1.5 rounded-full bg-gray-900 px-4">
                    {isRealFirstPlace && (
                      <Image src={IcCrown} alt="crown" width={16} height={16} />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        isYellowText ? 'text-yellow-500' : 'text-white'
                      }`}
                    >
                      {formatRank(user.rank)}
                    </span>
                  </div>

                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
                    <Image
                      src={user.avatar || ImgMember}
                      alt={user.nickname}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900">
                      {user.nickname}
                    </span>
                    <span className="text-xs text-gray-400">{user.role}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Image
                      src={IconHeartFilled}
                      alt="heart"
                      width={14}
                      height={14}
                    />
                    <span>{user.likes.toLocaleString()}</span>
                  </div>

                  <Link
                    href={`/works/${user.id}`}
                    className="flex items-center gap-1 px-2 py-1.5 text-xs text-gray-500 transition hover:text-gray-900"
                  >
                    <span>작업물 보기</span>
                    <Image
                      src={IconArrowRight}
                      alt="arrow"
                      width={32}
                      height={32}
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
