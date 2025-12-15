'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/providers/ModalProvider';
import { useAuth } from '@/providers/AuthProvider';
import FeedbackContainer from './FeedbackContainer';
import PostContent from './PostContent';
import PostHeader from './PostHeader';
import InputModal from '@/components/modal/InputModal';

export default function WorkDetail({ params, POST_DATA }) {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const { id, workId } = params;
  const { user: myProfile, isAuthChecking } = useAuth();
  const workerInfo = POST_DATA.worker || {};

  const postAuthor = {
    id: workerInfo.id || 0,
    nickname: workerInfo.nickname || '알 수 없음',
    role: workerInfo.role || 'NORMAL',
  };

  const initialFeedbacks = (POST_DATA.comments || []).map((comment) => ({
    ...comment,
    createdAt: new Date(comment.createdAt).toLocaleDateString(),
    user: comment.author || { id: 0, nickname: '알 수 없음' },
  }));

  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);

  const [likes, setLikes] = useState(
    POST_DATA._count?.likes ?? POST_DATA.likes ?? 0,
  );
  const [isLiked, setIsLiked] = useState(POST_DATA.isLiked || false);

  const handleEditPost = () => {
    router.push(`/challenge/${id}/${workId}/editor`);
  };

  const handleDeletePost = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return alert('로그인이 필요합니다.');

    try {
      const myRole = myProfile?.role;

      if (myRole === 'ADMIN') {
        openModal(InputModal, {
          title: '삭제 사유',
          label: '내용',
          placeholder: '삭제 사유를 입력해주세요.',
          submitButtonText: '전송',
          onClose: closeModal,
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
                  body: JSON.stringify({ reason }),
                },
              );

              if (res.ok) {
                alert('관리자 권한으로 삭제되었습니다.');
                closeModal();
                router.push(`/challenge/${id}`);
              } else {
                const data = await res.json();
                alert(data.message || '삭제 실패');
              }
            } catch (error) {
              console.error(error);
              alert('삭제 중 오류가 발생했습니다.');
            }
          },
        });
      } else {
        // 일반 사용자
        if (confirm('정말 삭제하시겠습니까?')) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/works/${workId}`,
            {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          if (res.ok) {
            alert('삭제되었습니다.');
            router.push(`/challenge/${id}`);
          } else {
            const data = await res.json();
            alert(data.message || '삭제 실패');
          }
        }
      }
    } catch (error) {
      console.error(error);
      alert('권한 확인 중 오류가 발생했습니다.');
    }
  };

  const handleToggleLike = async () => {
    const token = localStorage.getItem('accessToken');
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

  const handleCreateFeedback = async (text) => {
    if (POST_DATA.challenge?.status === 'CLOSED') return;
    const token = localStorage.getItem('accessToken');
    if (!token) return alert('로그인이 필요합니다.');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/works/${workId}/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: text }),
        },
      );

      if (res.ok) {
        const newComment = await res.json();
        const newFeedback = {
          ...newComment,
          user: myProfile || { nickname: '나' },
          createdAt: new Date().toLocaleDateString(),
        };
        setFeedbacks([newFeedback, ...feedbacks]);
      } else {
        alert('작성 실패');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateFeedback = (id, newContent) => {
    const token = localStorage.getItem('accessToken');
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: newContent }),
    }).then((res) => {
      if (res.ok) {
        setFeedbacks((prev) =>
          prev.map((item) =>
            item.id === id
              ? { ...item, content: newContent, isEdited: true }
              : item,
          ),
        );
      }
    });
  };

  const handleDeleteFeedback = async (id) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return alert('로그인이 필요합니다.');

    if (confirm('삭제하시겠습니까?')) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        if (res.ok) {
          setFeedbacks((prev) => prev.filter((item) => item.id !== id));
        }
      });
    }
  };

  const handleLoadMore = () => {
    alert('더 보기');
  };

  const postForHeader = {
    title: POST_DATA.challenge?.title || '제목 없음',
    content: POST_DATA.content,
    originalLink: POST_DATA.challenge?.originalLink || '',
    tags: POST_DATA.challenge?.category ? [POST_DATA.challenge.category] : [],
    documentType: POST_DATA.challenge?.documentType || 'official',
    author: {
      id: postAuthor.id,
      nickname: postAuthor.nickname,
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
            currentUser={myProfile}
            isCompleted={POST_DATA.challenge?.status === 'CLOSED'}
            isLiked={isLiked}
            onLikeToggle={handleToggleLike}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
          />
          <PostContent content={POST_DATA.content} />
        </section>

        <FeedbackContainer
          feedbacks={feedbacks}
          currentUser={myProfile}
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
