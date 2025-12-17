'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import StatusBanner from '@/app/(main)/(protected)/my/apply/_components/StatusBanner';
import ReasonBox from '@/app/(main)/(protected)/my/apply/_components/ReasonBox';
import CancelMenu from '@/app/(main)/(protected)/my/apply/_components/CancelMenu';
import CancelModal from '@/app/(main)/(protected)/my/apply/_components/CancelModal';

import { cancelApplication } from '@/app/(main)/(protected)/my/apply/[id]/actions';

import LinkButton from '@/components/LinkButton';
import TypeChip from '@/components/TypeChip';
import Modal from '@/components/modal/Modal';
import InputModal from '@/components/modal/InputModal';

import { CATEGORY_TEXT } from '@/constants/challengeConstants';
import timeIcon from '@/assets/time.svg';
import personIcon from '@/assets/person.svg';
import ImgMember from '@/assets/member.png';
import IconArrowLeft from '@/assets/icon_arrow_left.svg';
import IconArrowRight from '@/assets/icon_arrow_right.svg';

const BUTTON_BASE_CLASS =
  'w-[153px] rounded-xl px-6 py-3 text-[16px] font-semibold transition';

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

const getDocumentLabel = (value) => {
  const map = { official: '공식문서', blog: '블로그' };
  return map[value] || value;
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const pad = (n) => String(n).padStart(2, '0');
  return `${String(d.getFullYear()).slice(-2)}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const formatDeadline = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return isNaN(date.getTime())
    ? ''
    : `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 마감`;
};

export default function ChallengeDetailView({
  data,
  mode = 'USER',
  onUpdateStatus,
}) {
  const router = useRouter();
  const params = useParams();

  const [viewStatus, setViewStatus] = useState(data?.status);
  const [viewFeedback, setViewFeedback] = useState(data?.adminFeedback);
  const [viewUpdatedAt, setViewUpdatedAt] = useState(
    data?.updatedAt || data?.reviewedAt,
  );

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  if (!data)
    return <div className="p-20 text-center text-gray-500">데이터 없음</div>;

  const creator = {
    nickname: data.user?.nickname || data.nickname || '참여자',
    avatar: data.user?.avatar || data.avatar,
    role: (data.user?.role || data.role) === 'PRO' ? '전문가' : '일반',
  };

  const rawId = params?.id || data?.id;
  const currentId = Number(rawId);
  const prevId = currentId > 1 ? currentId - 1 : 1;
  const nextId = currentId + 1;

  const {
    title,
    category,
    documentType,
    description,
    deadlineAt,
    maxParticipants,
    linkImage,
    originalLink,
  } = data;

  const chipType = getMatchingChipKey(category);

  const updateAdminStatus = (status, feedback = null) => {
    setViewStatus(status);
    setViewFeedback(feedback);
    setViewUpdatedAt(new Date().toISOString());
  };

  const handleConfirmCancel = async () => {
    try {
      const applicationId = data?.applicationId || data?.id;
      if (!applicationId) {
        alert('신청 정보를 찾을 수 없습니다.');
        return;
      }
      await cancelApplication(applicationId);
      alert('취소가 완료되었습니다.');
      setIsCancelModalOpen(false);
      router.replace('/my');
      router.refresh();
    } catch (error) {
      alert(error.message || '오류가 발생했습니다.');
    }
  };

  const handleAdminApprove = async () => {
    if (confirm('승인하시겠습니까?')) {
      if (onUpdateStatus) {
        await onUpdateStatus('APPROVED');
      }
      updateAdminStatus('APPROVED');
    }
  };

  const handleAdminRejectSubmit = async (reason) => {
    if (onUpdateStatus) {
      await onUpdateStatus('REJECTED', reason);
    }
    updateAdminStatus('REJECTED', reason);
    setIsRejectModalOpen(false);
  };

  return (
    <div className="mx-auto max-w-[890px] p-6 pb-20">
      {mode === 'ADMIN' && (
        <div className="mb-6 flex w-full items-center justify-between">
          <span className="text-[16px] font-medium text-gray-800">
            No. {currentId}
          </span>
          <div className="flex items-center gap-2">
            <Link
              href={`/admin/apply/${prevId}`}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
                currentId <= 1
                  ? 'cursor-not-allowed opacity-30'
                  : 'hover:bg-gray-100'
              }`}
              onClick={(e) => currentId <= 1 && e.preventDefault()}
            >
              <Image src={IconArrowLeft} alt="이전" width={24} height={24} />
            </Link>
            <Link
              href={`/admin/apply/${nextId}`}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 transition"
            >
              <Image src={IconArrowRight} alt="다음" width={24} height={24} />
            </Link>
          </div>
        </div>
      )}

      <div className="mb-8 space-y-3">
        {(mode === 'USER' || viewStatus !== 'PENDING') && (
          <StatusBanner status={viewStatus} isAdmin={mode === 'ADMIN'} />
        )}

        <ReasonBox
          status={viewStatus}
          message={viewFeedback}
          date={viewUpdatedAt}
          isAdmin={mode === 'ADMIN'}
        />
      </div>

      <div className="mb-4 flex items-start justify-between gap-4">
        <h1 className="break-keep text-2xl font-bold leading-tight text-gray-900 md:text-xl">
          {title}
        </h1>
        {mode === 'USER' && viewStatus === 'PENDING' && (
          <div className="mt-1 shrink-0">
            <CancelMenu onCancel={() => setIsCancelModalOpen(true)} />
          </div>
        )}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        {chipType && (
          <TypeChip
            type={chipType}
            className="text-xs font-bold px-2.5 py-1 h-auto"
          />
        )}
        {documentType && (
          <span className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide">
            {getDocumentLabel(documentType)}
          </span>
        )}
      </div>

      <div className="mb-6">
        <p className="whitespace-pre-line text-base leading-7 text-gray-700 md:text-lg">
          {description}
        </p>
      </div>

      {viewStatus === 'APPROVED' && (
        <div className="author-info mb-4 flex items-center gap-2">
          <div className="relative h-6 w-6 overflow-hidden rounded-full border border-gray-200">
            <Image
              src={creator.avatar || ImgMember}
              alt="작성자 프로필"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xs font-medium text-gray-800">
            {creator.nickname}
          </span>
          {creator.role === '전문가' && (
            <span className="ml-1 rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-blue-600">
              전문가
            </span>
          )}
        </div>
      )}

      <div className="mb-8 flex items-center gap-5 text-sm font-medium text-gray-500">
        <div className="flex items-center gap-1.5">
          <Image src={timeIcon} alt="마감일" width={24} height={24} />
          <span className="mt-0.5">{formatDeadline(deadlineAt)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Image src={personIcon} alt="인원" width={24} height={24} />
          <span className="mt-0.5">
            <span className="font-bold text-gray-900">{maxParticipants}</span>명
          </span>
        </div>
      </div>

      <div className="mb-6 h-px w-full bg-gray-200" />

      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-900">원문 링크</h3>
        <div className="relative w-full aspect-video overflow-hidden border border-gray-200 bg-gray-100 rounded-lg">
          {linkImage ? (
            <Image
              src={linkImage}
              alt="Link Preview"
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              이미지 없음
            </div>
          )}
          <div className="absolute right-4 top-4 z-10">
            <LinkButton
              href={originalLink || '#'}
              onClick={(e) => !originalLink && e.preventDefault()}
              className={`inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-900 shadow-md transition-colors ${
                originalLink
                  ? 'hover:bg-gray-50'
                  : 'cursor-not-allowed opacity-70'
              }`}
            >
              <span>링크 열기</span>
              <ArrowUpRight size={16} />
            </LinkButton>
          </div>
        </div>

        {mode === 'ADMIN' && viewStatus === 'PENDING' && (
          <div className="mt-10 flex justify-end gap-5">
            <button
              onClick={() => setIsRejectModalOpen(true)}
              className={`${BUTTON_BASE_CLASS} bg-red-50 text-red-500 hover:bg-red-100`}
            >
              거절하기
            </button>
            <button
              onClick={handleAdminApprove}
              className={`${BUTTON_BASE_CLASS} bg-gray-900 text-white hover:bg-black`}
            >
              승인하기
            </button>
          </div>
        )}
      </div>

      <CancelModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
      />

      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
      >
        <InputModal
          title="거절 사유 입력"
          label="거절 사유"
          placeholder="신청 거절 사유를 입력해주세요."
          submitButtonText="전송"
          onClose={() => setIsRejectModalOpen(false)}
          onSubmit={handleAdminRejectSubmit}
        />
      </Modal>
    </div>
  );
}
