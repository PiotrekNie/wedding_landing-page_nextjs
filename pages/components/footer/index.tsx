import React, { useEffect, useRef } from "react";
import styled, { StyledComponent } from "styled-components";
import Image from "next/image";
import tw from "twin.macro";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import fluidType from "../fluid-typography";
import SCREENS from "../../../components/screens";

// Images
import Ruchenka from "../../../public/images/ruchenka.webp";

gsap.registerPlugin(ScrollTrigger);

const Footer: StyledComponent<"footer", Record<string, unknown>, {}, never> = styled.footer`
  ${tw`
  relative text-center pt-20
  `}

  @media screen and (min-width: ${SCREENS.md}) {
    padding-top: 352px;
  }
`;

const Seeyou: StyledComponent<"span", Record<string, unknown>, {}, never> = styled.span`
  ${fluidType("480px", SCREENS.xl, "60px", "118px")}

  ${tw`
    font-balnes block leading-none
  `}
`;

export default function SectionFooter() {
  const sectionWrapper: React.RefObject<HTMLElement> = useRef<HTMLElement>(null);
  const textWrapper: React.RefObject<HTMLElement> = useRef<HTMLElement>(null);

  useEffect(() => {
    // gsap
    const sectionNode: HTMLElement = sectionWrapper.current as HTMLElement;

    gsap.fromTo(
      sectionNode,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: "footer",
          start: "top 60%",
          onEnter: () => {
            sectionNode.classList.add("show");
          },
        },
      },
    );

    gsap.fromTo(
      textWrapper.current,
      { y: "+=75", opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "Power2.easeOut",
        scrollTrigger: { trigger: "footer", start: "top center" },
      },
    );
  }, []);

  return (
    <Footer ref={sectionWrapper} className='beforeline'>
      <Seeyou ref={textWrapper}>Do zobaczenia</Seeyou>
      <Image
        src={Ruchenka}
        alt='Folwark Ruchenka - stodoła na wesele Mazowieckie'
        layout='responsive'
        placeholder='blur'
      />
    </Footer>
  );
}
