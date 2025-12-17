'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import ChallengeSummary from './_components/ChallengeSummary';
import BestTranslation from './_components/BestTranslation';
import ParticipantList from './_components/ParticipantList';
import ActionCard from './_components/ActionCard';

import BtnRight from '@/assets/btn_right.svg';

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  const pad = (n) => String(n).padStart(2, '0');
  return `${String(d.getFullYear()).slice(-2)}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export default function ChallengeDetailView({ data: challenge }) {
  const [bestPage, setBestPage] = useState(0);

  if (!challenge) {
    return (
      <div className="flex w-full h-[500px] items-center justify-center">
        <p className="text-gray-500 font-medium">데이터를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const {
    status,
    works,
    maxParticipants,
    myWorkId,
    id,
    deadlineAt,
    originalLink,
  } = challenge;

  const isRecruiting = status === 'RECRUITING' || status === 'PENDING';
  const isFull = works.length >= maxParticipants;
  const isParticipating = !!myWorkId;
  const isClosed = status === 'CLOSED';
  const showFullBanner = isRecruiting && isFull && !isParticipating;

  const bestWorks =
    isClosed && works.length > 0
      ? works.filter(
          (w) => w.likeCount === Math.max(...works.map((i) => i.likeCount)),
        )
      : [];

  let denseRank = 1;
  const participantList = works.map((work, index, array) => {
    if (index > 0 && work.likeCount < array[index - 1].likeCount) denseRank++;

    return {
      id: work.id,
      rank: denseRank,
      nickname: work.worker.nickname,
      role: work.worker.role === 'PRO' ? '전문가' : '일반',
      likes: work.likeCount,
      submittedAt: formatDate(work.createdAt),
      avatar: work.worker.avatar,
    };
  });

  const hasMultiple = bestWorks.length > 1;
  const CARD_WIDTH = hasMultiple ? 826 : 890;
  const GAP = hasMultiple ? 22 : 0;

  const handleNextBest = () => {
    setBestPage((prev) => (prev < bestWorks.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="flex w-full justify-center p-4 bg-white">
      <div className="relative w-[890px]">
        <main className="w-full">
          <ChallengeSummary challenge={challenge} isFull={showFullBanner} />

          {bestWorks.length > 0 && (
            <div className="mt-8 relative w-full">
              <div className="w-full overflow-hidden rounded-xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out will-change-transform"
                  style={{
                    transform: `translateX(${-(bestPage * (CARD_WIDTH + GAP))}px)`,
                    gap: `${GAP}px`,
                  }}
                >
                  {bestWorks.map((work, index) => {
                    const isActive = index === bestPage;
                    return (
                      <div
                        key={work.id}
                        style={{ width: `${CARD_WIDTH}px` }}
                        className={`shrink-0 transition-all duration-500 origin-left ${
                          isActive
                            ? 'opacity-100 z-10'
                            : 'opacity-40 blur-[2px] z-0'
                        }`}
                      >
                        <BestTranslation
                          work={{
                            nickname: work.worker.nickname,
                            role:
                              work.worker.role === 'PRO' ? '전문가' : '일반',
                            likes: work.likeCount,
                            date: formatDate(work.createdAt),
                            content: work.content,
                            avatar: work.worker.avatar,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {hasMultiple && (
                <button
                  onClick={handleNextBest}
                  className="absolute top-1/2 right-8 z-20 hover:scale-110 transition-transform duration-200 -translate-y-1/2"
                >
                  <Image
                    src={BtnRight}
                    alt="다음"
                    width={48}
                    height={48}
                    className="drop-shadow-md"
                  />
                </button>
              )}
            </div>
          )}

          <div className="mt-8">
            <ParticipantList participants={participantList} challengeId={id} />
          </div>
        </main>

        <aside className="absolute top-0 left-full lg:block -ml-70 pt-8">
          <ActionCard
            id={id}
            status={status}
            deadline={deadlineAt}
            currentParticipants={works.length}
            maxParticipants={maxParticipants}
            originalLink={originalLink}
            isFull={isFull}
            isParticipating={isParticipating}
          />
        </aside>
      </div>
    </div>
  );
}
