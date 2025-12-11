// 분야 카테고리 텍스트
export const CATEGORY_TEXT = {
  Next: 'Next.js',
  API: 'API',
  Career: 'Career',
  Modern: 'Modern JS',
  Web: 'Web',
};

// 분야 라벨 배열 (CategoryField 등에서 사용)
export const CATEGORY_LABELS = Object.values(CATEGORY_TEXT);

// 분야 옵션 (FilterBar 등에서 사용: { label, value } 형태)
export const CATEGORY_OPTIONS = Object.entries(CATEGORY_TEXT).map(
  ([value, label]) => ({
    label,
    value,
  }),
);

// 문서 타입 옵션
export const DOCUMENT_TYPE_OPTIONS = [
  { label: '공식문서', value: 'official' },
  { label: '블로그', value: 'blog' },
];

// 문서 타입 라벨 배열 (CategoryField 등에서 사용)
export const DOCUMENT_TYPE_LABELS = DOCUMENT_TYPE_OPTIONS.map(
  (opt) => opt.label,
);

// 문서 타입 값 배열
export const DOCUMENT_TYPE_VALUES = DOCUMENT_TYPE_OPTIONS.map(
  (opt) => opt.value,
);

// 챌린지 상태 옵션 (진행중/마감)
export const STATUS_OPTIONS = [
  { label: '진행중', value: 'RECRUITING' },
  { label: '마감', value: 'CLOSED' },
];

// 챌린지 상태 라벨 배열
export const STATUS_LABELS = STATUS_OPTIONS.map((opt) => opt.label);

// 챌린지 상태 값 배열
export const STATUS_VALUES = STATUS_OPTIONS.map((opt) => opt.value);

// 챌린지 상태 코드/텍스트 (공용)
export const CHALLENGE_STATUS = {
  RECRUITING: 'RECRUITING',
  FILLED: 'FILLED',
  CLOSED: 'CLOSED',
};

export const CHALLENGE_STATUS_TEXT = {
  RECRUITING: '진행중',
  FILLED: '모집 완료',
  CLOSED: '마감',
};

// 신청 상태 텍스트
export const APPLICATION_STATUS_TEXT = {
  PENDING: '승인 대기',
  APPROVED: '신청 승인',
  REJECTED: '신청 거절',
  DELETED: '챌린지 삭제',
};

// 신청 상태 색상
export const APPLICATION_STATUS_COLORS = {
  PENDING: 'bg-[#FFFDE7] text-[#F2BC00]',
  REJECTED: 'bg-[#FFF0F0] text-[#E54946]',
  APPROVED: 'bg-[#DFF0FF] text-[#4095DE]',
  DELETED: 'bg-gray-200 text-gray-500',
};

// 신청 상태 옵션 (필터용)
export const APPLICATION_STATUS_OPTIONS = [
  { label: '전체 보기', value: 'ALL' },
  { label: APPLICATION_STATUS_TEXT.PENDING, value: 'PENDING' },
  { label: APPLICATION_STATUS_TEXT.APPROVED, value: 'APPROVED' },
  { label: APPLICATION_STATUS_TEXT.REJECTED, value: 'REJECTED' },
  { label: APPLICATION_STATUS_TEXT.DELETED, value: 'DELETED' },
];

// 정렬 옵션
export const SORT_OPTIONS = [
  { label: '신청 시간 빠른순', value: 'APPLY_ASC' },
  { label: '신청 시간 느린순', value: 'APPLY_DESC' },
  { label: '마감 기한 빠른순', value: 'DEADLINE_ASC' },
  { label: '마감 기한 느린순', value: 'DEADLINE_DESC' },
];
