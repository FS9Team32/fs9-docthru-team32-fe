'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import RichEditor from './RichEditor';
import LoadAlert from './LoadAlert';
import Header from './EditorHeader';
import SaveListModal from './SaveListModal';
import OpenOriginal from './OpenOriginal';
import listImg from '@/assets/icon_list.svg';

const STORAGE_KEY = 'challenge_draft_content';

const MOCK_WORK_DATA = {
  id: 5,
  content: `
데이터 모델링이란 정보시스템 구축의 대상이 되는 업무 내용을 분석하여 이해하고 약속된 표기법에 의해 표현하는걸 의미한다. 그리고 이렇게 분석된 모델을 가지고 실제 데이터베이스를 생성하여 개발 및 데이터 관리에 사용된다. 특히 데이터를 추상화한 데이터 모델은 데이터베이스의 골격을 이해하고 그 이해를 바탕으로 SQL문장을 기능과 성능적인 측면에서 효율적으로 작성할 수 있기 때문에, 데이터 모델링은 데이터베이스 설계의 핵심 과정이기도 하다. 데이터 모델링 데이터 모델링 순서 절차 1. 업무 파악 (요구사항 수집 및 분석) 업무 파악은 어떠한 업무를 시작하기 전에 해당하는 업무에 대해서 파악하는 단계 이다. 모델링에 앞서 가장 먼저 해야 할 것은 어떠한 업무를 데이터화하여 모델링 할 것인지에 대한 요구사항 수집일 것이다. 업무파악을 하기 좋은 방법으로는 UI를 의뢰인과 함께 확인해 나아가는 는 것이다. 그리고 궁극적으로 만들어야 하는 것이 무엇인지 심도있게 알아보아야 한다. 이 포스팅에선 우리가 흔히 사용하는 게시판을 예를 들어보겠다.
`,
  challenge: {
    title: '[테스트] React 19 공식문서 번역 챌린지',
    originalLink:
      'https://inpa.tistory.com/entry/DB-%F0%9F%93%9A-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%AA%A8%EB%8D%B8%EB%A7%81-1N-%EA%B4%80%EA%B3%84-%F0%9F%93%88-ERD-%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8',
  },
};

const fetchChallengeInfo = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/challenges/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return MOCK_WORK_DATA.challenge;
  }
};

const fetchWorkInfo = async (workId) => {
  try {
    console.log('🔥 요청 URL 확인:', url);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/works/${workId}`,

      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    );
    if (!response.ok) throw new Error('작업물을 불러오는데 실패했습니다.');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return MOCK_WORK_DATA;
  }
};

export default function EditorForm() {
  const router = useRouter();
  const params = useParams();

  const challengeId = params?.id;
  const workId = params?.workId;

  const isEditMode = !!workId;

  const [originalLink, setOriginalLink] = useState('');
  const [showOriginal, setShowOriginal] = useState(false);

  const [content, setContent] = useState('');
  const [challengeTitle, setChallengeTitle] = useState('');

  const [showLoadAlert, setShowLoadAlert] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    if (isEditMode && workId) {
      fetchWorkInfo(workId).then((data) => {
        if (data && data.content) {
          setContent(data.content);
        }
      });
    }
  }, [isEditMode, workId]);

  // 임시저장 로드 (write 페이지만)
  useEffect(() => {
    if (isEditMode) return;

    let timer;
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      timer = setTimeout(() => {
        const currentSavedData = localStorage.getItem(STORAGE_KEY);
        if (currentSavedData) {
          const parsedData = JSON.parse(currentSavedData);
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            setDrafts(parsedData);
            setShowLoadAlert(true);
          }
        }
      }, 0);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isEditMode]);

  useEffect(() => {
    if (challengeId) {
      fetchChallengeInfo(challengeId).then((data) => {
        if (data) {
          setChallengeTitle(data.title);
          setOriginalLink(data.originalLink);
        }
      });
    }
  }, [challengeId]);

  const handleSaveDraft = () => {
    if (!content || content === '<p></p>') return alert('내용이 비어있습니다.');

    const newDraft = {
      id: Date.now(),
      challengeId: challengeId,
      title: challengeTitle,
      content: content,
      date: new Date().toLocaleString(),
    };

    const updatedDrafts = [newDraft, ...drafts];
    setDrafts(updatedDrafts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDrafts));
    alert('임시 저장되었습니다!');
  };

  const handleConfirmAlert = () => {
    setShowLoadAlert(false);
    setShowListModal(true);
  };

  const handleSelectDraft = (draft) => {
    if (confirm('현재 작성 중인 내용이 사라집니다. 불러오시겠습니까?')) {
      setContent(draft.content);
      setShowListModal(false);
    }
  };

  const handleDeleteDraft = (e, id) => {
    e.stopPropagation();
    if (confirm('삭제하시겠습니까?')) {
      const updatedDrafts = drafts.filter((item) => item.id !== id);
      setDrafts(updatedDrafts);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDrafts));
    }
  };

  const handleSubmit = async () => {
    if (!content || content === '<p></p>') return alert('내용을 입력해주세요.');

    const url = isEditMode
      ? `${process.env.NEXT_PUBLIC_API_URL}/works/${workId}`
      : `${process.env.NEXT_PUBLIC_API_URL}/challenges/${challengeId}/works`;

    const method = isEditMode ? 'PATCH' : 'POST';
    const token = localStorage.getItem('accessToken');

    if (!token) {
      alert('로그인이 필요합니다.');
      return router.push('/login');
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();
      if (response.ok) {
        if (!isEditMode) localStorage.removeItem(STORAGE_KEY);
        alert(isEditMode ? '수정이 완료되었습니다!' : '제출되었습니다! ');
        router.push(`/challenge/${challengeId}/${isEditMode ? workId : ''}`);
      } else {
        alert(data.message || '실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('오류가 발생했습니다.');
    }
  };

  const handleCancel = () => {
    if (confirm('작성을 취소하시겠습니까?')) {
      setContent('');
      router.back();
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
      <div
        className={`flex flex-col transition-all ${
          showOriginal
            ? 'w-3/5 ml-0 mr-auto px-6'
            : 'w-full max-w-4xl mx-auto px-4'
        }`}
      >
        <Header
          title={isEditMode ? `${challengeTitle} (수정중)` : challengeTitle}
          onSave={handleSaveDraft}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />

        <div className="w-full flex flex-col bg-white rounded-lg shadow-sm overflow-hidden min-h-[calc(100vh-100px)]">
          <RichEditor content={content} onChange={setContent} />
        </div>
      </div>

      {showLoadAlert && (
        <LoadAlert
          onConfirm={handleConfirmAlert}
          onClose={() => setShowLoadAlert(false)}
        />
      )}

      {!showOriginal && (
        <button
          onClick={() => setShowOriginal(true)}
          className="fixed top-32 right-0 z-40 bg-white border border-gray-200 border-r-0 shadow-md py-3 px-4 rounded-l-2xl flex items-center gap-2 hover:bg-gray-50 hover:pl-5 transition-all group"
        >
          <div className="bg-gray-800 text-white p-1 rounded">
            <Image src={listImg} alt="list" width={20} height={20} />
          </div>
          <span className="font-bold text-sm text-gray-700">원문</span>
        </button>
      )}

      <OpenOriginal
        isOpen={showOriginal}
        link={originalLink}
        onClose={() => setShowOriginal(false)}
      />

      <SaveListModal
        isOpen={showListModal}
        onClose={() => setShowListModal(false)}
        drafts={drafts}
        onSelect={handleSelectDraft}
        onDelete={handleDeleteDraft}
      />
    </div>
  );
}
