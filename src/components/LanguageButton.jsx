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
    }, 200);
    return () => clearTimeout(timer);
  };

  return (
    <div
      className="flex flex-col rounded-full border-neutral-900 border-2 2xl:border-4 bg-slate-700/40 drop-shadow-3xl items-center transition-all"
      onClick={toggleLanguageMenu}
    >
      <Transition
        enterFrom="translate-y-full"
        enterTo="translate-y-0"
        show={languageMenuState}
        leaveFrom="translate-y-0"
        leaveTo="translate-y-full"
        leave="delay-200"
        onClick={languageMenuState ? handleLanguageClick : undefined}
        className={`duration-300 transform 0 items-center gap-2 2xl:p-4 justify-center p-2 rounded-full transition-all`}
      >
        <p
          className={`text-base 2xl:text-2xl flex justify-center  w-10 h-10 2xl:w-20 2xl:h-20  font-normal active:bg-slate-700 text-neutral-100 items-center rounded-full ${
            clicked ? "bg-neutral-900" : ""
          }`}
        >
          {currentLanguage === "DE" ? "EN" : "DE"}
        </p>
      </Transition>
      <button
        className={` flex w-max items-center z-10 gap-2 p-2 2xl:p-4 duration-500 justify-center rounded-full transition-all`}
      >
        <p
          className={`text-base 2xl:text-2xl w-10 h-10 2xl:w-20 2xl:h-20  flex justify-center font-normal text-neutral-100 items-center rounded-full ${
            !clicked ? "bg-neutral-900" : ""
          }`}
        >
          {currentLanguage}
        </p>
      </button>
    </div>
  );
};

export default LanguageButton;
