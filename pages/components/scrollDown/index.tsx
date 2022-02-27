import React, { useState, useEffect, Dispatch, SetStateAction, MouseEvent } from "react";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import fluidType from "../fluid-typography";
import SCREENS from "../../../components/screens";

const CTA: StyledComponent<"a", Record<string, unknown>, {}, never> = styled.a`
  ${fluidType("480px", SCREENS.xl, "18px", "36px")}

  ${tw`
    inline-table text-center relative z-10 leading-none w-auto mx-auto
  `}

  img {
    transform: translate(-50%, 0);

    ${tw`
      absolute left-1/2 md:-bottom-20 -bottom-8 z-0 md:w-9 w-5 h-auto transition-transform duration-300 ease-out
    `}
  }

  &:before {
    content: "";
    transform: translate(-50%, -50%);

    ${tw`
      block md:h-32 md:w-32 h-20 w-20 rounded-full bg-yellow absolute left-1/2 top-1/2 transition-all duration-300 ease-out -z-3 sm:shadow-none shadow-xl
    `}
  }

  &:hover {
    &:before {
      ${tw`
        shadow-xl
      `}
    }

    img {
      transform: translate(-50%, 15px);
    }
  }
`;

export default function ScrollDown() {
  const [anchorTarget, setAnchorTarget]: [
    Element | unknown,
    Dispatch<SetStateAction<Element | unknown>>,
  ] = useState();

  useEffect(() => {
    setAnchorTarget(document.getElementById("timeline"));
  }, ["timeline"]);

  const handleClick: (ev: MouseEvent<HTMLAnchorElement>) => void = (
    ev: MouseEvent<HTMLAnchorElement>,
  ) => {
    ev.preventDefault();

    const target: Element = anchorTarget as HTMLElement;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <CTA href='#timeline' onClick={(ev: MouseEvent<HTMLAnchorElement>) => handleClick(ev)}>
      Zapraszamy <img src='/images/arrow.svg' alt='Zjedź niżej' />
    </CTA>
  );
}
