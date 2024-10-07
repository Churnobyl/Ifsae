import { useParams } from 'react-router-dom';

const CenterDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  return <div>센터 페이지</div>;
};
export default CenterDetailPage;
