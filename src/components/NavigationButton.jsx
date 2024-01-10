import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  PiArrowsClockwiseLight,
  PiArrowsOutCardinalLight,
} from "react-icons/pi";

const NavigationButton = ({
  children,
  type,
  onLeftClick,
  onRightClick,
  navigationState,
  ...props
}) => {
  let iconSize = 16;
  if (window.innerWidth > 2000) {
    iconSize = 28;
  }
  return (
    <div className="drop-shadow-3xl flex rounded-lg 2xl:rounded-xl bg-white">
      <button
        onClick={onLeftClick}
        {...props}
        className={`${
          type === "zoom" ? "p-3 2xl:p-4 active:bg-slate-200 " : "p-2 2xl:p-2"
        }  rounded-lg 2xl:rounded-xl flex items-center gap-1`}
      >
        {type === "zoom" ? (
          <AiOutlineMinus size={iconSize} />
        ) : (
          <div
            className={`transition-all duration-200 p-1 2xl:p-2 ${
              navigationState === "move"
                ? "bg-black text-white rounded-lg 2xl:rounded-lg"
                : "bg-black/0"
            }`}
          >
            <PiArrowsOutCardinalLight size={iconSize} />
          </div>
        )}
      </button>
      <button
        onClick={onRightClick}
        {...props}
        className={`${
          type === "zoom" ? "p-3 2xl:p-4 active:bg-slate-200" : "p-2 2xl:p-2"
        }  rounded-lg 2xl:rounded-xl flex items-center gap-2`}
      >
        {type === "zoom" ? (
          <AiOutlinePlus size={iconSize} />
        ) : (
          <div
            className={`transition-all duration-300 p-1 2xl:p-2  ${
              navigationState === "rotate"
                ? "bg-black rounded-lg 2xl:rounded-lg text-white "
                : "bg-black/0"
            }`}
          >
            <PiArrowsClockwiseLight size={iconSize} />
          </div>
        )}
      </button>
    </div>
  );
};

export default NavigationButton;
