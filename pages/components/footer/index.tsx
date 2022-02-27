import React from "react";
import styled, { StyledComponent } from "styled-components";
import Image from "next/image";
import tw from "twin.macro";
import fluidType from "../fluid-typography";
import SCREENS from "../../../components/screens";

import Ruchenka from "../../../public/images/ruchenka.webp";

const Footer: StyledComponent<"footer", Record<string, unknown>, {}, never> = styled.footer`
  ${tw`
  relative text-center pt-20
  `}

  @media screen and (min-width: ${SCREENS.md}) {
    padding-top: 352px;
  }

  &:before {
    content: "";

    ${tw`
      w-px lg:h-80 h-16 absolute left-1/2 -translate-x-1/2 bg-black top-0
    `};
  }
`;

const Seeyou: StyledComponent<"span", Record<string, unknown>, {}, never> = styled.span`
  ${fluidType("480px", SCREENS.xl, "60px", "118px")}

  ${tw`
    font-balnes block leading-none
  `}
`;

export default function SectionFooter() {
  return (
    <Footer>
      <Seeyou>Do zobaczenia</Seeyou>
      <Image
        src={Ruchenka}
        alt='Folwark Ruchenka - stodoła na wesele Mazowieckie'
        layout='responsive'
        placeholder='blur'
      />
    </Footer>
  );
}
