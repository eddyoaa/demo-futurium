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
  const iconSize = 24;
  return (
    <div className="drop-shadow-3xl flex rounded-lg bg-white">
      <button
        onClick={onLeftClick}
        {...props}
        className={`${
          type === "zoom" ? "p-3 active:bg-slate-200 " : "p-2"
        }  rounded-lg flex items-center gap-2`}
      >
        {type === "zoom" ? (
          <AiOutlineMinus size={iconSize} />
        ) : (
          <div
            className={`transition-all ${
              navigationState === "move"
                ? "p-1 bg-black text-white rounded-lg"
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
          type === "zoom" ? "p-3 active:bg-slate-200" : "p-2"
        }  rounded-lg flex items-center gap-2`}
      >
        {type === "zoom" ? (
          <AiOutlinePlus size={iconSize} />
        ) : (
          <div
            className={`transition-all ${
              navigationState === "rotate"
                ? "p-1 bg-black rounded-lg text-white"
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
