import React, { useEffect, useState } from "react";

const useMousePosition: () => {
  x: number;
  y: number;
} = () => {
  const [mousePosition, setMousePosition]: [
    { x: number; y: number },
    React.Dispatch<
      React.SetStateAction<{
        x: number;
        y: number;
      }>
    >,
  ] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const mouseMoveHandler: (event: { clientX: number; clientY: number }) => void = (event: {
      clientX: number;
      clientY: number;
    }) => {
      const { clientX, clientY }: { clientX: number; clientY: number } = event;

      setMousePosition({ x: clientX, y: clientY });
    };
    document.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);
  return mousePosition;
};
export default useMousePosition;
