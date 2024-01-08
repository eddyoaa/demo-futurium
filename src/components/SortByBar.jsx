import { useTranslation } from "react-i18next";

const SortByBar = ({ state, itemsAmount, clickEvent, ...props }) => {
  const { t, i18n } = useTranslation();
  const index = [...Array(itemsAmount).keys()];
  return (
    <div className="drop-shadow-3xl flex rounded-lg 2xl:rounded-2xl bg-white px-2">
      {index.map((i) => (
        <SortByItem state={state} clickEvent={clickEvent} index={i} key={i}>
          <p>{t("sortby." + i)}</p>
        </SortByItem>
      ))}
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
        "p-2 2xl:p-2 2xl:py-4 w-52 rounded-lg 2xl:rounded-2xl justify-center flex items-center"
      }
    >
      <div
        className={`transition-all w-full duration-300 p-1 2xl:p-4 text-lg 2xl:text-4xl ${
          state === index
            ? "bg-black rounded-lg 2xl:rounded-2xl text-white "
            : "bg-black/0"
        }`}
      >
        {children}
      </div>
    </button>
  );
};
