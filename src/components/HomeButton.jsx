import { GoHome } from "react-icons/go";

const HomeButton = ({ children, ...props }) => {
  let windowSize = window.innerWidth;
  return (
    <button
      {...props}
      className="select-none active:bg-slate-300 flex items-center justify-center gap-2 2xl:p-6 p-4 bg-white drop-shadow-3xl rounded-full"
    >
      <GoHome size={windowSize > 2000 ? "40" : "16"} />
    </button>
  );
};

export default HomeButton;
