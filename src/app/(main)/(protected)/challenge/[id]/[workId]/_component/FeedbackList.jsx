'use client';

import { useState } from 'react';
import FeedbackItem from './FeedbackItem';
import Image from 'next/image';
import Empty from '@/assets/empty.png';
import Button from '@/components/Button';

export default function FeedbackList({
  feedbacks,
  totalCount,
  isCompleted,
  currentUser,
  onUpdate,
  onDelete,
}) {
  const [visibleCount, setVisibleCount] = useState(5);

  const feedbacksArray = Array.isArray(feedbacks) ? feedbacks : [];

  const visibleFeedbacks = feedbacksArray.slice(0, visibleCount);

  const hasMore = visibleCount < feedbacksArray.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="mt-6">
      {feedbacksArray.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <Image src={Empty} alt="empty" width={120} height={120} />
          <p className="mt-4">아직 피드백이 없습니다.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {visibleFeedbacks.map((feedback) => (
              <FeedbackItem
                key={feedback.id}
                feedback={feedback}
                isCompleted={isCompleted}
                currentUser={currentUser}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-6">
              <Button
                onClick={handleLoadMore}
                variant="solid"
                className="bg-gray-100 text-gray-500"
              >
                더 보기
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
