import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  MouseEvent,
  useContext,
} from "react";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import { MouseContext } from "../../context/mouse-context";

interface ButtonTypes {
  text: string;
  url: string;
}

const ButtonItem: StyledComponent<"a", Record<string, unknown>, {}, never> = styled.a`
  line-height: 30px;
  max-width: 170px;
  min-width: 170px;
  font-size: 14px;

  ${tw`
    w-full block tracking-tighter text-center relative z-10 font-bold
  `}

  &:before,
  &:after {
    content: "";

    ${tw`
      w-full h-full block absolute left-0 top-0 pointer-events-none
    `}
  }

  &:before {
    transform: translate(-6px, 6px);

    ${tw`
      bg-yellow transition-transform duration-200 ease-out -z-3
    `}
  }

  &:after {
    ${tw`
      border border-black z-0
    `}
  }

  &:hover {
    &:before {
      transform: translate(6px, -6px);
    }
  }
`;

export default function Button(props: ButtonTypes) {
  const {
    cursorChangeHandler,
  }: { cursorChangeHandler: (t: React.SetStateAction<string>) => void } = useContext(MouseContext);
  const { text, url }: ButtonTypes = props;
  const [anchorTarget, setAnchorTarget]: [
    Element | unknown,
    Dispatch<SetStateAction<Element | unknown>>,
  ] = useState();

  useEffect(() => {
    setAnchorTarget(document.getElementById(url));
  }, [url]);

  const handleClick: (ev: MouseEvent<HTMLAnchorElement>) => void = (
    ev: MouseEvent<HTMLAnchorElement>,
  ) => {
    ev.preventDefault();

    const target: Element = anchorTarget as HTMLElement;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <ButtonItem
      href={`#${url}`}
      onClick={(ev: MouseEvent<HTMLAnchorElement>) => handleClick(ev)}
      onMouseEnter={() => cursorChangeHandler("hovered")}
      onMouseLeave={() => cursorChangeHandler("")}>
      {text}
    </ButtonItem>
  );
}
