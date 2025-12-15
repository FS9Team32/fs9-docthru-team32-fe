'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import RichEditor from './_component/RichEditor';
import LoadAlert from './_component/LoadAlert';
import Header from './_component/EditorHeader';
import SaveListModal from './_component/SaveListModal';
import OpenOriginal from './_component/OpenOriginal';
import listImg from '@/assets/icon_list.svg';

const STORAGE_KEY = 'challenge_draft_content';

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
  }
};

export default function ChallengeEditor() {
  const params = useParams();
  const router = useRouter();
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

  const handleSubmit = async () => {
    if (!content || content === '<p></p>') {
      alert('내용을 입력해주세요.');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        alert('로그인이 필요합니다.');
        router.push('/login');
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/challenges/${challengeId}/works`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: content,
          }),
        },
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem(STORAGE_KEY);

        alert('성공적으로 제출되었습니다! 🎉');

        router.push(`/challenge/${challengeId}`);
      } else {
        alert(data.message || '제출에 실패했습니다.');
      }
    } catch (error) {
      console.error('Submit Error:', error);
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  };

  const handleCancel = () => {
    if (confirm('작성을 취소하시겠습니까?')) {
      setContent('');

      router.push(`/challenge/${challengeId}`);
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
