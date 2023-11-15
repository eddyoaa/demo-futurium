const ElementStyle = ({ choosenElement, elementType, ...props }) => {
  return (
    <div
      className={`
      ${
        elementType === "questionPicker" ? "active:bg-slate-200 rounded-lg" : ""
      } 
     ${
       elementType === "questionPicker" && choosenElement === false
         ? "opacity-50"
         : " "
     }  
     ${
       elementType === "questionPicker" && choosenElement === true
         ? "opacity-100"
         : " "
     }  
     ${
       elementType === "radioButton" ? " border-none text-lg font-medium" : ""
     }  
     ${
       elementType === "facts" || "topics" || "questionPicker"
         ? "flex gap-4 h-full w-full items-center"
         : ""
     }
     `}
    >
      {(elementType === "facts" || elementType === "questionPicker") && (
        <div
          className={`w-1 h-[80%] rounded-xl ${
            elementType === "questionPicker" ? "bg-blue-400" : "bg-neutral-400"
          }`}
        ></div>
      )}
      {props.children}
    </div>
  );
};

export default ElementStyle;
