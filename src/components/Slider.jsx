import { useTranslation } from "react-i18next";

const Slider = ({ labels, state, handleChange, sliderKey }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-3 px-2">
      <div className=" gap-2 w-1/2 items-center flex">
        <span className="text-sm text-black ml-1 ">0</span>
        <input
          type="range"
          min={0}
          max={1}
          value={state}
          onChange={(e) => {
            handleChange(e, sliderKey);
          }}
          className="w-full h-2 accent-black bg-gray-300 rounded-lg appearance-none"
        />
        <span className="text-sm text-black">100</span>
      </div>
      <div className="flex justify-center gap-1 w-1/2">
        <p className="w-1/2 text-end">{t(labels[0])}</p>
        <p className="w-1/6 text-center">{"<>"}</p>
        <p className="w-1/2 text-start">{t(labels[1])}</p>
      </div>
    </div>
  );
};

export default Slider;
