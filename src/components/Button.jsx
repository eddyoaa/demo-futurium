const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`active:bg-slate-200 text-lg 2xl:text-2xl 2xl:h-[60px] font-bold flex items-center gap-2 2xl:gap-4 p-2 2xl:p-4 drop-shadow-3xl bg-white rounded-lg 2xl:rounded-xl ${props.className}`}
    >
      {children}
    </button>
  );
};

export default Button;
