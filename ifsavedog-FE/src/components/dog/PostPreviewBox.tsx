import { useNavigate } from 'react-router-dom';

interface PostPreviewBoxProps {
  id: number;
  title: string;
  imageUrl: string;
}

const PostPreviewBox = ({ id, title, imageUrl }: PostPreviewBoxProps) => {
  const navigate = useNavigate();

  // 게시글 클릭 시 게시글 상세 페이지로 이동
  const handlePostClick = () => {
    navigate(`/post/${id}`); // 게시글 ID를 경로에 포함하여 이동
  };

  return (
    <div
      className="w-full h-32 overflow-hidden cursor-pointer box-border"
      onClick={handlePostClick} // 클릭 시 네비게이션 실행
      style={{
        padding: '0.5px', // 최소 패딩
      }}
    >
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
    </div>
  );
};

export default PostPreviewBox;
