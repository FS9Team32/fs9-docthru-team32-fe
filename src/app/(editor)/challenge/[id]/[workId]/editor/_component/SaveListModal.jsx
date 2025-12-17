'use client';
import Modal from '@/components/modal/Modal';
import { X } from 'lucide-react';
import Button from '@/components/Button';
export default function DraftListModal({
  isOpen,
  onClose,
  drafts,
  onSelect,
  onDelete,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-[400px] max-h-[600px] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">임시저장 글</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X size={20} />
          </Button>
        </div>

        <div className="px-6 py-3 text-sm text-gray-500 bg-gray-50 border-b border-gray-100">
          총 {drafts.length}개
        </div>

        <div className="overflow-y-auto p-0">
          {drafts.length === 0 ? (
            <div className="p-10 text-center text-gray-400 text-sm">
              저장된 글이 없습니다.
            </div>
          ) : (
            drafts.map((draft) => (
              <div
                key={draft.id}
                className="group px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer relative"
                onClick={() => onSelect(draft)}
              >
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800 mb-1 truncate pr-8">
                    {draft.title || '제목 없음'}
                  </span>
                  <span className="text-xs text-gray-400">{draft.date}</span>
                </div>
                <div className="absolute right-6 top-2 flex ">
                  <p
                    onClick={(e) => onDelete(e, draft.id)}
                    className="p-2 text-gray-500 hover:text-red-500"
                  >
                    삭제
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
}
