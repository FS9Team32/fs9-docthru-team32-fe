'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

import LinkButton from '@/components/LinkButton';
import StatusBanner from '../_components/StatusBanner';
import ReasonBox from '../_components/ReasonBox';
import TypeChip from '@/components/TypeChip';
import CategoryChip from '@/components/CategoryChip';
import CancelMenu from './CancelMenu';
import CancelModal from '../_components/CancelModal';

import {
  DOCUMENT_TYPE_OPTIONS,
  CATEGORY_TEXT,
} from '@/constants/challengeConstants';

import timeIcon from '@/assets/time.svg';
import personIcon from '@/assets/person.svg';

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
  if (!value) return '';
  const option = DOCUMENT_TYPE_OPTIONS.find((opt) => opt.value === value);
  return option ? option.label : value;
};

const formatDeadline = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '';
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 마감`;
};

export default function ChallengeDetailView({ data }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data) {
    return (
      <div className="p-10 text-center text-gray-500">
        데이터를 불러올 수 없습니다.
      </div>
    );
  }

  const {
    id,
    status,
    adminFeedback,
    reviewedAt,
    title,
    category,
    documentType,
    description,
    deadlineAt,
    currentParticipants,
    maxParticipants,
    linkImage,
    originalLink,
  } = data;

  const chipType = getMatchingChipKey(category);

  const handleConfirmCancel = async () => {
    try {
      alert('취소가 완료되었습니다.');
      setIsModalOpen(false);
      router.replace('/my/apply');
    } catch (error) {
      console.error(error);
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-6 pb-20">
      <div className="mb-8 space-y-3">
        <StatusBanner status={status} />
        <ReasonBox status={status} message={adminFeedback} date={reviewedAt} />
      </div>

      <div className="mb-4 flex items-start justify-between gap-4">
        <h1 className="break-keep text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
          {title}
        </h1>
        {status === 'PENDING' && (
          <div className="mt-1 shrink-0">
            <CancelMenu onCancel={() => setIsModalOpen(true)} />
          </div>
        )}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        {category && (
          <TypeChip
            type={chipType}
            className="font-bold inline-flex items-center"
          >
            {category}
          </TypeChip>
        )}

        {documentType && (
          <CategoryChip className="rounded border border-gray-300 bg-white px-3 py-1 text-xs font-medium tracking-wide text-gray-500 uppercase">
            {getDocumentLabel(documentType)}
          </CategoryChip>
        )}
      </div>

      <div className="mb-6">
        <p className="whitespace-pre-line text-base leading-7 text-gray-700 md:text-lg">
          {description}
        </p>
      </div>

      <div className="mb-8 flex items-center gap-5 text-sm font-medium text-gray-500">
        <div className="flex items-center gap-1.5">
          <Image
            src={timeIcon}
            alt="마감일"
            width={24}
            height={24}
            className="h-6 w-6"
          />
          <span className="mt-0.5">{formatDeadline(deadlineAt)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Image
            src={personIcon}
            alt="참여 인원"
            width={24}
            height={24}
            className="h-6 w-6"
          />
          <span className="mt-0.5">
            <span className="font-bold text-gray-900">
              {currentParticipants ?? 1}
            </span>
            명{maxParticipants ? ` / ${maxParticipants}명` : ''}
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
              unoptimized={true}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              이미지 없음
            </div>
          )}
          <div className="absolute right-4 top-4 z-10">
            <LinkButton
              href={originalLink || '#'}
              className={`inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-900 shadow-md transition-colors ${
                originalLink
                  ? 'hover:bg-gray-50'
                  : 'cursor-not-allowed opacity-70'
              }`}
              onClick={(e) => {
                if (!originalLink) e.preventDefault();
              }}
            >
              <span>링크 열기</span>
              <ArrowUpRight size={16} />
            </LinkButton>
          </div>
        </div>
      </div>

      <CancelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
}
