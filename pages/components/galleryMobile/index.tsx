import React from "react";
import SwiperCore, { Virtual, EffectFade, Autoplay } from "swiper";
/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from "swiper/react";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import { Sections, Gallery, Image } from "../../index";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/virtual";
import "swiper/css/autoplay";

const SwiperItem: StyledComponent<"div", Record<string, unknown>, {}, never> = styled.div`
  ${tw`
    h-96 w-full relative
  `}

  img {
    ${tw`
      w-full h-full object-cover
    `}
  }
`;

export default function GalleryMobile({ data }: { data: Sections }) {
  const galleryArray: Image[] = [];
  const { galleries }: Sections = data;

  galleries.forEach((items: Gallery) => {
    const id: Gallery = items;

    id.images.forEach((img: Image) => {
      galleryArray.push(img);
    });
  });

  SwiperCore.use([Autoplay]);

  return (
    <Swiper
      modules={[Virtual, EffectFade]}
      spaceBetween={50}
      effect='fade'
      slidesPerView={1}
      autoplay={{ delay: 2000 }}
      virtual>
      {galleryArray.map((img: Image, index: number) => {
        const item: Image = img;
        const i: number = index;
        return (
          <SwiperSlide key={item.id} virtualIndex={i}>
            <SwiperItem>
              <img src={item.url} alt={item.fileName} />
            </SwiperItem>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
