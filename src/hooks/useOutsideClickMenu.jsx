import { useEffect } from "react";

function useOutsideClickMenu(refs, handleClickOutsideClick) {
  function handleClickOutside(event) {
    let outside = true;
    refs.forEach((element) => {
      if (element.current && element.current.contains(event.target)) {
        outside = false;
      }
    });
    if (outside) {
      handleClickOutsideClick();
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}
export default useOutsideClickMenu;
