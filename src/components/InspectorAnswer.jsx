import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

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
      bg-gradient-to-r justify-start text-white items-end flex-col gap-4 max-h-[450px] flex from-slate-800/80 drop-shadow-none to-green-600/60 max-w-sm rounded-xl p-4"
    >
      <h3 className="font-normal flex text-xs pr-2">
        <Trans i18nKey="inspector.title.answer.answer">
          {{ contentDate }} - {{ contentTime }}
        </Trans>
      </h3>
      <div className="flex flex-col justify-start items-start scrollbar-custom h-full pr-4 gap-6 overflow-y-auto">
        <div className="gap-4 flex items-center w-full">
          <div className={`w-1 h-full rounded-xl bg-blue-400`}></div>
          <div className="flex flex-col">{content.properties.questions}</div>
        </div>
        <div className="gap-4 flex items-center w-full">
          <div className={`w-1 h-full rounded-xl bg-green-400`}></div>
          <p className="w-full text-2xl">"{contentAnswer}"</p>
        </div>
      </div>
    </div>
  );
};

export default InspectorAnswer;
