import { useTranslation } from "react-i18next";
import ElementStyle from "./ElementStyle";

const Legend = () => {
  const { t } = useTranslation();
  return (
    <div className=" flex justify-start flex-col w-max items-start gap-2 p-2 bg-white border-2 border-black rounded-lg">
      <div className="flex items-center gap-2">
        <div className="p-4 rounded-full border-2 border-green-400 bg-green-100 drop-shadow-lg shadow-black "></div>
        <p className="text-lg font-bold"> {t("legend.answer")}</p>
      </div>
      <ElementStyle elementType={"topic"} choosenElement={"legend"}>
        {t("legend.topic")}
      </ElementStyle>
      <ElementStyle elementType={"question"} choosenElement={"legend"}>
        {t("legend.question")}
      </ElementStyle>
    </div>
  );
};

export default Legend;
