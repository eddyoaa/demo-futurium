import { Trans, useTranslation } from "react-i18next";
import CloseButton from "./CloseButton";
import ElementStyle from "./ElementStyle";

const InspectorTags = ({ content, mainColor, choosen, handleCloseButton }) => {
  const { i18n } = useTranslation();

  if (choosen) {
    return (
      <div
        className="bg-gradient-to-r text-white flex-col gap-3 h-full  items-start flex drop-shadow-none rounded-xl 2xl:rounded-2xl 2xl:p-6 p-4 w-full"
        style={{
          background: `linear-gradient(to right, #475569cc, #${mainColor.slice(
            0,
            6
          )}99)`,
        }}
      >
        <div className="flex justify-between items-center w-full">
          <h2 className="font-normal text-lg 2xl:text-3xl">
            <Trans i18nKey="inspector.title.tags.tags"></Trans>
          </h2>
          <CloseButton clickEvent={handleCloseButton} />
        </div>
        <div className="w-full flex flex-row flex-wrap gap-x-8 gap-y-2 content-center">
          <ElementStyle elementType={"tags"} col={mainColor}>
            {content.keywords[0].children[0]}
          </ElementStyle>
        </div>
      </div>
    );
  } else {
    let tagsItems = [];
    let tags = [];
    if (content !== undefined) {
      tags = content.keywords.map((keywords) => keywords.children);
      tags = tags.flat(1);
      tagsItems = tags.map((keyword, i) => (
        <ElementStyle key={i} elementType={"tags"} col={mainColor}>
          {keyword}
        </ElementStyle>
      ));
    }

    return (
      <div
        className="bg-gradient-to-r text-white flex-col gap-3 h-full  items-start flex drop-shadow-none rounded-xl 2xl:rounded-2xl 2xl:p-6 p-4 w-full"
        style={{
          background: `linear-gradient(to right, #475569cc, #${mainColor.slice(
            0,
            6
          )}99)`,
        }}
      >
        <h2 className="font-normal text-lg 2xl:text-3xl">
          <Trans i18nKey="inspector.title.answer.tags"></Trans>
        </h2>
        <div className="max-h-40 pr-4 overflow-y-auto scrollbar-custom w-full flex flex-row flex-wrap gap-x-12 gap-y-4 content items-start">
          {tagsItems}
        </div>
      </div>
    );
  }
};

export default InspectorTags;
