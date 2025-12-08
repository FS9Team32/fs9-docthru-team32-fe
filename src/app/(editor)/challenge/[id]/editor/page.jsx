'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import RichEditor from './_component/RichEditor';
import LoadAlert from './_component/LoadAlert';
import Header from './_component/EditorHeader';
import SaveListModal from './_component/SaveListModal';
import OpenOriginal from './_component/OpenOriginal';
import listImg from '@/assets/icon_list.svg';

const STORAGE_KEY = 'challenge_draft_content';

const MOCK_DB = {
  1: {
    id: '1',
    title: '개발자로서 자신만의 브랜드를 구축하는 방법 (dailydev)',
    originalLink:
      'https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-windowopen-%EC%A0%95%EB%A6%AC#%E2%80%8Bwindow.open_%EC%9D%B8%EC%88%98_%EC%A0%95%EB%A6%AC',
  },
  2: {
    id: '2',
    title: '2222',
    originalLink:
      'https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-windowopen-%EC%A0%95%EB%A6%AC#%E2%80%8Bwindow.open_%EC%9D%B8%EC%88%98_%EC%A0%95%EB%A6%AC',
  },
  3: {
    id: '3',
    title: '3333',
    originalLink:
      'https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-windowopen-%EC%A0%95%EB%A6%AC#%E2%80%8Bwindow.open_%EC%9D%B8%EC%88%98_%EC%A0%95%EB%A6%AC',
  },
};

const fetchChallengeInfo = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = MOCK_DB[id];
      resolve(data || { id, title: 'Unknown', originalLink: '' });
    }, 500);
  });
};

export default function ChallengeEditor() {
  const params = useParams();
  const challengeId = params?.id;

  const [originalLink, setOriginalLink] = useState('');
  const [showOriginal, setShowOriginal] = useState(false);

  const [content, setContent] = useState('');
  const [challengeTitle, setChallengeTitle] = useState('');

  const [showLoadAlert, setShowLoadAlert] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    const getTitle = async () => {
      if (challengeId) {
        try {
          const data = await fetchChallengeInfo(challengeId);
          setChallengeTitle(data.title);
          setOriginalLink(data.originalLink);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getTitle();
  }, [challengeId]);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const timer = setTimeout(() => {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            setDrafts(parsedData);
            setShowLoadAlert(true);
          }
        }
      }, 0);
    }

    return () => clearTimeout(timer);
  }, []);

  const handleSaveDraft = () => {
    if (!content || content === '<p></p>') {
      alert('내용이 비어있습니다.');
      return;
    }

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

  const handleSubmit = () => {
    if (!content) {
      alert('내용을 입력해주세요.');
      return;
    }
    // 차후 제출하기 구현
    localStorage.removeItem(STORAGE_KEY);
    window.location.href = '/challenge';
  };

  const handleCancel = () => {
    if (confirm('작성을 취소하시겠습니까?')) {
      setContent('');
      window.location.href = '/challenge';
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
          title={challengeTitle}
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
