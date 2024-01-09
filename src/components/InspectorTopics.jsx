import { Trans, useTranslation } from "react-i18next";
import ElementStyle from "./ElementStyle";

const InspectorTopics = ({ content }) => {
  const { i18n } = useTranslation();

  let topicItems = [];
  if (content !== undefined) {
    topicItems = content.keywords.map((keyword, i) => (
      <>
        <ElementStyle key={i} elementType={"topic"}>
          {keyword.label}
        </ElementStyle>
        <ul className="ml-6 list-disc">
          {keyword.children.map((keyword, i) => (
            <ElementStyle key={i} elementType={"topicChildren"}>
              {keyword}
            </ElementStyle>
          ))}
        </ul>
      </>
    ));
  }

  return (
    <div
      className="
      bg-gradient-to-r text-white flex-col gap-3 items-start flex  from-slate-800/80 drop-shadow-none to-red-600/60 rounded-xl 2xl:rounded-2xl 2xl:p-6 p-4"
    >
      <h2 className="font-normal text-lg 2xl:text-3xl">
        <Trans i18nKey="inspector.title.answer.topic"></Trans>
      </h2>
      <div className="gap-3 flex items-center ">
        <div className={`w-1 h-full rounded-xl bg-red-400`}></div>
        <div className="flex 2xl:gap-1 flex-col">{topicItems}</div>
      </div>
    </div>
  );
};

export default InspectorTopics;
