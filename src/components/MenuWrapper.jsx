import { Transition } from "@headlessui/react";
import { forwardRef } from "react";

const MenuWrapper = forwardRef(({ _ref, showState, ...props }) => {
  return (
    <div className={props.className} ref={_ref}>
      <Transition
        appear={false}
        show={showState}
        className="transition-all duration-500 h-full"
        enterFrom="transform scale-95 opacity-0 max-h-0"
        enterTo="transform scale-100 opacity-100 max-h-96 2xl:max-h-[950px]"
        leaveFrom="transform scale-100 opacity-100 max-h-96 2xl:max-h-[950px]"
        leaveTo="transform scale-95 opacity-0 max-h-0"
      >
        {props.children}
      </Transition>
    </div>
  );
});

export default MenuWrapper;
