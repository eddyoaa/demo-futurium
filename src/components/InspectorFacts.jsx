import { Trans, useTranslation } from "react-i18next";
import ElementStyle from "./ElementStyle";

const InspectorFacts = ({ content }) => {
  const { i18n } = useTranslation();

  return (
    <div
      className="
      bg-gradient-to-r text-white w-full items-start flex-col h-full  gap-16  flex  from-slate-600/80 drop-shadow-none to-slate-800/60 max-w-sm rounded-xl p-4"
    >
      <div className="w-full flex flex-col gap-2">
        <div className=" flex items-center  gap-1">
          <h2 className="font-normal text-lg">
            <Trans i18nKey="inspector.title.facts.facts"></Trans>
          </h2>
          <h3 className="font-light text-sm">
            <Trans i18nKey={"inspector.title.facts.general"}></Trans>
          </h3>
        </div>
        <div className="gap-4 h-full flex items-center w-full">
          <div className="flex h-full w-full gap-1 flex-col">
            {content.properties.keywords.map((keyword) => (
              <ElementStyle elementType={"facts"}>{keyword}</ElementStyle>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <h3 className="font-normal text-lg">
          <Trans i18nKey="inspector.title.facts.answer"></Trans>
        </h3>
        <div className="gap-4 h-full flex items-center w-full">
          <div className={`w-1 h-full rounded-xl bg-blue-400`}></div>
          <div className="flex flex-col">{content.properties.questions}</div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <h3 className="font-normal text-lg">
          <Trans i18nKey="inspector.title.facts.topic"></Trans>
        </h3>
        <div className="gap-4 h-full flex items-center w-full">
          <div className={`w-1 h-full rounded-xl bg-red-400`}></div>
          <div className="flex flex-col">
            {content.properties.keywords.map((keyword) => (
              <ElementStyle elementType={"topic"}>{keyword}</ElementStyle>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectorFacts;
