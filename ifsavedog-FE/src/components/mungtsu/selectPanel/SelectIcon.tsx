import { IconType } from 'react-icons';

type SelectIconType = {
  label: string;
  icon: IconType;
};

const SelectIcon = ({ label, icon: Icon }: SelectIconType) => {
  return (
    <div className={'flex flex-col items-center justify-center'}>
      <div>
        <Icon size={36} color={'white'} />
      </div>
      <div className={'text-white text-sm'}>{label}</div>
    </div>
  );
};

export default SelectIcon;
