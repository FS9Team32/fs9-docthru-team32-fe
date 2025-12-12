import { notFound } from 'next/navigation';
import WorkDetail from './_component/WorkDetail';

const MOCK_WORK_DATA = {
  id: 1,
  content: `
데이터 모델링이란 정보시스템 구축의 대상이 되는 업무 내용을 분석하여 이해하고 약속된 표기법에 의해 표현하는걸 의미한다. 그리고 이렇게 분석된 모델을 가지고 실제 데이터베이스를 생성하여 개발 및 데이터 관리에 사용된다.

특히 데이터를 추상화한 데이터 모델은 데이터베이스의 골격을 이해하고 그 이해를 바탕으로 SQL문장을 기능과 성능적인 측면에서 효율적으로 작성할 수 있기 때문에, 데이터 모델링은 데이터베이스 설계의 핵심 과정이기도 하다. 

데이터 모델링
데이터 모델링 순서 절차
 

1. 업무 파악 (요구사항 수집 및 분석)
업무 파악은 어떠한 업무를 시작하기 전에 해당하는 업무에 대해서 파악하는 단계 이다. 

모델링에 앞서 가장 먼저 해야 할 것은 어떠한 업무를 데이터화하여 모델링 할 것인지에 대한 요구사항 수집일 것이다. 업무파악을 하기 좋은 방법으로는 UI를 의뢰인과 함께 확인해 나아가는 는 것이다. 그리고 궁극적으로 만들어야 하는 것이 무엇인지 심도있게 알아보아야 한다.

이 포스팅에선 우리가 흔히 사용하는 게시판을 예를 들어보겠다.


`,
  createdAt: new Date().toISOString(),
  likes: 999,
  isLiked: false,

  challenge: {
    id: 10,
    title: '[테스트] React 19 공식문서 번역 챌린지',
    category: 'Web',
    documentType: 'Official',
    originalLink:
      'https://inpa.tistory.com/entry/DB-%F0%9F%93%9A-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%AA%A8%EB%8D%B8%EB%A7%81-1N-%EA%B4%80%EA%B3%84-%F0%9F%93%88-ERD-%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8',
    status: 'RECRUITING',
    deadlineAt: new Date(Date.now() + 86400000).toISOString(),
  },

  // 작성자 정보
  worker: {
    id: 5,
    nickname: '목업',
    role: 'ADMIN', // NORMAL or ADMIN or PRO
  },

  // 댓글 데이터
  feedbacks: [
    {
      id: 1,
      content: '댓글 테스트 1',
      createdAt: '2024-05-20',
      user: { id: 2, name: '디자이너' },
    },
    {
      id: 2,
      content: '댓글 테스트 2',
      createdAt: '2024-05-21',
      user: { id: 3, name: '테스터' },
    },
    {
      id: 3,
      content: '댓글 테스트 3',
      createdAt: '2024-05-22',
      user: { id: 5, name: '목업' },
    },
  ],
};

async function getWorkDetail(id, workId) {
  console.log('목업 사용');
  return MOCK_WORK_DATA;

  /* api
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/works/${workId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  } catch (error) {
    return null;
  }
  */
}
export default async function WorkDetailPage({ params }) {
  const { id, workId } = await params;
  const workDetail = await getWorkDetail(id, workId);

  if (!workDetail) {
    notFound();
  }
  return <WorkDetail params={{ id, workId }} POST_DATA={workDetail} />;
}
