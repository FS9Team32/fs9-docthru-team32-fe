export default function PostContent({ content }) {
  return (
    <div className="py-8">
      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}
