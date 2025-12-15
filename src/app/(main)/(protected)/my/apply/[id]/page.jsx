import ChallengeDetailView from './ChallengeDetail';

const MOCK_APPLY_DETAIL = {
  id: 9,
  creatorId: 109,
  title: 'React 상태 관리 배우기',
  category: 'next',
  documentType: 'official',
  originalLink: 'https://react.dev/docs/state',
  description: 'Redux / Zustand 실습을 통해 상태 관리를 마스터해봅시다!',
  maxParticipants: 4,
  deadlineAt: '2024-05-20T23:59:59Z',
  createdAt: '2025-12-01T17:00:00Z',
  updatedAt: '2025-12-01T17:30:00Z',
  creator: { id: 109, nickname: 'Hannah' },

  status: 'REJECTED', // 'REJECTED' 등으로 바꿔가며 테스트
  currentParticipants: 1,
  linkImage: 'https://react.dev/images/og-home.png',
  adminFeedback: '해당 문서는 이미 번역된 챌린지가 존재합니다.',
  reviewedAt: '2025-12-02T10:00:00Z',
};

async function getApplicationDetail(applicationId) {
  //TODO: api연동
  return MOCK_APPLY_DETAIL;
}

export default async function Page({ params }) {
  const { id } = await params;
  const data = await getApplicationDetail(id);

  if (!data) {
    return <div>신청서를 찾을 수 없습니다.</div>;
  }

  return <ChallengeDetailView data={data} />;
}
