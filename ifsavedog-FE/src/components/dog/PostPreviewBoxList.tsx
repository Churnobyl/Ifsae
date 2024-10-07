import { useNavigate } from 'react-router-dom';

interface PostPreviewBoxListProps {
  posts: Array<{ id: number; title: string; content: string }>; // 게시글 목록 데이터 타입
}

const PostPreviewBoxList = ({ posts }: PostPreviewBoxListProps) => {
  const navigate = useNavigate();

  // 게시글 클릭 시 게시글 상세 페이지로 이동
  const handlePostClick = (id: number) => {
    navigate(`/post/${id}`); // 게시글 ID를 경로에 포함하여 이동
  };

  return (
    <div className="post-preview-box-list">
      {posts.map((post) => (
        <div
          key={post.id}
          className="post-preview-box"
          onClick={() => handlePostClick(post.id)} // 게시글 클릭 이벤트 처리
          style={{
            cursor: 'pointer',
            marginBottom: '10px',
            padding: '10px',
            border: '1px solid #ccc',
          }}
        >
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostPreviewBoxList;
