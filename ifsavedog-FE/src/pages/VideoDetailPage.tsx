import { useEffect, useState } from 'react';
import { useUserStateStore } from '@/stores/auth/userStateStore';
import { useParams, useNavigate } from 'react-router-dom';
import CenterProfileImg from '@/assets/center-profile.png';
import DefaultDogImg from '@/assets/rolling-cottonball.jpg';
import Comment from '@/components/Comment';
import DogMiniProfile from '@/components/common/DogMiniProfile';
import MainLayout from '@/layouts/MainLayout';
import { FiThumbsUp, FiThumbsUp as FilledThumbsUp } from 'react-icons/fi'; // 좋아요 아이콘 추가
import DefaultProfileImg from '@/assets/icon/profile.svg';
import {
  getPostDetailApi,
  checkPostLikeApi,
  deletePostLikeApi,
  createPostLikeApi,
  createCommentApi,
} from '@/apis/post/postApi'; // API 불러오기
import { DogType } from '@/types/dog/DogType';

interface CommentType {
  id: number;
  userNickname: string;
  userProfileImg: string;
  content: string;
}

interface ShelterType {
  id: number;
  name: string;
  porofileImgUrl: string;
}

interface PostType {
  id: number;
  title: string;
  content: string;
  videoUrl: string;
  likeCnt: number;
  viewCnt: number;
  shelter: ShelterType;
  dogs: DogType[];
  comments: CommentType[];
}

const VideoDetailPage = () => {
  const { nickname } = useUserStateStore();
  const { postId } = useParams(); // URL에서 postId 가져오기
  const [postDetail, setPostDetail] = useState<PostType | null>(null); // 게시물 상태 관리
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [liked, setLiked] = useState(false); // 좋아요 상태 관리
  const [likeCount, setLikeCount] = useState(0); // 좋아요 수 상태 관리
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate(); // useNavigate 훅

  // 게시물 데이터 불러오기 함수
  const fetchPostDetail = async (postId: number) => {
    try {
      const response = await getPostDetailApi(postId);
      setPostDetail(response.data); // 받은 데이터 상태에 저장
      setLikeCount(response.data.likeCnt); // 좋아요 수 저장
      console.log(response.data);
      console.log(response.data.likeCnt);
    } catch (error) {
      console.error('게시물 데이터를 가져오는 중 오류 발생:', error);
    } finally {
      setLoading(false); // 로딩 상태 변경
    }
  };

  // 좋아요 상태 확인 함수
  const fetchLikeStatus = async (postId: number) => {
    try {
      const likeStatus = await checkPostLikeApi(postId); // 좋아요 상태 확인 API 호출
      setLiked(likeStatus.data.isLiked); // 좋아요 상태 저장 (true/false)
    } catch (error) {
      console.error('좋아요 상태 확인 중 오류 발생:', error);
    }
  };

  // 페이지가 로드될 때 게시물 정보와 좋아요 상태 불러오기
  useEffect(() => {
    if (postId) {
      fetchPostDetail(Number(postId)); // 게시물 데이터 불러오기
      fetchLikeStatus(Number(postId)); // 좋아요 상태 확인
    }
  }, [postId]);

  // 보호소 클릭 시 이동
  const handleShelterClick = (shelterId: number) => {
    navigate(`/center/${shelterId}`);
  };

  // 강아지 클릭 시 이동
  const handleDogClick = (dogId: number) => {
    navigate(`/dog/${dogId}`);
  };

  // 댓글 등록 핸들러
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }

    try {
      // 댓글 등록 API 호출
      await createCommentApi(Number(postId), newComment);

      // 성공 시, 새로운 댓글을 기존 댓글 목록에 추가
      const newCommentObj: CommentType = {
        id: postDetail!.comments.length + 1, // 고유 ID 생성 (서버에서 생성된 ID 사용 가능)
        userNickname: nickname, // 실제 유저 정보로 변경 필요
        userProfileImg: DefaultProfileImg, // 프로필 이미지 (실제 데이터로 교체 필요)
        content: newComment,
      };

      // 새로운 댓글을 추가하여 상태 업데이트
      setPostDetail({
        ...postDetail!,
        comments: [...postDetail!.comments, newCommentObj],
      });

      // 입력 필드 초기화
      setNewComment('');
    } catch (error) {
      console.error('댓글 등록 중 오류 발생:', error);
    }
  };

  // 좋아요 상태 변경 핸들러
  const likeHandler = async () => {
    try {
      if (liked) {
        await deletePostLikeApi(Number(postId)); // 좋아요 취소 API 호출
        setLiked(false); // 좋아요 상태 변경
        setLikeCount((prevCount) => prevCount - 1); // 좋아요 수 감소
      } else {
        await createPostLikeApi(Number(postId)); // 좋아요 추가 API 호출
        setLiked(true); // 좋아요 상태 변경
        setLikeCount((prevCount) => prevCount + 1); // 좋아요 수 증가
      }
    } catch (error) {
      console.error('좋아요 상태 변경 중 오류 발생:', error);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>; // 데이터 로딩 중일 때 표시할 내용
  }

  if (!postDetail) {
    return <div>게시물을 찾을 수 없습니다.</div>; // 데이터가 없을 때 표시할 내용
  }

  return (
    <MainLayout showTopbar={true} showBottombar={true}>
      <div className="w-full h-full text-black flex justify-center">
        <div className="w-11/12 flex flex-col">
          <div className="text-2xl font-bold p-2 mb-2">{postDetail.title}</div>

          {/* 센터 정보 */}
          <div className="flex flex-row items-center my-2">
            <img
              src={postDetail.shelter.porofileImgUrl || CenterProfileImg}
              alt="center"
              className="rounded-full w-7 h-7 mx-2"
              onClick={() => handleShelterClick(postDetail.shelter.id)}
            />
            <div onClick={() => handleShelterClick(postDetail.shelter.id)}>
              {postDetail.shelter.name}
            </div>
          </div>

          {/* 관련된 강아지 */}
          <div className="w-full bg-lightGray rounded-md flex justify-center mb-4">
            <div className="w-11/12 flex flex-row overflow-x-auto py-2">
              <div className="inline-flex max-w-full">
                {postDetail.dogs.map((dog) => (
                  <div
                    key={dog.id}
                    className="w-18 h-18 shrink-0 flex justify-center overflow-hidden"
                    onClick={() => handleDogClick(dog.id)}
                  >
                    <DogMiniProfile
                      profileImgUrl={dog.image || DefaultDogImg}
                      name={dog.name}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 영상 보여주는 곳 */}
          <div className="mb-4">
            {/* 비디오 URL이 있는 경우 */}
            {postDetail.videoUrl ? (
              <video controls className="w-full">
                <source src={postDetail.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              '영상이 없습니다.'
            )}
          </div>

          {/* 영상 설명 */}
          <div className="w-full bg-lightGray rounded-md text-sm p-4 mb-4">
            {postDetail.content}
          </div>

          {/* 좋아요 수 */}
          <div className="w-full flex justify-center mb-4">
            <div className="w-32 h-20 bg-lightGray rounded-3xl flex justify-center items-center flex-col p-2">
              <div onClick={likeHandler} className="cursor-pointer">
                {/* 좋아요 여부에 따라 아이콘 변경 */}
                {liked ? (
                  <FilledThumbsUp
                    className="w-9 h-9"
                    style={{ fill: 'black', stroke: 'black' }}
                  />
                ) : (
                  <FiThumbsUp
                    className="w-9 h-9"
                    style={{ fill: 'none', stroke: 'black' }}
                  />
                )}
              </div>
              <div>{likeCount}</div>
            </div>
          </div>

          {/* 댓글 섹션 */}
          <div className="flex flex-col w-full mb-4">
            <div className="text-lg font-bold mb-1 px-2">
              댓글 {postDetail.comments.length}
            </div>

            {/* 댓글 입력 폼 */}
            <div className="flex items-center bg-lightGray rounded-md p-2">
              <input
                type="text"
                placeholder="작성할 댓글을 입력해주세요."
                className="flex-grow bg-whiteGray placeholder:text-sm rounded-md p-2 focus:outline-none"
                value={newComment} // 입력된 댓글 값
                onChange={(e) => setNewComment(e.target.value)} // 댓글 입력 상태 업데이트
              />
              <button
                className="ml-2 bg-lightGray text-sm rounded-md px-4 py-2 hover:bg-baseGreen"
                onClick={handleCommentSubmit}
              >
                등록
              </button>
            </div>

            {/* 댓글 리스트 */}
            <div className="flex flex-col w-full mt-4">
              {postDetail.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white rounded-md p-2 mb-2 flex items-center"
                >
                  <Comment
                    userNickname={comment.userNickname}
                    userProfileImg={comment.userProfileImg || DefaultProfileImg}
                    content={comment.content}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default VideoDetailPage;
