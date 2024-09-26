import BottomItem from '@/components/navigationBar/items/BottomItem';
import { useState } from 'react';

const menus = ['메인', '멍츠', '입양', '검색', '마이페이지'];

const Bottombar = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>(menus[0]); // 첫번째 메뉴 디폴트

  return (
    <div className="sticky bottom-0 left-0 w-full z-50 flex flex-row bg-subBase">
      {menus.map((name) => (
        <BottomItem
          key={name}
          name={name}
          isSelected={name === selectedMenu}
          onClick={() => setSelectedMenu(name)}
        />
      ))}
    </div>
  );
};

export default Bottombar;
