'use client';

import FeedbackItem from './FeedbackItem';
import Button from '@/components/Button';

export default function FeedbackList({
  feedbacks,
  totalCount,
  onLoadMore,
  isCompleted,
  currentUser,
  onUpdate,
  onDelete,
}) {
  const hasMore = feedbacks.length < totalCount; // 불러올 데이터가 남았는지 확인

  return (
    <div className="space-y-4">
      {feedbacks.length === 0 ? (
        <p className="">첫 번째 피드백을 남겨보세요!</p>
      ) : (
        feedbacks.map((item) => (
          <FeedbackItem
            key={item.id}
            feedback={item}
            isCompleted={isCompleted}
            currentUser={currentUser}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))
      )}

      {hasMore && (
        <div className="text-center mt-6">
          <Button variant="outline" size="md" onClick={onLoadMore} className="">
            더 보기
          </Button>
        </div>
      )}
    </div>
  );
}
