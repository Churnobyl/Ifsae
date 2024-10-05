import DefaultThumbnail from '@/assets/running-dog.png';
import DotMenu from '@/assets/icon/dot-menu.svg';
import { useEffect, useRef, useState } from 'react';

// props 타입 정의
interface VideoCardProps {
  videoId: string;
  thumbnailUrl?: string | null;
  title: string;
  isOner: boolean;
}

const VideoCard = ({
  videoId,
  thumbnailUrl,
  title,
  isOner,
}: VideoCardProps) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const thumbnailSrc = thumbnailUrl ? thumbnailUrl : DefaultThumbnail;

  const toggleMenu = () => {
    if (menuButtonRef.current) {
      const buttonRect = menuButtonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: buttonRect.bottom + window.scrollY, // 스크롤 위치 반영
        left: buttonRect.left + window.scrollX, // 스크롤 위치 반영
      });
    }
    setMenuVisible((prev) => !prev);
  };

  // 외부 클릭 시 메뉴 닫기
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) && // 메뉴 내부가 아닌지 확인
      menuButtonRef.current &&
      !menuButtonRef.current.contains(event.target as Node) // 메뉴 버튼이 아닌지 확인
    ) {
      setMenuVisible(false); // 메뉴 닫기
    }
  };

  useEffect(() => {
    // 이벤트 리스너를 항상 추가하고, 메뉴가 닫힐 때 상태만 업데이트
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div
      className="w-[140px] h-[130px] rounded-lg overflow-hidden bg-white"
      id={videoId}
    >
      {/* 비디오 썸네일 */}
      <img
        src={thumbnailSrc}
        alt="thumbnail"
        className="w-full h-[98px] rounded-lg object-cover"
      />

      {/* 제목 및 메뉴 버튼 */}
      <div className="py-1 flex justify-between items-center">
        <p className="text-[10px] font-medium text-black">{title}</p>
        <button ref={menuButtonRef} onClick={toggleMenu}>
          <div>
            <img src={DotMenu} alt="menu" className="w-2 h-4" />
          </div>
        </button>
      </div>

      {/* 메뉴 드롭다운 */}
      {menuVisible && (
        <div
          ref={menuRef} // 메뉴 div의 ref 추가
          className="absolute right-0 top-[40px] w-[60px] text-center text-[10px] bg-white shadow-lg rounded-lg z-10"
          style={{
            position: 'fixed',
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
          }}
        >
          {isOner ? (
            <div>
              <button className="w-full px-2 py-1 hover:bg-main rounded-t-lg">
                수정하기
              </button>
              <button className="w-full px-2 py-1 hover:bg-main rounded-b-lg">
                삭제하기
              </button>
            </div>
          ) : (
            <button className="w-full px-2 py-1 hover:bg-main rounded-lg">
              좋아요 취소
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoCard;
