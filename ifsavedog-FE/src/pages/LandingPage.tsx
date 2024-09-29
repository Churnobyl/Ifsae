import LandingFirst from '@/components/landing/LandingFirst';
import LandingLast from '@/components/landing/LandingLast';
import LandingSecond from '@/components/landing/LandingSecond';
import LandingThird from '@/components/landing/LandingThird';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { FullPage, Slide } from 'react-full-page';

const LandingPage = () => {
  const [, setCookie] = useCookies();

  useEffect(() => {
    setCookie('hasViewed', true, {
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });
  }, [setCookie]);

  return (
    <FullPage>
      <Slide>
        <LandingFirst />
      </Slide>
      <Slide>
        <LandingSecond />
      </Slide>
      <Slide>
        <LandingThird />
      </Slide>
      <Slide>
        <LandingLast />
      </Slide>
    </FullPage>
  );
};

export default LandingPage;
