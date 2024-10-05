const MungtsuBox = () => {
  return (
    <div className={'w-full h-full'}>
      <div className={'z-0 w-full h-full flex justify-center items-center'}>
        비디오
      </div>
      <div className={'z-10 w-full h-full flex items-end justify-center'}>
        <div className="flex items-center">
          <div>
            <div>요양소 아이콘</div>
            <div>요양소 이름</div>
          </div>
          <div>비디오 제목</div>
        </div>
        <div>
          <div>
            <div>좋아요 아이콘</div>
            <div>좋아요 수</div>
          </div>
          <div>
            <div>댓글 아이콘</div>
            <div>댓글 수</div>
          </div>
          <div>
            <div>공유 아이콘</div>
            <div>공유</div>
          </div>
          <div>
            <div>강아지 얼굴</div>
            <div>강아지 얼굴</div>
            <div>강아지 얼굴</div>
            <div>강아지 얼굴</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MungtsuBox;
