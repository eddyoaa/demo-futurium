import { Trans, useTranslation } from "react-i18next";
import ElementStyle from "./ElementStyle";

const InspectorTags = ({ content, mainColor }) => {
  const { i18n } = useTranslation();

  let tagsItems = [];
  let tags = [];
  if (content !== undefined) {
    tags = content.keywords.map((keywords) => keywords.children);
    console.log(tags);
    tags = tags.flat(1);
    console.log(tags);
    tagsItems = tags.map((keyword, i) => (
      <ElementStyle key={i} elementType={"tags"} col={mainColor}>
        {keyword}
      </ElementStyle>
    ));
    console.log(tagsItems);
  }

  return (
    <div
      className="
      bg-gradient-to-r text-white flex-col gap-3 h-full  items-start flex drop-shadow-none rounded-xl 2xl:rounded-2xl 2xl:p-6 p-4 w-full"
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
      <div className="w-full flex flex-row flex-wrap gap-x-8 gap-y-2 content-center">
        {tagsItems}
      </div>
    </div>
  );
};

export default InspectorTags;
