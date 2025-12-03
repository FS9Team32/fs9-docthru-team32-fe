'use client';

import { useState } from 'react';
import { InputBox } from './components/inputBox';

export default function ChallengeCreate() {
  const [translation, setTranslation] = useState('');

  return (
    <div>
      <InputBox
        placeholder="번역 내용을 적어주세요"
        className="h-71"
        value={description}
        onChange={(e) => setTranslation(e.target.value)}
      ></InputBox>
    </div>
  );
}
