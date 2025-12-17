'use client';

import FeedbackEditor from './FeedbackEditor';
import FeedbackList from './FeedbackList';

export default function FeedbackContainer({
  feedbacks,
  currentUser,
  isCompleted,
  totalCount,
  onCreate,
  onUpdate,
  onDelete,
  onLoadMore,
}) {
  return (
    <section className="border-t border-gray-100 pt-8 mt-8">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-lg font-bold text-gray-900">피드백</h3>
        <span className="text-gray-500 text-sm">{totalCount}</span>
      </div>

      <FeedbackEditor onSubmit={onCreate} />

      <FeedbackList
        feedbacks={feedbacks}
        totalCount={totalCount}
        currentUser={currentUser}
        isCompleted={isCompleted}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onLoadMore={onLoadMore}
      />
    </section>
  );
}
