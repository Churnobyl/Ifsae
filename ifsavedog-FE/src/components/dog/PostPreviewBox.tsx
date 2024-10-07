interface PostPreviewBoxProps {
  id: number;
  title: string;
  imageUrl: string;
  onClick?: (id: number) => void; // 선택적 클릭 이벤트
}

const PostPreviewBox = ({
  id,
  title,
  imageUrl,
  onClick,
}: PostPreviewBoxProps) => {
  return (
    <div
      className="w-full h-32 overflow-hidden cursor-pointer box-border"
      onClick={() => onClick && onClick(id)} // 클릭 이벤트가 있을 때만 실행
    >
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
    </div>
  );
};

export default PostPreviewBox;
