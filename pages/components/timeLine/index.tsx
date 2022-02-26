import React from "react";
import Image from "next/image";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import Button from "../button";
import fluidType from "../fluid-typography";
import SCREENS from "../screens";

// images
import Church from "../../../public/images/Ruchna-1.webp";
import Ruchenka from "../../../public/images/Ruchna-2.webp";

const ImageContainer: StyledComponent<"div", Record<string, unknown>, {}, never> = styled.div`
  ${tw`
    relative shadow-xl block
  `}
`;

const TimeLineItem: StyledComponent<"div", Record<string, unknown>, {}, never> = styled.div`
  ${tw`
    grid grid-cols-8 items-center
  `}
`;

const TextContainer: StyledComponent<"div", Record<string, unknown>, {}, never> = styled.div`
  ${tw`
    relative z-10 pt-20
  `}
`;

interface HourProps {
  direction?: "left" | "right" | undefined;
}

/* eslint-disable  @typescript-eslint/typedef */
const Hour: StyledComponent<
  "span",
  Record<string, unknown>,
  HourProps,
  never
> = styled.span<HourProps>`
  ${fluidType("480px", SCREENS.xl, "70px", "151px")}

  ${tw`
    text-yellow font-serif font-bold tracking-tighter flex items-center leading-none absolute top-0 -z-3
  `}
  
  sup {
    ${fluidType("480px", SCREENS.xl, "45px", "70px")}

    ${tw`
     tracking-tight block pl-2
    `}
  }

  ${({ direction }) => (direction === "right" ? tw`-right-16` : tw`-left-16`)}
`;
/* eslint-enable  @typescript-eslint/typedef */

const Heading2: StyledComponent<"h2", Record<string, unknown>, {}, never> = styled.h2`
  ${fluidType("480px", SCREENS.xl, "38px", "55px")}

  ${tw`
    block font-bold mb-6
  `}
`;

const Paragraph: StyledComponent<"p", Record<string, unknown>, {}, never> = styled.p`
  ${fluidType("480px", SCREENS.xl, "18px", "30px")}

  ${tw`
    block mb-11 font-light leading-tight
  `}
`;

function TimeLine() {
  return (
    <>
      <TimeLineItem>
        <ImageContainer className='dots md:col-span-3'>
          <Image
            src={Church}
            alt='Parafia pw. Najświętszej Maryi Panny Matki Kościoła w Ruchnie'
            layout='responsive'
            placeholder='blur'
          />
        </ImageContainer>
        <TextContainer className='md:col-start-5 md:col-span-4'>
          <Hour direction='left'>
            17<sup>00</sup>
          </Hour>
          <Heading2>Msza Święta</Heading2>
          <Paragraph>Parafia pw.&nbsp;NMP Matki Kościoła w&nbsp;Ruchnie</Paragraph>
          <Button text='Sprawdź  na mapie' url='map' />
        </TextContainer>
      </TimeLineItem>
      <TimeLineItem className='pt-14'>
        <TextContainer className='md:col-span-4 md:text-right'>
          <Hour direction='right'>
            18<sup>00</sup>
          </Hour>
          <Heading2>Przyjęcie weselne</Heading2>
          <Paragraph>Folwark Ruchenka –&nbsp;Barn House</Paragraph>
          <div className='md:flex md:justify-end'>
            <Button text='Sprawdź  na mapie' url='map' />
          </div>
        </TextContainer>
        <ImageContainer className='dots md:col-start-6 md:col-span-3'>
          <Image
            src={Ruchenka}
            alt='Folwark Ruchenka - stodoła na wesele Mazowieckie'
            layout='responsive'
            placeholder='blur'
          />
        </ImageContainer>
      </TimeLineItem>
    </>
  );
}

export default TimeLine;
