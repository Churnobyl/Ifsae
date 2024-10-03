import LandingFirst from '@/components/landing/LandingFirst';
import LandingLast from '@/components/landing/LandingLast';
import LandingSecond from '@/components/landing/LandingSecond';
import LandingThird from '@/components/landing/LandingThird';
import config from '@/constants/Environments';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { FullPage, Slide } from 'react-full-page';

const LandingPage = () => {
  const [, setCookie] = useCookies();

  useEffect(() => {
    setCookie(config.cookieNameForLandingPage, true, {
      path: '/',
      maxAge: config.cookieMaxAge,
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
