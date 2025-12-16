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

const STORAGE_KEY = 'DOCTHRU_EDITOR_DRAFTS';

function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const fetchChallengeInfo = async (id) => {
  try {
    const token = getCookie('accessToken');
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/challenges/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      },
    );

    if (!response.ok) {
      console.warn(`Challenge fetch error: ${response.status}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('상세 에러 로그:', error);
    return null;
  }
};

const fetchWorkInfo = async (workId) => {
  try {
    const token = getCookie('accessToken');
    if (!token) return null;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/works/${workId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) throw new Error('작업물을 불러오는데 실패했습니다.');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
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

  useEffect(() => {
    if (isEditMode) return;

    const timer = setTimeout(() => {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            setDrafts(parsedData);
            setShowLoadAlert(true);
          }
        } catch (e) {
          console.error('임시저장 데이터 파싱 실패', e);
        }
      }
    }, 0);

    return () => clearTimeout(timer);
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
    if (!content || content === '') return alert('내용이 비어있습니다.');
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
    if (!content || content === '') return alert('내용을 입력해주세요.');

    const url = isEditMode
      ? `${process.env.NEXT_PUBLIC_API_URL}/works/${workId}`
      : `${process.env.NEXT_PUBLIC_API_URL}/challenges/${challengeId}/works`;

    const method = isEditMode ? 'PATCH' : 'POST';

    const token = getCookie('accessToken');

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
        body: JSON.stringify({ content, title: challengeTitle }),
      });

      const data = await response.json();

      if (response.ok) {
        if (!isEditMode) localStorage.removeItem(STORAGE_KEY);
        alert(isEditMode ? '수정이 완료되었습니다!' : '제출되었습니다!');
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
    <div className="w-full h-screen flex flex-col bg-white relative">
      <Header
        title={challengeTitle}
        onSave={handleSaveDraft}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onListClick={() => setShowListModal(true)}
        onOriginalClick={() => setShowOriginal(true)}
      />

      <div className="flex-1 overflow-hidden relative">
        <RichEditor content={content} onChange={setContent} />
      </div>

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

      {showLoadAlert && (
        <LoadAlert
          onClose={() => setShowLoadAlert(false)}
          onConfirm={handleConfirmAlert}
        />
      )}

      <SaveListModal
        isOpen={showListModal}
        onClose={() => setShowListModal(false)}
        drafts={drafts}
        onSelect={handleSelectDraft}
        onDelete={handleDeleteDraft}
      />

      <OpenOriginal
        isOpen={showOriginal}
        link={originalLink}
        onClose={() => setShowOriginal(false)}
      />
    </div>
  );
}
