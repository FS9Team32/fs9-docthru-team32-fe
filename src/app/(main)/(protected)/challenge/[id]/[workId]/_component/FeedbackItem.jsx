'use client';

import { useState } from 'react';
import Image from 'next/image';
import CommentDropdown from '@/components/CommentDropdown';
import Button from '@/components/Button';
import MemberImg from '@/assets/member.png';

export default function FeedbackItem({
  feedback,
  isCompleted,
  currentUser,
  onUpdate,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(feedback.content);

  const feedbackUser = feedback.user ||
    feedback.author || { id: 0, nickname: '알 수 없음' };
  const isMyComment = currentUser?.id === feedbackUser.id;
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

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(feedback.content);
  };

  return (
    <div className=" pb-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Image
            src={MemberImg}
            alt="avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-gray-900">
                {feedback.user.nickname}
              </span>
              <span className="text-xs text-gray-400">
                {feedback.createdAt}
              </span>
            </div>
            {feedback.isEdited && (
              <span className="text-xs text-gray-400">(수정됨)</span>
            )}
          </div>
        </div>

        {canModify && (
          <CommentDropdown
            onEdit={handleEditClick}
            onDelete={() => onDelete(feedback.id)}
          />
        )}
      </div>

      {isEditing ? (
        <div className="ml-10">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full border rounded p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {!isCompleted && (isMyComment || isAdmin) && (
            <div className="flex gap-2 mt-2">
              <Button onClick={handleUpdate} size="sm">
                수정
              </Button>
              <Button onClick={handleCancel} variant="secondary" size="sm">
                취소
              </Button>
            </div>
          )}
        </div>
      ) : (
        <p className="ml-10 text-gray-700">{feedback.content}</p>
      )}
    </div>
  );
}
