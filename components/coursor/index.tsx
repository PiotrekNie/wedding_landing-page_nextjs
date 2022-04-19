import React, { useContext } from "react";
import useMousePosition from "../../hooks/useMousePosition";
import { MouseContext } from "../../context/mouse-context";

// images
import CircleText from "../../public/images/circle-text.svg";

function Cursor() {
  const { cursorType }: { cursorType: string } = useContext(MouseContext);
  const { x, y }: { x: number; y: number } = useMousePosition();

  return (
    <>
      <div className={`ring ${cursorType}`} style={{ left: `${x}px`, top: `${y}px` }}>
        <CircleText />
      </div>
      <div className={`dot ${cursorType}`} style={{ left: `${x}px`, top: `${y}px` }} />
    </>
  );
}
export default Cursor;
