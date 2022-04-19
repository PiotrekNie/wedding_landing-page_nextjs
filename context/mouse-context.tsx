import React, { createContext, useState, useMemo } from "react";

export type MouseContextType = {
  cursorType: string;
  cursorChangeHandler: (t: React.SetStateAction<string>) => void;
};

export const MouseContext: React.Context<MouseContextType> = createContext<MouseContextType>({
  cursorType: "",
  cursorChangeHandler: () => {
    // do nothing.
  },
});

function MouseContextProvider(props: {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
}) {
  const [cursorType, setCursorType]: [string, React.Dispatch<React.SetStateAction<string>>] =
    useState("");
  const {
    children,
  }: {
    children:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined;
  } = props;

  const cursorChangeHandler: (t: React.SetStateAction<string>) => void = (
    t: React.SetStateAction<string>,
  ) => {
    setCursorType(t);
  };
  const value: {
    cursorType: string;
    cursorChangeHandler: (t: React.SetStateAction<string>) => void;
  } = useMemo(
    () => ({
      cursorType,
      cursorChangeHandler,
    }),
    [cursorType],
  );

  return <MouseContext.Provider value={value}>{children}</MouseContext.Provider>;
}

export default MouseContextProvider;
