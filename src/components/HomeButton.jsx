import { GoHome } from "react-icons/go";

const HomeButton = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="active:bg-slate-100 flex w-max items-center gap-2 p-4 bg-white drop-shadow-3xl rounded-full"
    >
      <GoHome size={32} />
    </button>
  );
};

export default HomeButton;
