import Image from 'next/image';
import MemberImg from '@/assets/member.png';
import { Heart } from 'lucide-react';
import TypeChip from '@/components/TypeChip';
import CategoryChip from '@/components/CategoryChip';
import CommentDropdown from '@/components/CommentDropdown';

export default function PostHeader({
  post,
  currentUser,
  isComplete,
  isLiked,
  onLikeToggle,
  onEdit,
  onDelete,
}) {
  const isMyPost = currentUser?.id === post.author.id;
  const isAdmin = currentUser?.role === 'ADMIN';
  const canModify = (isMyPost || isAdmin) && !isComplete;
  return (
    <header className="mb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
        {canModify && (
          <div className="flex gap-4 mb-4">
            <CommentDropdown onEdit={onEdit} onDelete={onDelete} />
          </div>
        )}
      </div>

      <div className="flex">
        {post.tags.map((tag) => (
          <TypeChip key={tag} type={tag} className="mr-2 mb-2" />
        ))}

        {post.documentType && (
          <CategoryChip className="text-sm border-gray-700 border  h-8 ">
            {post.documentType}
          </CategoryChip>
        )}
      </div>
      <div className="flex border-t border-b p-3 border-gray-200 justify-between items-center gap-4 text-xs text-gray-800 ">
        <div className="flex  gap-4 ">
          <div className=" ml-4 flex items-center ">
            <Image
              src={MemberImg}
              alt="author"
              width={24}
              height={24}
              className="inline-block rounded-full mr-1"
            />

            {post.author.nickname}
          </div>
          <button
            onClick={onLikeToggle}
            className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
          >
            <Heart size={24} fill={isLiked ? 'red' : 'none'} />
            {post.likes}
          </button>
        </div>

        <div className="mr-4">{post.date}</div>
      </div>
    </header>
  );
}
