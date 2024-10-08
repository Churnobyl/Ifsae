interface CommentProps {
  userNickname: string;
  userProfileImg: string;
  content: string;
}

const Comment = ({ userNickname, userProfileImg, content }: CommentProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-start">
        <img
          src={userProfileImg}
          alt={`${userNickname}'s profile`}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex mx-2 items-center font-semibold justify-center">
          {userNickname}
        </div>
      </div>

      <div className="ml-8">{content}</div>
    </div>
  );
};

export default Comment;
