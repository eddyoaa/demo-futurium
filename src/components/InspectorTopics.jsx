import { Trans, useTranslation } from "react-i18next";
import CloseButton from "./CloseButton";
import ElementStyle from "./ElementStyle";

const InspectorTopics = ({
  content,
  mainColor,
  handleCloseButton,
  choosen,
}) => {
  const { i18n } = useTranslation();

  if (choosen) {
    return (
      <div
        className="
      bg-gradient-to-r text-white flex-col gap-3 items-start flex drop-shadow-none rounded-xl 2xl:rounded-2xl 2xl:p-6 p-4"
        style={{
          background: `linear-gradient(to right, #475569cc, #${mainColor.slice(
            0,
            6
          )}99)`,
        }}
      >
        <div className="flex justify-between items-center w-full">
          <h2 className="font-normal text-lg 2xl:text-3xl">
            <Trans i18nKey="inspector.title.topic.topic"></Trans>
          </h2>
          <CloseButton clickEvent={handleCloseButton} />
        </div>
        <div className="flex 2xl:gap-1 flex-col">
          <ElementStyle elementType={"topic"} col={mainColor}>
            {content.keywords[0].label}
          </ElementStyle>
        </div>
      </div>
    );
  } else {
    let topicItems = [];
    if (content !== undefined) {
      topicItems = content.keywords.map((keyword, i) => (
        <ElementStyle key={i} elementType={"topic"} col={mainColor}>
          {keyword.label}
        </ElementStyle>
      ));
    }

    return (
      <div
        className="
      bg-gradient-to-r text-white flex-col gap-3 items-start flex drop-shadow-none rounded-xl 2xl:rounded-2xl 2xl:p-6 p-4"
        style={{
          background: `linear-gradient(to right, #475569cc, #${mainColor.slice(
            0,
            6
          )}99)`,
        }}
      >
        <h2 className="font-normal text-lg 2xl:text-3xl">
          <Trans i18nKey="inspector.title.answer.topic"></Trans>
        </h2>
        <div className="max-h-48 overflow-y-auto scrollbar-custom w-full gap-3 flex items-center ">
          <div className="flex 2xl:gap-2 h-full flex-col">{topicItems}</div>
        </div>
      </div>
    );
  }
};

export default InspectorTopics;
