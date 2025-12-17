'use client';

import StatusChip from '@/components/StatusChip';
import TypeChip from '@/components/TypeChip';
import {
  DOCUMENT_TYPE_OPTIONS,
  CATEGORY_TEXT,
} from '@/constants/challengeConstants';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const y = String(date.getFullYear()).slice(-2);
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}/${m}/${d}`;
};

const getDocumentTypeLabel = (type) => {
  const option = DOCUMENT_TYPE_OPTIONS.find((opt) => opt.value === type);
  return option?.label || type;
};

const getMatchingChipKey = (input) => {
  if (!input) return null;
  const cleanInput = input.trim().toUpperCase();
  const matchedEntry = Object.entries(CATEGORY_TEXT).find(([key, value]) => {
    return (
      key.toUpperCase() === cleanInput || value.toUpperCase() === cleanInput
    );
  });
  return matchedEntry ? matchedEntry[0] : input;
};

export default function ApplicationTable({ applications, onRowClick }) {
  if (applications.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-gray-400">아직 챌린지가 없어요.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-900">
            <th className="px-4 py-3 text-left text-sm font-medium text-white">
              No.
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-white">
              분야
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-white">
              카테고리
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-white">
              챌린지 제목
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-white">
              모집 인원
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-white">
              신청일
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-white">
              마감 기한
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-white">
              상태
            </th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application, index) => (
            <tr
              key={application.id}
              className={`border-b border-gray-100 hover:bg-gray-50 ${
                onRowClick ? 'cursor-pointer' : ''
              }`}
              onClick={() => onRowClick?.(application.id)}
            >
              <td className="px-4 py-4 text-sm text-gray-900">{index + 1}</td>
              <td className="px-4 py-4">
                <TypeChip type={getMatchingChipKey(application.category)} />
              </td>
              <td className="px-4 py-4 text-sm text-gray-700">
                {getDocumentTypeLabel(application.documentType)}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {application.title}
              </td>
              <td className="px-4 py-4 text-sm text-gray-700">
                {application.maxParticipants}
              </td>
              <td className="px-4 py-4 text-sm text-gray-700">
                {formatDate(application.createdAt)}
              </td>
              <td className="px-4 py-4 text-sm text-gray-700">
                {formatDate(application.deadlineAt)}
              </td>
              <td className="px-4 py-4">
                <StatusChip type={application.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
