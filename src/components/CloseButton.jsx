import { AiOutlineClose } from "react-icons/ai";

const CloseButton = () => {
  return (
    <div className="flex p-2 2xl:p-4 justify-center items-center text-white bg-slate-700/80 active:bg-slate-600 rounded-xl 2xl:rounded-2xl">
      <AiOutlineClose className="w-8 h-8 2xl:w-12 2xl:h-12" />
    </div>
  );
};

export default CloseButton;
