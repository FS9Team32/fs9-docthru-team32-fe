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

  // 내 댓글 or 어드민 + 첼린지 마감x
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

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(feedback.content);
  };

  return (
    <div className="flex gap-2 w-full mb-3">
      <div
        className={`flex-1 flex items-start gap-3 p-4 rounded-lg transition-colors ${
          isEditing
            ? 'bg-white border border-gray-300'
            : 'bg-gray-50 border border-transparent'
        }`}
      >
        <div className="flex-1 min-w-0">
          <div className="flex gap-2">
            <div className="flex shrink-0">
              {feedback.user.profileImage ? (
                <Image
                  src={MemberImg}
                  alt={feedback.user.nickname}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold text-xs">
                  {feedback.user.nickname[0]}
                </div>
              )}
            </div>

            <div className="flex-1 flex justify-between items-start h-7 mb-4">
              <div className="flex flex-col">
                <span className="font-bold text-sm text-gray-900">
                  {feedback.user.nickname}
                </span>
                <span className="text-xs text-gray-400">
                  {feedback.createdAt}
                </span>
              </div>

              {canModify && (
                <div>
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(false)}
                        className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                      >
                        취소
                      </Button>
                      <Button
                        variant="solid"
                        size="sm"
                        onClick={handleUpdate}
                        className="h-8 text-sm bg-black text-white hover:bg-gray-800"
                      >
                        수정 완료
                      </Button>
                    </div>
                  ) : (
                    <CommentDropdown
                      onEdit={handleEditClick}
                      onDelete={() => onDelete(feedback.id)}
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {isEditing ? (
            <textarea
              className="w-full text-sm text-gray-900 bg-transparent resize-none focus:outline-none leading-normal"
              rows={3}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              autoFocus
            />
          ) : (
            <p className="text-sm text-gray-700 leading-normal whitespace-pre-wrap break-all">
              {feedback.content}
            </p>
          )}
        </div>
      </div>

      <div className="w-12 shrink-0" aria-hidden="true" />
    </div>
  );
}
