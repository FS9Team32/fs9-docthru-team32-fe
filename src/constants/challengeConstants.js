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

// 상태 옵션
export const STATUS_OPTIONS = [
  { label: '진행중', value: 'RECRUITING' },
  { label: '마감', value: 'CLOSED' },
];

// 상태 라벨 배열
export const STATUS_LABELS = STATUS_OPTIONS.map((opt) => opt.label);

// 상태 값 배열
export const STATUS_VALUES = STATUS_OPTIONS.map((opt) => opt.value);
