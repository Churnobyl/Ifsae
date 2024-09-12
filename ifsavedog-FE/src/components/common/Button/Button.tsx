import React, { ReactElement } from 'react';

type Props = {
  size: 'small' | 'medium' | 'large';
  children: ReactElement;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  icon?: string | undefined;
};

const Button = ({ size, children, onClick, icon }: Props) => {
  const style = () => {
    let commonStyle = 'flex item-center text-white bg-main ';

    switch (size) {
      case 'small':
        commonStyle += 'text-sm rounded-lg px-3 py-1';
        break;
      case 'medium':
        commonStyle += 'text-xl rounded-xl px-5 py-1.5';
        break;
      case 'large':
        commonStyle += 'text-2xl rounded-2xl px-8 py-2';
        break;
    }

    return commonStyle;
  };

  return (
    <button type="button" className={style()} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
