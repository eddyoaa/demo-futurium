import { AiOutlineClose } from "react-icons/ai";

const CloseButton = () => {
  return (
    <div className="flex p-2 justify-center items-center text-white bg-slate-700/80 active:bg-slate-600 rounded-xl">
      <AiOutlineClose className="w-8 h-8" />
    </div>
  );
};

export default CloseButton;
