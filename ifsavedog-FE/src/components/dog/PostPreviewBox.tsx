interface PostPreviewBoxProps {
  id: number;
  title: string;
  imageUrl: string;
  onClick?: (id: number) => void;
}

const PostPreviewBox = ({
  id,
  title,
  imageUrl,
  onClick,
}: PostPreviewBoxProps) => {
  return (
    <div
      className="w-full h-32 overflow-hidden cursor-pointer box-border" // box-border로 크기 조정
      onClick={() => onClick && onClick(id)} // 클릭 이벤트 핸들러
    >
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
    </div>
  );
};

export default PostPreviewBox;
