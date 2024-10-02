import BottomItem from '@/components/navigationBar/items/BottomItem';
import { PATH } from '@/routers/pathConstants';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const menus = [
  { name: '메인', path: PATH.MAIN },
  { name: '멍츠', path: PATH.MUNGTSU },
  { name: '입양', path: PATH.ADOPTION },
  { name: '검색', path: PATH.SEARCH },
  { name: '마이페이지', path: PATH.MYPAGE },
];

const Bottombar = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>(menus[0].name); // 첫번째 메뉴 디폴트
  const navigate = useNavigate();

  useEffect(() => {
    const currentMenu = menus.find((menu) =>
      window.location.pathname.includes(menu.path),
    );
    if (currentMenu) {
      setSelectedMenu(currentMenu.name);
    }
  }, []);

  return (
    <div className="sticky bottom-0 left-0 w-full z-50 flex flex-row bg-subBase">
      {menus.map(({ name, path }) => (
        <BottomItem
          key={name}
          name={name}
          isSelected={name === selectedMenu}
          onClick={() => {
            setSelectedMenu(name);
            navigate(path);
          }}
        />
      ))}
    </div>
  );
};

export default Bottombar;
