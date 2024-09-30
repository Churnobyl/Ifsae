import { PATH } from '@/routers/pathConstants';
import { NavLink } from 'react-router-dom';

const LandingLast = () => {
  return (
    <div>
      <NavLink to={PATH.LOGIN}>로그인하기</NavLink>
    </div>
  );
};

export default LandingLast;
