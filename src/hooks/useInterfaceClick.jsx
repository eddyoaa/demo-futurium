import { useEffect } from "react";

function useInterfaceClick(refs, handleMouseMove) {
  function handleMove(event) {
    let interfaceClick = false;
    refs.forEach((element) => {
      if (element.current && element.current.contains(event.target)) {
        interfaceClick = true;
        //console.log("INTERFACE");
      }
    });
    if (!interfaceClick) {
      handleMouseMove(event);
      //console.log("NOT INTERFACE");
    }
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("touchend", handleMove);
    document.addEventListener("touchstart", handleMove);
    document.addEventListener("touchcancel", handleMove);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleMove);
      document.removeEventListener("touchstart", handleMove);
      document.removeEventListener("touchcancel", handleMove);
    };
  });
}
export default useInterfaceClick;
