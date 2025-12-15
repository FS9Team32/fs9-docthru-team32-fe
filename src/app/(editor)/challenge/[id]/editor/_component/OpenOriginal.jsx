'use client';

import { ArrowUpRight, X } from 'lucide-react';
import Button from '@/components/Button';
export default function OpenOriginal({ isOpen, link, onClose }) {
  if (!isOpen) return null;
  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-2/5 min-w-100 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X size={20} />
          </Button>

          <Button
            href={link}
            size="base"
            variant="ghost"
            className="flex items-center gap-1"
          >
            <a href={link} target="_blank" className="flex">
              링크 열기
              <ArrowUpRight size={20} />
            </a>
          </Button>
        </div>

        <div className="flex-1 w-full bg-gray-50 relative">
          {link ? (
            <iframe
              src={link}
              className="w-full h-full border-none"
              title="Original Content"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
              <p>링크가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
