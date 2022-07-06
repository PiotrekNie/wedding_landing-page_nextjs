import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";

const Header: StyledComponent<"header", Record<string, unknown>, {}, never> = styled.header`
  transform: translateX(-50%);

  ${tw`
    fixed z-50 w-full top-0 left-1/2 flex md:justify-center justify-between items-center pointer-events-none md:p-4 p-2
  `}

  a,
  button {
    ${tw`
      pointer-events-auto
    `}
  }
`;

export default Header;
