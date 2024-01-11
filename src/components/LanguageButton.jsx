import { Transition } from "@headlessui/react";
import { useState } from "react";

const LanguageButton = ({
  changeLanguage,
  currentLanguage,
  toggleLanguageMenu,
  languageMenuState,
}) => {
  const [clicked, setClicked] = useState(false);

  const handleLanguageClick = () => {
    setClicked(true);
    const timer = setTimeout(() => {
      changeLanguage();
      setClicked(false);
    }, 300);
    return () => clearTimeout(timer);
  };

  return (
    <div
      className={`flex flex-col rounded-full border-neutral-900 border-2 2xl:border-4 bg-white drop-shadow-3xl items-center transition-all pt-2 2xl:pt-2`}
      onClick={toggleLanguageMenu}
    >
      <Transition
        enterFrom="translate-y-full scale-0 h-0"
        enterTo="translate-y-0 scale-100 h-[40px] 2xl:h-[65px]"
        show={languageMenuState}
        leaveFrom="translate-y-0 scale-100 h-[40px] 2xl:h-[65px]"
        leaveTo="translate-y-full scale-0 h-0"
        leave="delay-200"
        onClick={languageMenuState ? handleLanguageClick : undefined}
        className={`duration-300 transform-0 items-center gap-2 2xl:px-2 justify-center px-2 rounded-full transition-all`}
      >
        <p
          className={`text-base 2xl:text-2xl duration-300 flex justify-center transition-all w-10 h-10 2xl:w-16 2xl:h-16 items-center rounded-full ${
            clicked
              ? "text-neutral-100 bg-neutral-900/100 font-normal"
              : "text-neutral-900 bg-neutral-900/0 font-bold"
          }`}
        >
          {currentLanguage === "DE" ? "EN" : "DE"}
        </p>
      </Transition>
      <button
        className={` flex w-max items-center z-10 gap-2 px-2 pb-2 2xl:pb-2 2xl:px-2 duration-500 justify-center rounded-full transition-all`}
      >
        <p
          className={`text-base 2xl:text-2xl w-10 h-10 2xl:w-16 2xl:h-16 transition-all duration-300 flex justify-center items-center rounded-full ${
            !clicked
              ? "text-neutral-100 bg-neutral-900/100 font-normal"
              : "text-neutral-900 bg-neutral-900/0 font-bold"
          }`}
        >
          {currentLanguage}
        </p>
      </button>
    </div>
  );
};

export default LanguageButton;
