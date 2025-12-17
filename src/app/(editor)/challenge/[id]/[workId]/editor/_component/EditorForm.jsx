'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createWorkAction, updateWorkAction } from '@/lib/action/works';
import RichEditor from './RichEditor';
import LoadAlert from './LoadAlert';
import Header from './EditorHeader';
import SaveListModal from './SaveListModal';
import OpenOriginal from './OpenOriginal';
import listImg from '@/assets/icon_list.svg';
const STORAGE_KEY = 'DOCTHRU_EDITOR_DRAFTS';

export default function EditorForm({
  challengeId,
  workId,
  initialChallenge,
  initialWork,
}) {
  const router = useRouter();
  const isEditMode = !!workId;

  const [content, setContent] = useState(initialWork?.content || '');
  const challengeTitle = initialChallenge?.title || '';
  const originalLink = initialChallenge?.originalLink || '';

  const [showOriginal, setShowOriginal] = useState(false);
  const [showLoadAlert, setShowLoadAlert] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [drafts, setDrafts] = useState([]);

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

  const handleSaveDraft = () => {
    if (!content || content.trim() === '') return alert('내용이 비어있습니다.');
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
    if (!content || content.trim() === '') return alert('내용을 입력해주세요.');

    try {
      let res;
      if (isEditMode) {
        res = await updateWorkAction(workId, content);
      } else {
        res = await createWorkAction(challengeId, content);
      }

      if (res.success) {
        if (!isEditMode) localStorage.removeItem(STORAGE_KEY);

        alert(isEditMode ? '수정이 완료되었습니다!' : '제출되었습니다!');

        const targetWorkId = isEditMode ? workId : res.data.id;
        router.push(`/challenge/${challengeId}/${targetWorkId}`);
      } else {
        alert(res.error || '제출에 실패했습니다.');
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
      <div
        className={`flex-1 flex flex-col h-full transition-all duration-300 ease-in-out ${
          showOriginal ? 'mr-[40%]' : ''
        }`}
      >
        <Header
          title={challengeTitle}
          onSave={handleSaveDraft}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onListClick={() => setShowListModal(true)}
          onOriginalClick={() => setShowOriginal(true)}
        />

        <div className="flex-1 h-full w-full overflow-y-auto mx-auto relative [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <RichEditor content={content} onChange={setContent} />
        </div>
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
