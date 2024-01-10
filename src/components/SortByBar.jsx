import { useTranslation } from "react-i18next";

const SortByBar = ({
  state,
  itemsAmount,
  clickEvent,
  toggleEvent,
  ...props
}) => {
  const { t, i18n } = useTranslation();
  const index = [...Array(itemsAmount).keys()];

  return (
    <div className="flex flex-col gap-1">
      <div className="drop-shadow-3xl flex rounded-lg 2xl:rounded-xl bg-white p-1 flex-col">
        <div className="flex">
          {index.map((i) => (
            <SortByItem state={state} clickEvent={clickEvent} index={i} key={i}>
              <div className="flex flex-col">
                <p>{t("sortby." + i)}</p>
              </div>
            </SortByItem>
          ))}
        </div>
      </div>
      <p
        onClick={toggleEvent}
        className="text-white drop-shadow-3xl underline text-lg font-normal pl-2"
      >
        {t("sliderMenu.choose")}
      </p>
    </div>
  );
};

export default SortByBar;

const SortByItem = ({ clickEvent, state, index, children, ...props }) => {
  return (
    <button
      onClick={() => {
        clickEvent(index);
      }}
      {...props}
      className={
        "p-2 2xl:p-1 2xl:py-1 w-36  font-bold rounded-lg 2xl:rounded-xl justify-center flex items-center"
      }
    >
      <div
        className={`transition-all duration-200 p-1 2xl:p-2 2xl:px-4 text-lg 2xl:text-2xl leading-none ${
          state === index
            ? "bg-black rounded-lg font-normal 2xl:rounded-2xl text-white "
            : "bg-black/0"
        }`}
      >
        {children}
      </div>
    </button>
  );
};
