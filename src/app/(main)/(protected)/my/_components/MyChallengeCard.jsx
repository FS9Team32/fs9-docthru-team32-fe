'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import TypeChip from '@/components/TypeChip';
import CategoryChip from '@/components/CategoryChip';
import { CHALLENGE_STATUS } from '@/constants/challengeConstants';
import ViewMyWorkBadge from './ViewMyWorkBadge';
import ContinueChallengeBadge from './ContinueChallengeBadge';
import icPerson from '@/assets/ic_person.svg';
import icDeadline from '@/assets/ic_deadline.svg';
import icDeadlineCurrent from '@/assets/ic_deadlinecurrent.svg';
import icPersonCurrent from '@/assets/ic_personcurrent.svg';

export default function MyChallengeCard({ challenge, type = 'inProgress' }) {
  const router = useRouter();

  const deadlineDate = useMemo(() => {
    if (typeof window === 'undefined') return '';

    const date = new Date(challenge.deadlineAt);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  }, [challenge.deadlineAt]);

  const isFull = challenge.workCount >= challenge.maxParticipants;
  const currentParticipants = challenge.workCount || 0;
  const isClosed = challenge.status === CHALLENGE_STATUS.CLOSED;
  const isFilled = challenge.status === CHALLENGE_STATUS.FILLED;

  const handleViewMyWork = (e) => {
    e.preventDefault();
    const workId = challenge.myWorkId || challenge.userId;
    if (workId) {
      router.push(`/works/${workId}`);
    } else {
      router.push(`/challenge/${challenge.id}`);
    }
  };

  const handleContinueChallenge = (e) => {
    e.preventDefault();
    router.push(`/challenge/${challenge.id}/editor`);
  };

  return (
    <Link
      href={`/challenge/${challenge.id}`}
      className="block rounded-lg bg-white p-6 transition-colors hover:bg-gray-50"
      style={{ border: '3px solid #262626' }}
    >
      {/* 상태 배지 (모집 완료 또는 마감) */}
      {isFilled && (
        <div className="mb-4 flex h-10 w-[200px] items-center gap-2.5 rounded-3xl bg-gray-100 py-2.5 px-4 text-gray-700">
          <Image
            src={icPerson}
            alt="모집 완료"
            width={16}
            height={16}
            className="h-4 w-4"
          />
          <span className="text-sm">모집이 완료된 상태에요</span>
        </div>
      )}
      {isClosed && (
        <div className="mb-4 flex h-10 w-[200px] items-center gap-2.5 rounded-3xl bg-gray-700 py-2.5 px-4 text-white">
          <Image
            src={icDeadline}
            alt="마감"
            width={16}
            height={16}
            className="h-4 w-4"
          />
          <span className="text-sm">챌린지가 마감되었어요</span>
        </div>
      )}

      {/* 제목 */}
      <h3 className="mb-4 text-xl font-bold text-gray-900">
        {challenge.title}
      </h3>

      {/* 칩들 */}
      <div className="mb-4 flex flex-wrap items-center">
        <TypeChip type={challenge.category} />
        <CategoryChip>{challenge.documentType}</CategoryChip>
      </div>

      {/* 구분선 */}
      <div className="mb-4 border-t border-gray-200" />

      {/* 마감일 및 참여자 현황 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Image
              src={icDeadlineCurrent}
              alt="마감일"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            <span>{deadlineDate || challenge.deadlineAt} 마감</span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src={icPersonCurrent}
              alt="참여자"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            <span>
              {currentParticipants}/{challenge.maxParticipants}{' '}
              {isFull ? '참여 완료' : '참여중'}
            </span>
          </div>
        </div>

        {/* 뱃지 */}
        {type === 'completed' ? (
          <ViewMyWorkBadge onClick={handleViewMyWork} />
        ) : (
          <ContinueChallengeBadge onClick={handleContinueChallenge} />
        )}
      </div>
    </Link>
  );
}
