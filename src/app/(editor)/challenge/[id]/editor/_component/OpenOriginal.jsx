'use client';

import { ArrowUpRight, X } from 'lucide-react';
import Button from '@/components/Button';
export default function OpenOriginal({ isOpen, link, onClose }) {
  if (!isOpen) return null;
  return (
    <>
      <div
        // 모바일일때는 위쪽에서 열리게
        className={`fixed z-50 bg-white shadow-xl flex flex-col transition-transform duration-300 ease-in-out         
          top-0 left-0 w-full h-[40%] rounded-t-xl 
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}

          md:top-0 md:right-0 md:bottom-auto md:left-auto md:h-full md:w-2/5 md:min-w-[400px] md:rounded-none
          md:${isOpen ? 'translate-x-0' : 'translate-x-full'}
          md:translate-y-0
        `}
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
