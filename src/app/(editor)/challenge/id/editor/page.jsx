'use client';

import { useState } from 'react';
import RichEditor from './_component/richEditor';

export default function ChallengeEditor() {
  const [content, setContent] = useState(' ');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(content);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-lg  p-4 overflow-hidden ">
      <form
        onSubmit={handleSubmit}
        className="w-full h-full flex flex-col bg-white rounded-lg p-4 overflow-hidden "
      >
        <RichEditor content={content} onChange={setContent} />
      </form>
    </div>
  );
}
