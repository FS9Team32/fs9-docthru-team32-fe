'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/providers/ModalProvider';
import { useAuth } from '@/providers/AuthProvider';
import FeedbackContainer from './FeedbackContainer';
import PostContent from './PostContent';
import PostHeader from './PostHeader';
import InputModal from '@/components/modal/InputModal';

import {
  toggleLikeAction,
  createCommentAction,
  updateCommentAction,
  deleteCommentAction,
  deleteWorkAction,
} from '@/lib/action/works';

export default function WorkDetail({ params, POST_DATA }) {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const { id, workId } = params;
  const { user: myProfile } = useAuth();

  const workerInfo = POST_DATA.worker || {};
  const challengeInfo = POST_DATA.challenge || {};

  const postAuthor = {
    id: workerInfo.id || 0,
    nickname: workerInfo.nickname || '알 수 없음',
    role: workerInfo.role || 'NORMAL',
  };

  const initialFeedbacks = (POST_DATA.comments || []).map((comment) => ({
    ...comment,
    createdAt: new Date(comment.createdAt)
      .toISOString()
      .replace('T', ' ')
      .split('.')[0],
    user: comment.author || { id: 0, nickname: '알 수 없음' },
  }));

  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);

  // 좋아요 상태 관리
  const [likes, setLikes] = useState(POST_DATA.likeCount ?? 0);
  const [isLiked, setIsLiked] = useState(false);

  const handleEditPost = () => {
    router.push(`/challenge/${id}/${workId}/editor`);
  };

  const handleDeletePost = async () => {
    if (!myProfile) return alert('로그인이 필요합니다.');

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
            const res = await deleteWorkAction(workId, reason);
            if (res.success) {
              alert('관리자 권한으로 삭제되었습니다.');
              closeModal();
              router.push(`/challenge/${id}`);
            } else {
              alert(res.error || '삭제 실패');
            }
          },
        });
      } else {
        if (confirm('정말 삭제하시겠습니까?')) {
          const res = await deleteWorkAction(workId);
          if (res.success) {
            alert('삭제되었습니다.');
            router.push(`/challenge/${id}`);
          } else {
            alert(res.error || '삭제 실패');
          }
        }
      }
    } catch (error) {
      console.error(error);
      alert('오류가 발생했습니다.');
    }
  };

  const handleToggleLike = async () => {
    if (!myProfile) return alert('로그인이 필요합니다.');

    const prevLikes = likes;
    const prevIsLiked = isLiked;

    // 일단 추가(POST)로 시도
    setIsLiked(true);
    setLikes(prevLikes + 1);

    try {
      const res = await toggleLikeAction(workId, false); // false = POST 요청

      if (!res.success) {
        throw new Error(res.error);
      }

      // 성공하면 추가된 상태 유지
      setIsLiked(true);
    } catch (error) {
      console.error('좋아요 추가 실패', error);

      // 에러 발생 = 이미 좋아요를 누른 상태
      // 삭제(DELETE)로 재시도
      setIsLiked(false);
      setLikes(prevLikes - 1);

      try {
        const res = await toggleLikeAction(workId, true); // true = DELETE 요청

        if (!res.success) {
          throw new Error(res.error);
        }

        // 삭제 성공
        setIsLiked(false);
      } catch (deleteError) {
        console.error('좋아요 삭제도 실패', deleteError);
        // 삭제도 실패하면 원래 상태로 복구
        setIsLiked(prevIsLiked);
        setLikes(prevLikes);
        alert('좋아요 처리에 실패했습니다.');
      }
    }
  };

  const handleCreateFeedback = async (text) => {
    if (challengeInfo.status === 'CLOSED') {
      return alert('완료된 챌린지에 피드백을 작성할 수 없습니다.');
    }
    if (!myProfile) return alert('로그인이 필요합니다.');

    try {
      const res = await createCommentAction(workId, text);

      if (res.success) {
        const newFeedback = {
          ...res.data,
          user: myProfile || { nickname: '나', ...myProfile },
          createdAt: new Date().toLocaleDateString(),
        };
        setFeedbacks([newFeedback, ...feedbacks]);
      } else {
        alert(res.error || '작성 실패');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateFeedback = async (id, newContent) => {
    if (isChallengeClosed) {
      return alert('완료된 챌린지의 피드백은 수정할 수 없습니다.');
    }
    if (!myProfile) return alert('로그인이 필요합니다.');

    const res = await updateCommentAction(id, newContent);
    if (res.success) {
      setFeedbacks((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, content: newContent, isEdited: true }
            : item,
        ),
      );
    } else {
      alert(res.error || '수정 실패');
    }
  };

  const handleDeleteFeedback = async (id) => {
    if (isChallengeClosed) {
      return alert('완료된 챌린지의 피드백은 삭제할 수 없습니다.');
    }
    if (!myProfile) return alert('로그인이 필요합니다.');

    if (confirm('삭제하시겠습니까?')) {
      const res = await deleteCommentAction(id);
      if (res.success) {
        setFeedbacks((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert(res.error || '삭제 실패');
      }
    }
  };

  const handleLoadMore = () => {
    alert('더 보기 기능 준비 중');
  };

  const postForHeader = {
    title: challengeInfo.title || '제목 없음',
    tags: challengeInfo.category ? [challengeInfo.category] : [],
    documentType: challengeInfo.documentType,
    author: postAuthor,
    date: new Date(POST_DATA.createdAt).toLocaleDateString(),
    likes: likes,
  };

  const isChallengeClosed = challengeInfo.status === 'CLOSED';
  const totalCommentCount = POST_DATA.commentCount || feedbacks.length;

  return (
    <main className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <section className="mb-12">
          <PostHeader
            post={postForHeader}
            currentUser={myProfile}
            isComplete={isChallengeClosed}
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
          isCompleted={isChallengeClosed}
          totalCount={totalCommentCount}
          onCreate={handleCreateFeedback}
          onUpdate={handleUpdateFeedback}
          onDelete={handleDeleteFeedback}
          onLoadMore={handleLoadMore}
        />
      </div>
    </main>
  );
}
