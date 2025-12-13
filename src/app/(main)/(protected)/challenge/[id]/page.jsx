'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import ChallengeSummary from './_components/ChallengeSummary';
import BestTranslation from './_components/BestTranslation';
import ParticipantList from './_components/ParticipantList';
import ActionCard from './_components/ActionCard';

import ImgMember from '@/assets/member.png';
import BtnRight from '@/assets/btn_right.svg';

const TEST_SCENARIO = 'LIVE_WORKING'; //LIVE_NORMAL,  LIVE_WORKING  ,CLOSED_SINGLE_BEST  ,CLOSED_MULTI_BEST  ,RECRUIT_FULL  ,FEW_PARTICIPANTS  ,EMPTY

const getMockData = (scenario) => {
  const baseData = {
    id: 1,
    title: 'Next.js - App Router : Routing Fundamentals',
    description:
      'Next.js App Router 공식 문서 중 Routing Fundamentals 내용입니다! \n라우팅에 따른 폴더와 파일이 구성되는 법칙과 컨벤션 등에 대해 공부할 수 있을 것 같아요~!',
    category: 'Next.js',
    documentType: 'Official',
    originalLink:
      'https://nextjs.org/docs/app/building-your-application/routing',
    maxParticipants: 15,
    deadlineAt: new Date('2025-12-31T23:59:59'),
    creator: { nickname: '랩원즈올', role: 'ADMIN', avatar: ImgMember },
    status: 'RECRUITING',
    works: [],
    myWorkId: null,
  };

  const createWorks = (count, startLikes = 100) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      content:
        i === 0
          ? '내용이 아주 긴 작업물입니다. 더보기 버튼 테스트를 위해 길게 작성합니다.\n\n줄바꿈1\n줄바꿈2\n줄바꿈3\n여기까지 보여야 합니다.'
          : `공동 1등 작업물 내용입니다. 번호: ${i + 1}`,
      likeCount: startLikes - i * 10,
      createdAt: new Date(),
      worker: {
        nickname: `참여자${i + 1}`,
        role: i % 2 === 0 ? 'PRO' : 'NORMAL',
        avatar: ImgMember,
      },
    }));
  };

  switch (scenario) {
    case 'LIVE_NORMAL':
      return { ...baseData, works: createWorks(8) };
    case 'LIVE_WORKING':
      return { ...baseData, works: createWorks(5), myWorkId: 100 };
    case 'CLOSED_SINGLE_BEST':
      const worksSingle = createWorks(9, 200);
      worksSingle[0].likeCount = 1000;
      return {
        ...baseData,
        status: 'CLOSED',
        deadlineAt: new Date('2024-01-01'),
        works: worksSingle,
      };
    case 'CLOSED_MULTI_BEST':
      const worksMulti = createWorks(10, 200);
      worksMulti[0].likeCount = 500;
      worksMulti[1].likeCount = 500;
      worksMulti[2].likeCount = 500;
      worksMulti[3].likeCount = 300;
      return {
        ...baseData,
        status: 'CLOSED',
        deadlineAt: new Date('2024-01-01'),
        works: worksMulti,
      };
    case 'RECRUIT_FULL':
      return { ...baseData, works: createWorks(15), maxParticipants: 15 };
    case 'FEW_PARTICIPANTS':
      return { ...baseData, works: createWorks(3) };

    case 'NO_PARTICIPANTS':
      return { ...baseData, works: [] };

    case 'EMPTY':
      return null;
    default:
      return baseData;
  }
};

const formatDate = (date) => {
  const d = new Date(date);
  return `${String(d.getFullYear()).slice(-2)}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

export default function ChallengeDetailPage() {
  const challenge = getMockData(TEST_SCENARIO);

  const [bestPage, setBestPage] = useState(0);

  if (!challenge) {
    return (
      <div className="flex w-full h-[500px] items-center justify-center">
        <p className="text-gray-500 font-medium">데이터를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const isFull = challenge.works.length >= challenge.maxParticipants;
  const isParticipating = !!challenge.myWorkId;
  const isClosed = challenge.status === 'CLOSED';

  let bestWorks = [];
  if (isClosed && challenge.works.length > 0) {
    const maxLikes = Math.max(...challenge.works.map((w) => w.likeCount));
    bestWorks = challenge.works.filter((w) => w.likeCount === maxLikes);
  }

  let denseRank = 1;
  const participantList = challenge.works.map((work, index, array) => {
    if (index > 0 && work.likeCount < array[index - 1].likeCount) {
      denseRank++;
    }
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

  const actionData = {
    status: challenge.status,
    deadline: challenge.deadlineAt,
    currentParticipants: challenge.works.length,
    maxParticipants: challenge.maxParticipants,
    originalLink: challenge.originalLink,
    isFull,
    isParticipating,
  };

  const handleNextBest = () => {
    setBestPage((prev) => (prev < bestWorks.length - 1 ? prev + 1 : 0));
  };

  const hasMultiple = bestWorks.length > 1;
  const CONTAINER_WIDTH = 890;
  const CARD_WIDTH = hasMultiple ? 826 : CONTAINER_WIDTH;
  const GAP = hasMultiple ? 22 : 0;
  const translateX = -(bestPage * (CARD_WIDTH + GAP));

  return (
    <div className="flex w-full justify-center p-4 overflow-x-hidden bg-white">
      <div className="relative w-[890px]">
        <main className="w-full">
          <ChallengeSummary challenge={challenge} isFull={isFull} />

          {bestWorks.length > 0 && (
            <div className="mt-8 relative w-full">
              <div className="w-full overflow-hidden rounded-xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out will-change-transform"
                  style={{
                    transform: `translateX(${translateX}px)`,
                    gap: `${GAP}px`,
                  }}
                >
                  {bestWorks.map((work, index) => {
                    const isActive = index === bestPage;
                    const formattedWork = {
                      nickname: work.worker.nickname,
                      role: work.worker.role === 'PRO' ? '전문가' : '일반',
                      likes: work.likeCount,
                      date: formatDate(work.createdAt),
                      content: work.content,
                      avatar: work.worker.avatar,
                    };

                    return (
                      <div
                        key={work.id}
                        style={{ width: `${CARD_WIDTH}px` }}
                        className={`shrink-0 transition-all duration-500 origin-left
                          ${isActive ? 'opacity-100 z-10' : 'opacity-40 blur-[2px] z-0'}`}
                      >
                        <BestTranslation work={formattedWork} />
                      </div>
                    );
                  })}
                </div>
              </div>

              {hasMultiple && (
                <button
                  onClick={handleNextBest}
                  className="absolute top-1/2 -translate-y-1/2 z-20 hover:scale-110 transition-transform duration-200"
                  style={{ left: '826px', transform: 'translate(-50%, -50%)' }}
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
            <ParticipantList participants={participantList} />
          </div>
        </main>
        <aside className="absolute top-0  left-full hidden h-full w-[285px] lg:block -ml-70">
          <div className="sticky top-8">
            <ActionCard {...actionData} />
          </div>
        </aside>
      </div>
    </div>
  );
}
