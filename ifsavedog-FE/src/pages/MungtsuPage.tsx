import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import MungtsuBox from '@/components/mungtsu/MungtsuBox';
import { MungtsuResponseType } from '@/types/post/MungtsuResponseType';
import {
  getLastPageNumApi,
  getRecommendListApi,
} from '@/apis/recommend/recommendApi';

const MungtsuPage = () => {
  const [availableHeight, setAvailableHeight] = useState('100vh');
  const bottomBarHeight = 8;
  const [slides, setSlides] = useState<MungtsuResponseType[]>([]);
  const [lastPage, setLastPage] = useState<number | null>(null);
  const [hasError, setHasError] = useState(false);
  const lastSlideRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const fetchLastPage = async () => {
      try {
        const response = await getLastPageNumApi();
        const newLastPage =
          response.data.lastPage > 20 ? 1 : response.data.lastPage;
        setLastPage(newLastPage);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch last page:', error);
        setHasError(true);
      }
    };

    fetchLastPage();
  }, []);

  useEffect(() => {
    const fetchPostList = async () => {
      if (lastPage !== null && !hasError) {
        try {
          const response = await getRecommendListApi(lastPage);
          setSlides((prevSlides) => [...prevSlides, ...response.data]);
          setIsLoading(false);
        } catch (error) {
          console.error('Failed to fetch post list:', error);
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    fetchPostList();
  }, [lastPage, hasError]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading && lastPage !== null) {
        setIsLoading(true);
        setLastPage((prevPage) => (prevPage ? prevPage + 1 : null));
      }
    });

    if (lastSlideRef.current) {
      observer.observe(lastSlideRef.current);
    }

    return () => {
      if (lastSlideRef!.current) {
        observer.unobserve(lastSlideRef!.current);
      }
    };
  }, [isLoading, lastPage, lastSlideRef, slides]);

  return (
    <div className="w-screen h-screen">
      <Swiper
        modules={[Mousewheel, Scrollbar, Pagination]}
        direction={'vertical'}
        slidesPerView={1}
        mousewheel={true}
        scrollbar={{ draggable: true }}
        style={{ height: availableHeight }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={slide.id}
            className="flex items-center justify-center h-full"
          >
            <MungtsuBox
              ref={index === slides.length - 1 ? lastSlideRef : null}
              slide={slide}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MungtsuPage;
