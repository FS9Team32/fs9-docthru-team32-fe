'use client';

import Image from 'next/image';
import Link from 'next/link';
import ChallengeCardList from './components/ChallengeCardList';
import iconPlus from '@/assets/icon_plus.svg';

export default function ChallengePage() {
  return (
    <div
      className="min-h-screen w-screen -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)] px-4 py-8"
      style={{ backgroundColor: '#FAFAFA' }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-xl font-semibold leading-none text-gray-900">
            챌린지 목록
          </h1>
          <Link href="/challenge/createChallenge">
            <button
              className="flex h-[39px] w-[154px] items-center justify-center gap-1 rounded-[19.5px] text-white"
              style={{ backgroundColor: '#262626' }}
            >
              신규 챌린지 신청{' '}
              <Image src={iconPlus} alt="add" width={16} height={16} />
            </button>
          </Link>
        </div>
        <ChallengeCardList challenges={[]} />
      </div>
    </div>
  );
}
