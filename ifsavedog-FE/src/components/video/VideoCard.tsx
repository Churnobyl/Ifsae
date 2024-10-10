import DefaultThumbnail from '@/assets/running-dog.png';
import DotMenu from '@/assets/icon/dot-menu.svg';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deletePostApi, deletePostLikeApi } from '@/apis/post/postApi';

// props 타입 정의
interface VideoCardProps {
  videoId: number;
  thumbnailUrl?: string | null;
  title: string;
  type: 'likeVideo' | 'myVideo' | 'shelterVideo';
}

const VideoCard = ({ videoId, thumbnailUrl, title, type }: VideoCardProps) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

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
      !menuRef.current.contains(event.target as Node) &&
      menuButtonRef.current &&
      !menuButtonRef.current.contains(event.target as Node)
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

  // 삭제하기 버튼을 눌렀을 때 삭제 API 호출
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await deletePostApi(Number(videoId)); // 삭제 API 호출
        alert('삭제되었습니다.');
        // 삭제 후 페이지를 새로고침하거나 목록을 업데이트하는 로직을 추가할 수 있음
        window.location.reload(); // 새로고침
      } catch (error) {
        console.error('Failed to delete post:', error);
        alert('삭제에 실패했습니다.');
      }
    }
  };

  // 좋아요 취소 버튼을 눌렀을 때 좋아요 취소 API 호출
  const handleUnlike = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파 중지
    const confirmUnlike = window.confirm('정말 좋아요를 취소하시겠습니까?');
    if (confirmUnlike) {
      try {
        await deletePostLikeApi(videoId); // 좋아요 취소 API 호출
        alert('좋아요가 취소되었습니다.');
        window.location.reload(); // 새로고침
      } catch (error) {
        console.error('Failed to unlike the post:', error);
        alert('좋아요 취소에 실패했습니다.');
      }
    }
  };

  // 비디오 카드를 클릭했을 때 비디오 상세 페이지로 이동
  const handleCardClick = () => {
    navigate(`/post/${videoId}`); // 비디오 상세 페이지로 이동
  };

  return (
    <div
      className="w-[140px] h-[130px] rounded-lg overflow-hidden bg-white cursor-pointer"
      onClick={handleCardClick} // 카드 클릭 시 상세 페이지로 이동
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
        <button
          ref={menuButtonRef}
          onClick={(e) => {
            e.stopPropagation(); // 메뉴 버튼 클릭 시 카드 클릭 이벤트 방지
            toggleMenu();
          }}
        >
          {type !== 'shelterVideo' && (
            <div>
              <img src={DotMenu} alt="menu" className="w-2 h-4" />
            </div>
          )}
        </button>
      </div>

      {/* 메뉴 드롭다운 */}
      {menuVisible && (
        <div
          ref={menuRef} // 메뉴 div의 ref 추가
          className="absolute right-0 top-[40px] w-[70px] text-[10px] bg-white shadow-lg rounded-lg z-10"
          style={{
            position: 'fixed',
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left - 60}px`,
          }}
        >
          <div>
            {type === 'myVideo' && (
              <>
                <button
                  className="w-full px-2 py-1 hover:bg-main rounded-b-lg"
                  onClick={handleDelete}
                >
                  삭제하기
                </button>
              </>
            )}

            {type === 'likeVideo' && (
              <button
                className="w-full px-2 py-1 hover:bg-main rounded-lg"
                onClick={handleUnlike} // 좋아요 취소
              >
                좋아요 취소
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
