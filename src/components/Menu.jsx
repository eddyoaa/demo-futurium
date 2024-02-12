import { useRef } from "react";
import { Trans, useTranslation } from "react-i18next";
import { ImRadioChecked2, ImRadioUnchecked } from "react-icons/im";
import Slider from "react-slick";
import ElementStyle from "./ElementStyle";
import "./slick-carousel.css";

const Menu = ({
  items,
  onClickFunction,
  state,
  type,
  setState,
  col,
  ...props
}) => {
  const { i18n } = useTranslation();
  const sliderRef = useRef();

  if (type === "questionPicker") {
    const toggleAllQuestions = () => {
      let newSelectedQuestions;
      if (state.every((v) => v === true)) {
        newSelectedQuestions = state.map((question) => {
          return false;
        });
      } else {
        newSelectedQuestions = state.map((question) => {
          return true;
        });
      }
      setState(newSelectedQuestions);
    };
    return (
      <div className="flex flex-col gap-2 2xl:rounded-xl 2xl:gap-2 2xl:p-4 bg-white drop-shadow-3xl rounded-lg p-4 h-full w-full">
        <button
          onClick={toggleAllQuestions}
          disabled={state.every((v) => v === true)}
          className={`${
            state.every((v) => v === true)
              ? "opacity-40"
              : " active:bg-slate-200 opacity-100"
          } flex justify-center 2xl:text-2xl items-center p-2 rounded-lg 2xl:rounded-xl 2xl:p-3 active:bg-slate-200 bg-blue-200`}
        >
          <Trans i18nKey={"menu.selectAll"}></Trans>
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
              choosenElement={state.every((v) => v === true) ? false : state[i]}
              elementType="questionPicker"
              col={col[i]}
            >
              {question}
            </ElementStyle>
          </div>
        ))}
      </div>
    );
  } else if (type === "topicPicker") {
    const toggleAllTopics = () => {
      let newSelectedTopics;
      if (state.every((v) => v === true)) {
        newSelectedTopics = state.map((topic) => {
          return false;
        });
      } else {
        newSelectedTopics = state.map((topic) => {
          return true;
        });
      }
      setState(newSelectedTopics);
    };
    return (
      <div className="flex flex-col gap-1 2xl:rounded-2xl 2xl:gap-2 2xl:p-4 bg-white drop-shadow-3xl rounded-lg p-4 h-full w-full">
        <button
          onClick={toggleAllTopics}
          disabled={state.every((v) => v === true)}
          className={`${
            state.every((v) => v === true)
              ? "opacity-40"
              : " active:bg-slate-200 opacity-100"
          } flex justify-center 2xl:text-2xl items-center p-2 rounded-lg 2xl:rounded-xl 2xl:p-3 bg-blue-200`}
        >
          <Trans i18nKey={"menu.selectAll"}></Trans>
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
              choosenElement={state.every((v) => v === true) ? false : state[i]}
              elementType="topicPicker"
              col={col[i]}
            >
              {question}
            </ElementStyle>
          </div>
        ))}
      </div>
    );
  } else if (type === "radioButton") {
    return (
      <div className="flex flex-col gap-2 2xl:gap-4 bg-white drop-shadow-3xl rounded-lg p-4 2xl:p-4 2xl:rounded-xl">
        {items.map((question, i) => (
          <div
            key={i}
            onClick={() => {
              onClickFunction(i);
            }}
          >
            <ElementStyle elementType="radioButton">
              <div className="flex items-center gap-2">
                {i === state && <ImRadioChecked2 />}
                {i !== state && <ImRadioUnchecked />}
                <Trans i18nKey={``}></Trans>
              </div>
            </ElementStyle>
          </div>
        ))}
      </div>
    );
  } else if (type === "answerPicker") {
    return (
      <div className="max-w-4xl scrollbar-custom overflow-auto 2xl:rounded-2xl 2xl:gap-8 2xl:p-4 bg-white drop-shadow-3xl rounded-lg p-4 h-full w-full">
        <div className="scrollbar-custom-black overflow-auto flex flex-col gap-6 2xl:rounded-2xl 2xl:gap-8 2xl:py-8  h-full w-full">
          {items.map((item, i) => (
            <div
              key={i}
              className={`rounded-2xl  rounded-bl-sm h-full w-full flex-col flex ${
                item.enabled ? "active:bg-slate-200 opacity-100" : "opacity-30"
              }`}
              onClick={() => {
                item.enabled && onClickFunction(i);
              }}
            >
              <p className="pl-4 font-normal flex text-xs 2xl:text-lg">
                {i18n.language === "en" ? item.date.en : item.date.de}
              </p>
              <ElementStyle
                elementType="answerLatestAnswer"
                col={item.answer.col}
              >
                {i18n.language === "en" ? item.answer.en : item.answer.de}
              </ElementStyle>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (type === "needHelp") {
    const sliderSettings = {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: props.slidePage,
    };

    return (
      <div className="max-w-[655px] 2xl:rounded-2xl 2xl:gap-8 2xl:p-8 2xl:px-12 bg-white drop-shadow-3xl rounded-lg p-4 w-full">
        <Slider
          ref={sliderRef}
          afterChange={(current) => props.setSlidePage(current)}
          {...sliderSettings}
        >
          {items.map((item, i) => (
            <div key={i} className={`flex-col flex `}>
              <p className="pl-4 font-bold flex 2xl:text-2xl">
                {i18n.language === "en" ? item.question.en : item.question.de}
              </p>
              <p className="pl-4 mt-4 flex-col max-h-72 font-normal flex 2xl:text-2xl overflow-auto scrollbar-custom-black">
                {i18n.language === "en" ? item.answer.en : item.answer.de}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
};

export default Menu;
