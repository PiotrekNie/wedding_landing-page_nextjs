import { NextRouter, useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import styled, { StyledComponent } from "styled-components";
import tw from "twin.macro";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
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
  const router: NextRouter = useRouter();
  const href: string = redirectPath ?? "/";
  const [password, setPassword]: [string, Dispatch<SetStateAction<string>>] = useState("");
  const [show, setShow]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] =
    useState<boolean>(false);
  const {
    cursorChangeHandler,
  }: { cursorChangeHandler: (t: React.SetStateAction<string>) => void } = useContext(MouseContext);
  const formSubmit: (ev: React.FormEvent) => void = (ev: React.FormEvent) => {
    ev.preventDefault();

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: password }),
    }).then((res: Response) => {
      if (res.status === 401) {
        toast.error("Hasło niepoprawne.");

        return;
      }

      toast.success("Zapraszamy :)");
      router.push(href);
    });
  };

  const togglePassword: (ev: React.MouseEvent<HTMLButtonElement>) => void = (
    ev: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    ev.preventDefault();

    if (!show) {
      setShow(true);

      return;
    }

    setShow(false);
  };

  return (
    <section className='w-full flex items-center justify-center h-screen'>
      <form className='w-64' onSubmit={formSubmit}>
        <label htmlFor='password' className='block mb-4 relative'>
          <span className='block mb-4'>Wpisz hasło</span>
          <div className='relative'>
            <input
              type={show ? "text" : "password"}
              className='form-input block w-full border-2 border-black h-12 px-4 bg-white'
              placeholder=' '
              value={password}
              id='password'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
            <button
              type='button'
              onClick={togglePassword}
              className='absolute top-1/2 transform -translate-y-1/2 right-1 z-10 flex items-center justify-center h-10 w-10 border-2 border-black hover:bg-gray-100 text-xl'>
              {!show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
        </label>
        <ButtonItem
          onMouseEnter={() => cursorChangeHandler("hovered")}
          onMouseLeave={() => cursorChangeHandler("")}
          type='submit'>
          Zaloguj się
        </ButtonItem>
      </form>
      <Toaster position='bottom-right' />
    </section>
  );
}

export default Login;
