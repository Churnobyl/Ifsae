import MainLayout from '@/layouts/MainLayout';

const UserLikeVideo = () => {
  return (
    <MainLayout showTopbar={true} showBottombar={true}>
      <div className="w-full flex flex-col items-center">
        <div className="w-10/12">
          <div className="flex flex-row justify-start items-center">
            <div className="py-2 mr-1 text-black font-semibold text-[24px]">
              내가 좋아요 한 영상
            </div>
            <div className="py-3 text-black text-[18px] self-end">13</div>
          </div>

          <div>
            <div>영상 리스트를 불러오는 곳...</div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserLikeVideo;
