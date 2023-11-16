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
  let iconSize = 24;
  if(window.innerWidth>2000){
    iconSize=36
  }
  return (
    <div className="drop-shadow-3xl flex rounded-lg 2xl:rounded-2xl bg-white">
      <button
        onClick={onLeftClick}
        {...props}
        className={`${
          type === "zoom" ? "p-3 2xl:p-8 active:bg-slate-200 " : "p-2 2xl:p-4"
        }  rounded-lg 2xl:rounded-2xl flex items-center gap-2`}
      >
        {type === "zoom" ? (
          <AiOutlineMinus size={iconSize} />
        ) : (
          <div
            className={`transition-all p-1 2xl:p-4 ${
              navigationState === "move"
                ? "  bg-black text-white rounded-lg 2xl:rounded-2xl"
                : ""
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
          type === "zoom" ? "p-3 2xl:p-8 active:bg-slate-200" : "p-2 2xl:p-4"
        }  rounded-lg 2xl:rounded-2xl flex items-center gap-2`}
      >
        {type === "zoom" ? (
          <AiOutlinePlus size={iconSize} />
        ) : (
          <div
            className={`transition-all p-1 2xl:p-4  ${
              navigationState === "rotate"
                ? "bg-black rounded-lg 2xl:rounded-2xl text-white "
                : ""
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
