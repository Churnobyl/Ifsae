import { useSignupStore } from '@/stores/auth/signupStore';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

type RoleItemType = {
  roleId: number;
  roleName: string;
  image: 'shelter' | 'individual';
};

const RoleItem = ({ roleId, roleName, image }: RoleItemType) => {
  const signupStore = useSignupStore();
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    if (useSignupStore.getState().userInput.role === roleId) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [roleId, signupStore]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={classNames(
          'w-24',
          'h-24',
          'bg-cover',
          'hover:cursor-pointer',
          {
            'bg-shelter': image === 'shelter',
            'bg-individual': image === 'individual',
            'outline outline-4 outline-main': isSelected,
          },
        )}
        onClick={() => {
          signupStore.setUserInput({ role: roleId });
        }}
      ></div>
      {roleName}
    </div>
  );
};

export default RoleItem;
