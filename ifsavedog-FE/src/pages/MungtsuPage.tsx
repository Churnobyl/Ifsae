import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import MungtsuBox from '@/components/mungtsu/MungtsuBox';

const MungtsuPage = () => {
  const [availableHeight, setAvailableHeight] = useState('100vh');
  const bottomBarHeight = 8;

  useEffect(() => {
    const updateHeight = () => {
      setAvailableHeight(`calc(100vh - ${bottomBarHeight}rem)`);
    };

    updateHeight();

    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [bottomBarHeight]);

  const [slides, setSlides] = useState(
    Array.from({ length: 15 }, (_, index) => index),
  );

  const loadMoreSlides = () => {
    setSlides((prevSlides) => [
      ...prevSlides,
      ...Array.from({ length: 10 }, (_, index) => prevSlides.length + index),
    ]);
  };

  return (
    <div className="w-screen h-screen">
      <Swiper
        modules={[Mousewheel, Scrollbar, Pagination]}
        direction={'vertical'}
        slidesPerView={1}
        mousewheel={true}
        scrollbar={{ draggable: true }}
        style={{ height: availableHeight }}
        onReachEnd={loadMoreSlides}
      >
        {slides.map((slideIndex) => (
          <SwiperSlide
            key={slideIndex}
            className="flex items-center justify-center h-full"
          >
            <MungtsuBox />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MungtsuPage;
