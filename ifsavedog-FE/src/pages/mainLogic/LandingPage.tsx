import { Button } from '@/components/index';
import { FullPage, Slide } from 'react-full-page';

const LandingPage = () => {
  return (
    <FullPage>
      <Slide>
        <Button size="small" onClick={() => {}}>
          <span>글쓰기</span>
        </Button>
      </Slide>
      <Slide>
        <Button size="small" onClick={() => {}}>
          <span>글쓰기</span>
        </Button>
      </Slide>
      <Slide>
        <Button size="small" onClick={() => {}}>
          <span>글쓰기</span>
        </Button>
      </Slide>
    </FullPage>
  );
};

export default LandingPage;
