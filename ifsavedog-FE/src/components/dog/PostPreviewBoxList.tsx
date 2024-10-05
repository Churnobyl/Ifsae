import PostPreviewBox from '@/components/dog/PostPreviewBox';

interface PostPreviewBoxListProps {
  posts: { id: number; title: string; imageUrl: string }[];
}

const PostPreviewBoxList = ({ posts }: PostPreviewBoxListProps) => {
  const handleThumbnailClick = (id: number) => {
    console.log(`포스트 ${id} 클릭됨`);
  };

  return (
    <div className="grid grid-cols-3 gap-0 w-full box-border">
      {' '}
      {/* box-border로 크기 조정 */}
      {posts.map((post) => (
        <PostPreviewBox
          key={post.id}
          id={post.id}
          title={post.title}
          imageUrl={post.imageUrl}
          onClick={handleThumbnailClick} // 클릭 이벤트 핸들러 전달
        />
      ))}
    </div>
  );
};

export default PostPreviewBoxList;
