import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import Cookies from "universal-cookie";
import consts from "consts";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import { MouseContext } from "../../context/mouse-context";

const ButtonItem: StyledComponent<"button", Record<string, unknown>, {}, never> = styled.button`
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

function Login({ redirectPath }: { redirectPath: string }) {
  console.log("login:", redirectPath);
  const [password, setPassword]: [string, Dispatch<SetStateAction<string>>] = useState("");
  const {
    cursorChangeHandler,
  }: { cursorChangeHandler: (t: React.SetStateAction<string>) => void } = useContext(MouseContext);

  return (
    <section className='w-full flex items-center justify-center h-screen'>
      <form className='w-64'>
        <label htmlFor='password' className='block mb-4'>
          <span className='block mb-4'>Wpisz hasło</span>
          <input
            type='password'
            className='form-input block w-full border-2 border-black h-12 px-4 bg-white'
            placeholder=' '
            value={password}
            id='password'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
        </label>
        <ButtonItem
          onMouseEnter={() => cursorChangeHandler("hovered")}
          onMouseLeave={() => cursorChangeHandler("")}
          type='submit'
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();

            const cookies: Cookies = new Cookies();
            cookies.set(consts.SiteReadCookie, password, {
              path: "/",
            });
            window.location.href = redirectPath ?? "/";
          }}>
          Zaloguj się
        </ButtonItem>
      </form>
    </section>
  );
}

export default Login;
