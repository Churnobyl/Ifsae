import PostPreviewBox from '@/components/dog/PostPreviewBox';

interface PostPreviewBoxListProps {
  posts: Array<{ id: number; title: string; imageUrl: string }>; // 게시글 목록 데이터 타입
}

const PostPreviewBoxList = ({ posts }: PostPreviewBoxListProps) => {
  return (
    <div
      className="post-preview-box-list"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // 가로 3개씩
      }}
    >
      {posts.map((post) => (
        <PostPreviewBox
          key={post.id}
          id={post.id}
          title={post.title}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
};

export default PostPreviewBoxList;
