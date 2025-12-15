'use client';

export default function MyChallengeTabs({ activeTab, onTabChange }) {
  const tabs = ['참여중인 챌린지', '완료한 챌린지', '신청한 챌린지'];

  return (
    <div className="mb-6 flex gap-6 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`pb-3 text-base font-medium transition-colors ${
            activeTab === tab
              ? 'border-b-2 border-gray-900 text-gray-900'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
