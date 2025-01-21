// eslint-disable-next-line react/prop-types
function Button({
  type = "primary",
  onClick,
  className = "",
  children,
  disabled = false,
  behaviour = "button",
}) {
  const buttonType = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-red-600 text-white",
    gray: "bg-gray-400 text-black",
    lightgray: "bg-gray-200 text-black",
  };

  const nonDiableStyles = `${type && buttonType[type]} hover:brightness-110`;

  return (
    <button
      type={behaviour}
      disabled={disabled}
      onClick={onClick}
      className={` ${className} py-1 px-2 w-fit rounded-sm cursor-pointer transition-all duration-200 ease-in ${
        disabled ? "cursor-not-allowed bg-gray-500 text-black" : nonDiableStyles
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
