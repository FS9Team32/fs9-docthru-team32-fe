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
    <div className="flex felx-between">
      <div className="relative mb-8 w-full">
        <textarea
          className="caret-transparent w-full border border-gray-200 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none placeholder:text-gray-400"
          rows={3}
          placeholder="피드백을 남겨주세요"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <Button
          variant="solid"
          size="sm"
          onClick={handleSubmit}
          disabled={!text.trim()}
          className=" rounded-full ml-4 w-10 h-10 items-center background-gray-300 hover:bg-gray-700"
        >
          <ArrowDown className="" size={24} />
        </Button>
      </div>
    </div>
  );
}
