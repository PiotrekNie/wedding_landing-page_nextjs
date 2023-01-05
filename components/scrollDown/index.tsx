import React, { useContext } from "react";
import Link from "next/link";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import fluidType from "../fluid-typography";
import SCREENS from "../screens";
import { MouseContext } from "../../context/mouse-context";

const CTA: StyledComponent<"a", Record<string, unknown>, {}, never> = styled.a`
  ${fluidType("480px", SCREENS.xl, "18px", "30px")}

  ${tw`
    inline-table text-center relative z-10 leading-none w-auto mx-auto
  `}

  img {
    transform: translate(-50%, 0);

    ${tw`
      absolute left-1/2 md:-bottom-16 -bottom-12 z-0 md:w-7 w-5 h-auto transition-transform duration-300 ease-out
    `}
  }

  &:before {
    content: "";
    transform: translate(-50%, -50%);

    ${tw`
      block md:h-24 md:w-24 h-16 w-16 rounded-full bg-yellow absolute left-1/2 top-1/2 transition-all duration-300 ease-out -z-3 sm:shadow-none shadow-xl
    `}
  }

  &:hover {
    &:before {
      ${tw`
        shadow-darken
      `}
    }

    img {
      transform: translate(-50%, 15px);
    }
  }
`;

export default function ScrollDown() {
  const {
    cursorChangeHandler,
  }: { cursorChangeHandler: (t: React.SetStateAction<string>) => void } = useContext(MouseContext);

  return (
    <Link href='/galeria'>
      <CTA
        onMouseEnter={() => cursorChangeHandler("hovered")}
        onMouseLeave={() => cursorChangeHandler("")}>
        Zobacz galerię
      </CTA>
    </Link>
  );
}
