import { GoHome } from "react-icons/go";

const HomeButton = ({ children, ...props }) => {
  let windowSize= window.innerWidth
  return (
    <button
      {...props}
      className="active:bg-slate-100 flex items-center justify-center gap-2 2xl:p-8 p-4 bg-white drop-shadow-3xl rounded-full"
    >
        <GoHome size={windowSize > 2000 ? "64":"32"}/>
    </button>
  );
};

export default HomeButton;
 