import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import ElementStyle from "./ElementStyle";

const InspectorAnswer = ({ content }) => {
  const { i18n } = useTranslation();
  const [contentAnswer, setContentAnswer] = useState("");
  let contentTime = content.properties.CTime;
  let contentDate = content.properties.CTime;

  const checkLanguage = () => {
    if (i18n.language === "en") {
      setContentAnswer(content.properties.en);
    } else if (i18n.language === "de") {
      setContentAnswer(content.properties.de);
    }
  };

  useEffect(() => {
    checkLanguage();
  }, [i18n.language]);

  return (
    <div
      className="
      bg-gradient-to-r justify-start text-white items-end flex-col gap-4 2xl:gap-8 max-h-[450px] 2xl:max-h-[1200px] flex from-slate-800/80 drop-shadow-none to-green-600/60 2xl:rounded-2xl 2xl:p-8 rounded-xl p-4"
    >
      <h3 className="font-normal flex text-xs 2xl:text-xl pr-2 2xl:pr-6">
        <Trans i18nKey="inspector.title.answer.answer">
          {{ contentDate }} - {{ contentTime }}
        </Trans>
      </h3>
      <div className="flex flex-col w-full items-start scrollbar-custom h-full pr-4 2xl:pr-6 gap-6 2xl:gap-12 overflow-y-auto">
            <ElementStyle elementType={"question"}>{content.properties.questions}</ElementStyle>
            <ElementStyle elementType={"answer"}>"{contentAnswer}"</ElementStyle>
        </div>
    </div>
  );
};

export default InspectorAnswer;
