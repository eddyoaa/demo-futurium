const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`active:bg-slate-200 text-lg 2xl:text-4xl 2xl:h-[100px] font-bold flex items-center gap-2 2xl:gap-6 p-2 2xl:p-6 drop-shadow-3xl bg-white rounded-lg 2xl:rounded-2xl ${props.className}`}
      // className="bg-neutral-100 -skew-x-12 -skew-y-12 cursor-pointer select-none
      // active:translate-y-2  active:[box-shadow:0_5px_0_0_#1f1f1f,0_0px_0_0_#1f1f1f]
      // active:border-b-[0px]
      // transition-all duration-150 [box-shadow:0_10px_0_0_#1f1f1f,0_10px_0_0_#1f1f1f]
      // border-2 border-black flex w-max items-center gap-2 p-2"
    >
      {children}
    </button>
  );
};

export default Button;
