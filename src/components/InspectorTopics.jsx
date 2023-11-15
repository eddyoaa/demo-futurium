import { Trans, useTranslation } from "react-i18next";
import ElementStyle from "./ElementStyle";

const InspectorTopics = ({ content }) => {
  const { i18n } = useTranslation();

  let topicItems = [];
  if (content !== undefined) {
    topicItems = content.map((keyword) => (
      <ElementStyle choosenElement={"answer"} elementType={"topic"}>
        {keyword}
      </ElementStyle>
    ));
  }

  return (
    <div
      className="
      bg-gradient-to-r text-white flex-col gap-4 items-start flex  from-slate-800/80 drop-shadow-none to-red-600/60 max-w-sm rounded-xl p-4"
    >
      <h2 className="font-normal text-lg">
        <Trans i18nKey="inspector.title.answer.topic"></Trans>
      </h2>
      <div className="gap-4 flex items-center ">
        <div className={`w-1 h-full rounded-xl bg-red-400`}></div>
        <div className="flex flex-col">{topicItems}</div>
      </div>
    </div>
  );
};

export default InspectorTopics;
