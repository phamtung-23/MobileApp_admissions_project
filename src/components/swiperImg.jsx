import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import useFetch from '@/hooks/useFetch';

function SwiperImg() {

  const {data, loading, error, reFetch} = useFetch(`http://localhost:3300/api/university?limit=10`)

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ):(
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 40,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[Autoplay, EffectCoverflow, Pagination]}
          className=""
        >
          {data.map((item) => (
            <SwiperSlide key={item._id}>
              <img src= {item.icon} />
            </SwiperSlide>
          ))}
          {data.map((item) => (
            <SwiperSlide key={item._id}>
              <img src= {item.icon} />
            </SwiperSlide>
          ))}
          
          
        </Swiper>
      )}
    </>
  )
}

export default SwiperImg