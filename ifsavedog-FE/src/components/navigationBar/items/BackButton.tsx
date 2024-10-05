import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };

  return (
    <div onClick={onClick}>
      <IoIosArrowBack size={24} />
    </div>
  );
};

export default BackButton;
