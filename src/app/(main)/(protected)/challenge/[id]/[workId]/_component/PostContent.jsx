'use client';

export default function PostContent({ content }) {
  return (
    <div className="prose prose-lg max-w-none text-gray-900">
      <div
        className="prose max-w-none leading-relaxed text-gray-800"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
