'use client';

import { useState } from 'react';
import CommentDropdown from '@/components/CommentDropdown';
import Button from '@/components/Button';

export default function FeedbackItem({
  feedback,
  isCompleted,
  currentUser,
  onUpdate,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(feedback.content);

  // 내 댓글 or 어드민 + 첼린지 마감
  const isMyComment = currentUser?.id === feedback.user.id;
  const isAdmin = currentUser?.role === 'ADMIN';
  const canModify = (isMyComment || isAdmin) && !isCompleted;

  const handleEditClick = () => {
    setIsEditing(true);
    setEditText(feedback.content);
  };

  const handleUpdate = () => {
    onUpdate(feedback.id, editText);
    setIsEditing(false);
  };

  return (
    <div className="flex items-start p-4 bg-gray-50 rounded-lg mb-3 group">
      <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold text-xs mr-3 shrink-0">
        {feedback.user.name[0]}
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <div className="flex items-center">
            <span className="font-bold text-sm mr-2">{feedback.user.name}</span>
            <span className="text-xs text-gray-400">{feedback.createdAt}</span>
            {feedback.isEdited && (
              <span className="text-xs text-gray-300 ml-1">(수정됨)</span>
            )}
          </div>

          {canModify && !isEditing && (
            <CommentDropdown
              onEdit={handleEditClick}
              onDelete={() => onDelete(feedback.id)}
            />
          )}
        </div>

        {isEditing ? (
          <div className="mt-2">
            <textarea
              className="w-full border border-gray-300 rounded p-2 text-sm mb-2 focus:outline-purple-500"
              rows={3}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                취소
              </Button>
              <Button variant="solid" size="sm" onClick={handleUpdate}>
                저장
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-700 leading-normal whitespace-pre-wrap">
            {feedback.content}
          </p>
        )}
      </div>
    </div>
  );
}
