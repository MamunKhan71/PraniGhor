import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
const Hero = () => {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper h-[650px] rounded-xl"
        >
            <SwiperSlide><img src="header1.jpg" alt="" /></SwiperSlide>
            <SwiperSlide><img src="header2.jpg" alt="" /></SwiperSlide>
            
        </Swiper>
    );
};

export default Hero;