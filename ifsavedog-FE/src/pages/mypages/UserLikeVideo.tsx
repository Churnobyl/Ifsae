import MainLayout from '@/layouts/MainLayout';

const UserLikeVideo = () => {
  return (
    <MainLayout showTopbar={true} showBottombar={true}>
      <div className="relative w-full flex flex-col items-center">
        <div className="w-10/12 overflow-auto">
          <div className="flex flex-row justify-start items-center">
            <div className="py-2 mr-1 text-black font-semibold text-2xl">
              내가 좋아요 한 영상
            </div>
            <div className="py-3 text-black text-lg self-end">13</div>
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
