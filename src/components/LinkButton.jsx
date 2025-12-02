// components/LinkButton.jsx
import Link from 'next/link';
import { cn } from '@/lib/util.js';

export default function LinkButton({ href, children, className }) {
  return (
    <Link href={href} className="w-full">
      <button
        className={cn(
          'inline-flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white p-3 text-lg    text-gray-900 hover:bg-gray-100',
          className,
        )}
      >
        {children}
      </button>
    </Link>
  );
}
