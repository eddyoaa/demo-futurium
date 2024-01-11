import { useTranslation } from "react-i18next";

const Slider = ({ labels, state, handleChange, sliderKey }) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full items-center gap-6 px-2">
      <div className="flex justify-between gap-1 w-1/2">
        <p className="w-1/2 text-start">{t(labels[0])}</p>
        <p className="text-center">{"<>"}</p>
        <p className="w-1/2 text-end">{t(labels[1])}</p>
      </div>
      <div className="gap-2 w-1/2 items-center flex">
        <span className="text-sm text-black ml-1 ">0</span>
        <input
          type="range"
          min={0}
          step={0.01}
          max={1}
          value={state}
          onChange={(e) => {
            handleChange(e, sliderKey);
          }}
          className="w-full h-2 accent-black bg-gray-300 rounded-lg "
        />
        <span className="text-sm text-black">100</span>
      </div>
    </div>
  );
};

export default Slider;
