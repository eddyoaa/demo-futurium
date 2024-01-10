import Slider from "./Slider";

const SliderMenu = ({ state, onChangeFunction, labels }) => {
  return (
    <div className="flex flex-col gap-4 drop-shadow-3xl rounded-lg 2xl:rounded-xl bg-white p-2 py-6">
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
