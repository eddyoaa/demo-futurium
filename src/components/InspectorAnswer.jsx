import { Trans, useTranslation } from "react-i18next";
import CloseButton from "./CloseButton";
import ElementStyle from "./ElementStyle";

const InspectorAnswer = ({
  content,
  handleClickEvent,
  handleCloseButton,
  choosen,
  mainColor,
}) => {
  const { t, i18n } = useTranslation();

  if (choosen) {
    return (
      <div
        className={`
      transition-all w-full justify-start text-white items-start flex-col gap-4 2xl:gap-6 max-h-[450px] 2xl:max-h-[1000px] flex drop-shadow-none 2xl:rounded-2xl 2xl:p-6 rounded-xl p-4`}
        style={{
          background: `linear-gradient(to right, #475569cc, #${mainColor.slice(
            0,
            6
          )}99)`,
        }}
      >
        <div className="flex justify-between items-center w-full mb-4">
          <h3 className="font-normal flex text-xs 2xl:text-xl pr-2 2xl:pr-6">
            {content.answers[0].CDate} - {content.answers[0].CTime}
          </h3>
          <CloseButton clickEvent={handleCloseButton} />
        </div>
        <div className="flex flex-col w-full items-start scrollbar-custom h-full pr-4 2xl:pr-6 gap-6 2xl:gap-8 overflow-y-auto">
          <ElementStyle elementType={"question"} col={mainColor}>
            {content.questions[0].question}
          </ElementStyle>
          <ElementStyle elementType={"answer"} col={mainColor}>
            "{content.answers[0].answer}"
          </ElementStyle>
        </div>
        <div className="w-full flex justify-end">
          <button
            className="flex  bg-black/70 p-2 hover:bg-black/60 active:rounded-xl px-4 text-2xl mr-4 rounded-xl"
            onClick={handleClickEvent}
          >
            {t("inspector.button.flyTo")}
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`
      transition-all w-full justify-start text-white items-start flex-col gap-4 2xl:gap-4 max-h-[450px] 2xl:max-h-[1000px] flex drop-shadow-none 2xl:rounded-2xl 2xl:p-6 rounded-xl p-4`}
        style={{
          background: `linear-gradient(to right, #475569cc, #${mainColor.slice(
            0,
            6
          )}99)`,
        }}
      >
        <h2 className="font-normal text-lg 2xl:text-3xl">
          <Trans i18nKey="inspector.title.answer.answer"></Trans>
        </h2>
        <div className="gap-6 flex h-full flex-col w-full items-center max-h-[550px] overflow-y-auto scrollbar-custom scrollBarSupport:scrollbar-custom-support pr-4">
          {content.answers.map((item, i) => (
            <div key={i} className="flex gap-4 justify-start w-full">
              <div
                style={{
                  background: `#${item.col}`,
                }}
                className="w-1 rounded-xl h-full"
              ></div>
              <div className={`rounded-2xl h-full w-full flex-col flex`}>
                <p className="font-normal flex text-xs 2xl:text-lg">
                  {item.CDate} - {item.CTime}
                </p>
                <ElementStyle elementType="answerLatestAnswer" col={item.col}>
                  {item.answer}
                </ElementStyle>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default InspectorAnswer;
