'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TypeChip from '@/components/TypeChip';
import CategoryChip from '@/components/CategoryChip';
import AdminDropdown from './AdminDropdown';
import InputModal from '@/components/modal/InputModal';
import { CHALLENGE_STATUS } from '@/constants/challengeConstants';
import { useAuth } from '@/providers/AuthProvider';
import { useModal } from '@/providers/ModalProvider';
import icPerson from '@/assets/ic_person.svg';
import icDeadline from '@/assets/ic_deadline.svg';
import icDeadlineCurrent from '@/assets/ic_deadlinecurrent.svg';
import icPersonCurrent from '@/assets/ic_personcurrent.svg';

export default function ChallengeCard({ challenge, onDelete }) {
  const { user } = useAuth();
  const { openModal, closeModal } = useModal();
  const isAdmin = user?.role === 'ADMIN';
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

  const handleDelete = () => {
    openModal(InputModal, {
      onClose: closeModal,
      onSubmit: async (adminFeedback) => {
        try {
          if (onDelete) {
            await onDelete(challenge.id, adminFeedback);
            closeModal();
          }
        } catch (error) {
          console.error('삭제 중 에러:', error);
        }
      },
      title: '삭제 사유',
      label: '내용',
      placeholder: '삭제 사유를 입력해주세요',
      submitButtonText: '전송',
    });
  };

  return (
    <div
      className="relative block rounded-lg bg-white p-6 transition-colors hover:bg-gray-50"
      style={{ border: '3px solid #262626' }}
    >
      {isAdmin && (
        <div className="absolute top-4 right-4 z-10">
          <AdminDropdown onDelete={handleDelete} />
        </div>
      )}
      <Link href={`/challenge/${challenge.id}`} className="block">
        {/* 상태 배지 (모집 완료 또는 마감) */}
        {(isFilled || isClosed) && (
          <div
            className={`mb-4 flex h-10 w-[200px] items-center gap-2.5 rounded-3xl py-2.5 px-4 ${
              isFilled ? 'bg-gray-100 text-gray-700' : 'bg-gray-700 text-white'
            }`}
          >
            {isFilled ? (
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
      </Link>
    </div>
  );
}
