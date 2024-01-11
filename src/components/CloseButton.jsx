import { AiOutlineClose } from "react-icons/ai";

const CloseButton = ({ clickEvent }) => {
  return (
    <div
      onClick={clickEvent}
      className="flex p-2 2xl:p-3 2xl:px-0 justify-center items-center text-white rounded-xl 2xl:rounded-2xl"
    >
      <AiOutlineClose className="w-8 h-8 2xl:w-9 2xl:h-9" />
    </div>
  );
};

export default CloseButton;
