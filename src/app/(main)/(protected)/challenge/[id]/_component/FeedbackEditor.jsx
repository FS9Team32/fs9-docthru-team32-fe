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
    <div className="relative mb-8">
      <textarea
        className="w-full border border-gray-200 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none placeholder:text-gray-400"
        rows={3}
        placeholder="피드백을 남겨주세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="absolute bottom-3 right-3">
        <Button
          variant="solid"
          size="sm"
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="rounded-full background-gray-800 hover:bg-gray-700"
        >
          <ArrowDown className="mr-2" size={16} />
        </Button>
      </div>
    </div>
  );
}
