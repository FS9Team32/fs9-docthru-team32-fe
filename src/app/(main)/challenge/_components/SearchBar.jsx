'use client';

import { useState } from 'react';
import Image from 'next/image';
import icSearch from '@/assets/ic_search.svg';

export default function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    onSearch(searchValue);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 h-full">
      <div
        className="flex h-full w-full items-center gap-2 border rounded-[26px] bg-white px-4 py-2"
        style={{ borderColor: '#D4D4D4' }}
      >
        <Image src={icSearch} alt="검색" width={16} height={16} />
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          placeholder="챌린지 이름을 검색해보세요"
          className="flex-1 bg-transparent text-lg outline-none placeholder:text-gray-400"
          style={{ color: '#A3A3A3' }}
        />
      </div>
    </form>
  );
}
