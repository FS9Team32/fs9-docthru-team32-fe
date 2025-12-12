'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/providers/ModalProvider';
import FeedbackContainer from './FeedbackContainer';
import PostContent from './PostContent';
import PostHeader from './PostHeader';
import InputModal from '@/components/modal/InputModal';

export default function WorkDetail({ params, POST_DATA }) {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const { id, workId } = params;

  const CURRENT_USER = {
    id: POST_DATA.worker.id,
    name: POST_DATA.worker.nickname,
    role: POST_DATA.worker.role,
  };
  const token = 'mocked_jwt_token_for_demo_purposes'; // 테스트용 토큰
  const [feedbacks, setFeedbacks] = useState(POST_DATA.feedbacks || []);
  const [likes, setLikes] = useState(POST_DATA.likes || 0);
  const [isLiked, setIsLiked] = useState(POST_DATA.isLiked || false);

  const handleEditPost = () => {
    router.push(`/challenge/${id}/${workId}/editor`);
  };

  const handleDeletePost = () => {
    if (CURRENT_USER.role == 'ADMIN') {
      openModal(InputModal, {
        title: '작업물 삭제 (관리자)',
        label: '삭제 사유',
        placeholder: '삭제 사유를 입력해주세요. (작성자에게 전달됩니다)',
        submitButtonText: '삭제하기',
        onClose: closeModal,

        // 주석은 알림 기능 구현시
        onSubmit: async (reason) => {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/works/${workId}`,
              {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                // body: JSON.stringify({ reason }),
              },
            );
            if (res.ok) {
              alert('삭제되었습니다.');
              closeModal();
              router.push(`/challenge/${id}`);
            } else {
              const data = await res.json();
              alert(data.message || '삭제에 실패했습니다.');
            }
          } catch (error) {
            console.error(error);
            alert('오류가 발생했습니다.');
          }
        },
      });
    } else {
      if (confirm('정말 삭제하시겠습니까?')) {
        alert('삭제되었습니다.');
        router.push(`/challenge/${id}`);
      }
    }
  };

  const handleToggleLike = async () => {
    try {
      if (isLiked) {
        await fetch(`works/${workId}/likes`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        setLikes((prev) => prev - 1);
      } else {
        await fetch(`works/${workId}/likes`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
        setLikes((prev) => prev + 1);
      }
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.error('좋아요 실패', error);
    }
  };

  const handleCreateFeedback = (text) => {
    if (POST_DATA.status === 'COMPLETED') return;
    const newFeedback = {
      id: Date.now(),
      user: CURRENT_USER,
      content: text,
      createdAt: new Date().toLocaleDateString(),
    };
    setFeedbacks([newFeedback, ...feedbacks]);
  };

  const handleUpdateFeedback = (id, newContent) => {
    setFeedbacks((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, content: newContent, isEdited: true }
          : item,
      ),
    );
  };

  const handleDeleteFeedback = (id) => {
    if (confirm('삭제하시겠습니까?')) {
      setFeedbacks((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleLoadMore = () => {
    alert('더 보기');
  };

  const postForHeader = {
    title: POST_DATA.challenge?.title || '제목 없음',
    content: POST_DATA.content,
    originalUrl: POST_DATA.challenge?.originalLink || '',
    tags: POST_DATA.challenge?.category ? [POST_DATA.challenge.category] : [],
    documentType: POST_DATA.challenge?.documentType || 'official',
    author: {
      id: POST_DATA.worker?.id,
      name: POST_DATA.worker?.nickname,
    },
    date: new Date(POST_DATA.createdAt).toLocaleDateString(),
    likes: likes,
  };

  return (
    <main className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <section className="mb-12">
          <PostHeader
            post={postForHeader}
            currentUser={CURRENT_USER}
            isCompleted={POST_DATA.challenge.status === 'CLOSED'}
            isLiked={isLiked}
            onLikeToggle={handleToggleLike}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
          />
          <PostContent content={POST_DATA.content} />
        </section>

        <FeedbackContainer
          feedbacks={feedbacks}
          currentUser={CURRENT_USER}
          isCompleted={POST_DATA.status === 'COMPLETED'}
          onCreate={handleCreateFeedback}
          onUpdate={handleUpdateFeedback}
          onDelete={handleDeleteFeedback}
          onLoadMore={handleLoadMore}
        />
      </div>
    </main>
  );
}
