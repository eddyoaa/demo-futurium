import { Trans, useTranslation } from "react-i18next";
import CloseButton from "./CloseButton";
import ElementStyle from "./ElementStyle";

const InspectorQuestions = ({
  content,
  mainColor,
  choosen,
  handleCloseButton,
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
            <Trans i18nKey="inspector.title.question.question"></Trans>
          </h2>
          <CloseButton clickEvent={handleCloseButton} />
        </div>
        <div className="gap-3 flex items-center ">
          <ElementStyle elementType={"question"} col={content.questions[0].col}>
            {content.questions[0].question}
          </ElementStyle>
        </div>
      </div>
    );
  } else {
    let questionItems = [];
    if (content !== undefined) {
      questionItems = content.questions.map((item, i) => (
        <ElementStyle key={i} elementType={"question"} col={item.col}>
          {item.question}
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
          <Trans i18nKey="inspector.title.answer.question"></Trans>
        </h2>
        <div className="gap-4 flex items-center max-h-48 overflow-y-auto scrollbar-custom pr-4">
          <div className="flex h-full 2xl:gap-1 flex-col">{questionItems}</div>
        </div>
      </div>
    );
  }
};

export default InspectorQuestions;
