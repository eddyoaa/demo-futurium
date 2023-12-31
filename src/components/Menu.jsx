import { Trans, useTranslation } from "react-i18next";
import { ImRadioChecked2, ImRadioUnchecked } from "react-icons/im";
import ElementStyle from "./ElementStyle";

const Menu = ({ items, onClickFunction, state, type, setState }) => {
  const { i18n } = useTranslation();
  if (type === "questionPicker") {
    const toggleAllQuestions = () => {
      const newSelectedQuestions = state.map((question) => {
        return true;
      });
      setState(newSelectedQuestions);
    };

    return (
      <div className="flex flex-col gap-2 2xl:rounded-2xl 2xl:gap-6 2xl:p-8 bg-white drop-shadow-3xl rounded-lg p-4 h-full w-full">
        <button
          onClick={toggleAllQuestions}
          className={`${
            !state.every((v) => v === true)
              ? "opacity-100"
              : "opacity-40 cursor-default"
          } flex justify-center 2xl:text-4xl items-center p-2 rounded-lg 2xl:rounded-2xl 2xl:p-6 active:bg-slate-200 bg-blue-200`}
        >
          <Trans i18nKey="menu.selectAll"></Trans>
        </button>
        {items.map((question, i) => (
          <div
            className="h-full w-full flex"
            key={i}
            onClick={() => {
              onClickFunction(i);
            }}
          >
            <ElementStyle
              choosenElement={state[i]}
              elementType="questionPicker"
            >
              {question}
            </ElementStyle>
          </div>
        ))}
      </div>
    );
  } else if (type === "topicPicker") {
    const toggleAllTopics = () => {
      const newSelectedTopics = state.map((topic) => {
        return true;
      });
      setState(newSelectedTopics);
    };

    return (
      <div className="flex flex-col gap-2 2xl:rounded-2xl 2xl:gap-6 2xl:p-8 bg-white drop-shadow-3xl rounded-lg p-4 h-full w-full">
        <button
          onClick={toggleAllTopics}
          className={`${
            !state.every((v) => v === true)
              ? "opacity-100"
              : "opacity-40 cursor-default"
          } flex justify-center 2xl:text-4xl items-center p-2 rounded-lg 2xl:rounded-2xl 2xl:p-6 active:bg-slate-200 bg-blue-200`}
        >
          <Trans i18nKey="menu.selectAll"></Trans>
        </button>
        {items.map((question, i) => (
          <div
            className="h-full w-full flex"
            key={i}
            onClick={() => {
              onClickFunction(i);
            }}
          >
            <ElementStyle choosenElement={state[i]} elementType="topicPicker">
              {question}
            </ElementStyle>
          </div>
        ))}
      </div>
    );
  } else if (type === "radioButton") {
    return (
      <div className="flex flex-col gap-2 2xl:gap-8 bg-white drop-shadow-3xl rounded-lg p-4 2xl:p-8 2xl:rounded-2xl">
        {items.map((question, i) => (
          <div
            key={i}
            onClick={() => {
              onClickFunction(i);
            }}
          >
            <ElementStyle
              choosStyleenElement={i === state}
              elementType="radioButton"
            >
              <div className="flex items-center gap-2">
                {i === state && <ImRadioChecked2 />}
                {i !== state && <ImRadioUnchecked />}
                <Trans i18nKey={question}></Trans>
              </div>
            </ElementStyle>
          </div>
        ))}
      </div>
    );
  }
};

export default Menu;
