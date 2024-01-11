import { useTranslation } from "react-i18next";
import Slider from "./Slider";

const SliderMenu = ({ state, onChangeFunction, labels }) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-[536px] flex-col gap-4 drop-shadow-3xl rounded-lg 2xl:rounded-xl bg-white p-2 py-6">
      <p className="text-xl text-black ml-2 font-bold text-left">
        {t("sortby.forces")}
      </p>
      {Object.keys(state).map((sliderName, i) => (
        <Slider
          state={state[sliderName]}
          key={i}
          sliderKey={sliderName}
          handleChange={onChangeFunction}
          labels={labels[i]}
        />
      ))}
    </div>
  );
};

export default SliderMenu;
