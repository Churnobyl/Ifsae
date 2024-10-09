import CenterProfileImg from '@/assets/center-profile.png';
import DefaultDogImg from '@/assets/rolling-cottonball.jpg';
import Comment from '@/components/Comment';
import DogMiniProfile from '@/components/common/DogMiniProfile';
import MainLayout from '@/layouts/MainLayout';
import { FiThumbsUp } from 'react-icons/fi';
import DefaultProfileImg from '@/assets/icon/profile.svg';

const VideoDetailPage = () => {
  // 목업 데이터
  const dogs = [
    { id: 1, profileImgUrl: DefaultDogImg, name: '강아지1' },
    { id: 2, profileImgUrl: DefaultDogImg, name: '강아지2' },
    { id: 3, profileImgUrl: DefaultDogImg, name: '강아지3' },
    { id: 4, profileImgUrl: DefaultDogImg, name: '강아지4' },
    { id: 5, profileImgUrl: DefaultDogImg, name: '강아지5' },
    { id: 6, profileImgUrl: DefaultDogImg, name: '강아지5' },
    { id: 7, profileImgUrl: DefaultDogImg, name: '강아지5' },
    { id: 8, profileImgUrl: DefaultDogImg, name: '강아지5' },
    { id: 9, profileImgUrl: DefaultDogImg, name: '강아지5' },
  ];

  const comments = [
    {
      userNickname: '유저1',
      userProfileImg: DefaultProfileImg,
      content: '너무 안쓰럽내요~~',
    },
    {
      userNickname: '유저2',
      userProfileImg: DefaultProfileImg,
      content: '너무 안쓰럽내요~~',
    },
    {
      userNickname: '유저3',
      userProfileImg: DefaultProfileImg,
      content: '너무 안쓰럽내요~~',
    },
    {
      userNickname: '유저4',
      userProfileImg: DefaultProfileImg,
      content: '너무 안쓰럽내요~~',
    },
  ];

  return (
    <MainLayout showTopbar={true} showBottombar={true}>
      <div className="w-full h-full text-black flex justify-center">
        <div className="w-11/12 flex flex-col">
          <div className="text-2xl font-bold p-2 mb-2">비디오 제목</div>

          {/* 센터 정보 */}
          <div className="flex flex-row items-center my-2">
            <img
              src={CenterProfileImg}
              alt="like"
              className="rounded-full w-7 h-7 mx-2"
            />
            <div>아이조아요양보호소</div>
          </div>

          {/* 관련된 강아지 */}
          <div className="w-full bg-lightGray rounded-md flex justify-center mb-4">
            <div className="w-11/12 flex flex-row overflow-x-auto py-2">
              <div className="inline-flex max-w-full">
                {dogs.map((dog) => (
                  <div
                    key={dog.id}
                    className="w-18 h-18 shrink-0 flex justify-center overflow-hidden"
                  >
                    <DogMiniProfile
                      profileImgUrl={dog.profileImgUrl}
                      name={dog.name}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 영상 보여주는 곳 */}
          <div className="mb-4">영상 보여주는 곳</div>

          {/* 영상 설명 */}
          <div className="w-full bg-lightGray rounded-md text-sm p-4 mb-4">
            2024년 8월 30일에 촬영한 보호센터 F4 4남매의 영상입니다~ 고양이 순자
            / 루루 / 로로 / 미미 입니다
          </div>

          {/* 좋아요 수 */}
          <div className="w-full flex justify-center mb-4">
            <div className="w-32 h-20 bg-lightGray rounded-3xl flex justify-center items-center flex-col p-2">
              <FiThumbsUp className="w-9 h-9" />
              <div>1,000</div>
            </div>
          </div>

          {/* 댓글 섹션 */}
          <div className="flex flex-col w-full mb-4">
            <div className="text-lg font-bold mb-1 px-2">댓글</div>

            {/* 댓글 입력 폼 */}
            <div className="flex items-center bg-lightGray rounded-md p-2">
              <input
                type="text"
                placeholder="작성할 댓글을 입력해주세요."
                className="flex-grow bg-whiteGray placeholder:text-sm rounded-md p-2 focus:outline-none"
              />
              <button className="ml-2 bg-lightGray text-sm rounded-md px-4 py-2 hover:bg-baseGreen">
                등록
              </button>
            </div>

            {/* 댓글 리스트 */}
            <div className="flex flex-col w-full mt-4">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="bg-white rounded-md p-2 mb-2 flex items-center"
                >
                  <Comment
                    userNickname={comment.userNickname}
                    userProfileImg={comment.userProfileImg}
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
