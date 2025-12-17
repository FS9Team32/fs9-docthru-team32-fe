'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import { ArrowDown } from 'lucide-react';

export default function FeedbackEditor({ onSubmit }) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text);
    setText('');
  };

  return (
    <div className="flex justify-between items-start gap-4 mb-8">
      <div className="relative w-full">
        <textarea
          className="w-full border border-gray-200 rounded-lg p-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none placeholder:text-gray-400 bg-white"
          rows={3}
          placeholder="피드백을 남겨주세요"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="shrink-0 mt-1">
        <Button
          variant="solid"
          size="sm"
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="rounded-full w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-800 text-gray-600 hover:text-white transition-colors"
        >
          <ArrowDown size={20} />
        </Button>
      </div>
    </div>
  );
}
