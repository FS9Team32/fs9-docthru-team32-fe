'use client';

import { useState } from 'react';
import FeedbackContainer from './_component/FeedbackContainer';
import PostContent from './_component/PostContent';
import PostHeader from './_component/PostHeader';
const CURRENT_USER = { name: '내이름', role: 'USER' };

const POST_DATA = {
  id: 111,
  title: '개발자로써 자신만의 브랜드를 구축하는 방법(dailydev)',
  author: { name: 'nickname' },
  date: '25/12/01',
  views: 1934,
  tags: ['Career', 'Web'],
  documentType: '블로그',
  status: 'IN_PROGRESS',
  content: `일반적으로 개발자는 일련의 하드 스킬을 가지고 있어야...`,
  likes: 24,
};
const INITIAL_COMMENTS = [
  {
    id: 1,
    user: { name: '1' },
    content: 'comment 1',
    createdAt: '25/12/10',
  },
  {
    id: 2,
    user: { name: '2' },
    content: 'comment 2',
    createdAt: '25/12/10',
  },
];

export default function ChallengeDetailPage({ params }) {
  const [feedbacks, setFeedbacks] = useState(INITIAL_COMMENTS);

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
    alert('더 보기 동작');
  };

  return (
    <main className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <section className="mb-12">
          <PostHeader post={POST_DATA} />
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
