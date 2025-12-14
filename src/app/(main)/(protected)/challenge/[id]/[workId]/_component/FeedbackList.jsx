'use client';

import FeedbackItem from './FeedbackItem';
import Image from 'next/image';
import Empty from '@/assets/empty.png';
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
        <div>
          <Image
            src={Empty}
            alt="No Feedback"
            width={450}
            height={450}
            className="mx-auto "
          />
          <p className="text-center text-gray-500 mt-10">
            아직 피드백이 없습니다.
          </p>
        </div>
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
