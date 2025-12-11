'use client';

import FeedbackEditor from './FeedbackEditor';
import FeedbackList from './FeedbackList';

export default function FeedbackContainer({
  feedbacks, // 댓글
  currentUser, // 로그인유저
  isCompleted, // 챌린지 마감 여부
  onCreate, // 댓글 등록
  onUpdate, // 댓글 수정
  onDelete, // 댓글 삭제
  onLoadMore, // 더보기
}) {
  return (
    <section className="border-t border-gray-100 pt-8 mt-8">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-lg font-bold text-gray-900">피드백</h3>
      </div>

      {!isCompleted && <FeedbackEditor onSubmit={onCreate} />}

      <FeedbackList
        feedbacks={feedbacks}
        currentUser={currentUser}
        isCompleted={isCompleted}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onLoadMore={onLoadMore}
      />
    </section>
  );
}
