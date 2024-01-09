import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import ElementStyle from "./ElementStyle";

const InspectorAnswer = ({ content, handleClickEvent }) => {
  const { t, i18n } = useTranslation();
  let contentTime = content.CTime;
  let contentDate = content.CDate;

  return (
    <div
      className="
      bg-gradient-to-r justify-start text-white items-end flex-col gap-4 2xl:gap-8 max-h-[450px] 2xl:max-h-[1000px] flex from-slate-800/80 drop-shadow-none to-green-600/60 2xl:rounded-2xl 2xl:p-8 rounded-xl p-4"
    >
      <h3 className="font-normal flex text-xs 2xl:text-xl pr-2 2xl:pr-6">
        <Trans i18nKey="inspector.title.answer.answer">
          {{ contentDate }} - {{ contentTime }}
        </Trans>
      </h3>
      <div className="flex flex-col w-full items-start scrollbar-custom h-full pr-4 2xl:pr-6 gap-6 2xl:gap-12 overflow-y-auto">
        <ElementStyle elementType={"question"}>{content.question}</ElementStyle>
        <ElementStyle elementType={"answer"}>"{content.answer}"</ElementStyle>
      </div>
      <button
        className="flex  bg-black/70 p-2 hover:bg-black/60 active:rounded-xl px-4 text-3xl mr-8 rounded-xl"
        onClick={handleClickEvent}
      >
        {t("inspector.button.flyTo")}
      </button>
    </div>
  );
};

export default InspectorAnswer;
