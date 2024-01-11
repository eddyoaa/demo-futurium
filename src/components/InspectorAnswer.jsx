import { Trans, useTranslation } from "react-i18next";
import CloseButton from "./CloseButton";
import ElementStyle from "./ElementStyle";

const InspectorAnswer = ({ content, handleClickEvent, handleCloseButton }) => {
  const { t, i18n } = useTranslation();
  let contentTime = content.CTime;
  let contentDate = content.CDate;

  return (
    <div
      className="
      bg-gradient-to-r justify-start text-white items-start flex-col gap-4 2xl:gap-6 max-h-[450px] 2xl:max-h-[1000px] flex from-slate-800/80 drop-shadow-none to-green-600/60 2xl:rounded-2xl 2xl:p-6 rounded-xl p-4"
    >
      <div className="flex justify-between items-center w-full mb-4">
        <h3 className="font-normal flex text-xs 2xl:text-xl pr-2 2xl:pr-6">
          <Trans i18nKey="inspector.title.answer.answer">
            {{ contentDate }} - {{ contentTime }}
          </Trans>
        </h3>
        <CloseButton clickEvent={handleCloseButton} />
      </div>
      <div className="flex flex-col w-full items-start scrollbar-custom h-full pr-4 2xl:pr-6 gap-6 2xl:gap-8 overflow-y-auto">
        <ElementStyle elementType={"question"}>{content.question}</ElementStyle>
        <ElementStyle elementType={"answer"}>"{content.answer}"</ElementStyle>
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
};

export default InspectorAnswer;
