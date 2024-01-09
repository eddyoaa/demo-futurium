const ElementStyle = ({ choosenElement, elementType, ...props }) => {
  return (
    <div
      className={`
      ${
        elementType === "questionPicker" || elementType === "topicPicker"
          ? "active:bg-slate-200 rounded-lg 2xl:text-4xl"
          : ""
      } 
     ${
       (elementType === "questionPicker" || elementType === "topicPicker") &&
       choosenElement === false
         ? "opacity-30"
         : " "
     }  
     ${
       (elementType === "questionPicker" || elementType === "topicPicker") &&
       choosenElement === true
         ? "opacity-100"
         : " "
     }  
     ${
       elementType === "radioButton"
         ? " border-none text-lg 2xl:text-4xl 2xl:font-normal  font-medium"
         : ""
     }  
     ${
       elementType === "facts" ||
       elementType === "topic" ||
       elementType === "questionPicker" ||
       elementType === "topicPicker" ||
       elementType === "question" ||
       elementType === "answer"
         ? "flex gap-4 h-full w-full text-base 2xl:text-3xl"
         : ""
     } 

     ${
       elementType === "topicChildren"
         ? "flex gap-4 h-full w-full text-base 2xl:text-2xl"
         : ""
     } 
     ${
       elementType === "answer"
         ? "text-xl 2xl:text-4xl items-start"
         : "items-center"
     }
     `}
    >
      {(elementType === "facts" ||
        elementType === "questionPicker" ||
        elementType === "topicPicker" ||
        elementType === "question" ||
        elementType === "answer") && (
        <div
          className={`w-1 rounded-xl ${
            elementType === "questionPicker" || elementType === "question"
              ? "bg-blue-400"
              : ""
          }
          ${elementType === "topicPicker" ? "bg-red-400" : ""}
          ${elementType === "facts" ? "bg-neutral-400" : ""}
          ${elementType === "answer" ? "bg-green-400 h-full" : "h-[80%]"}
           `}
        ></div>
      )}
      {elementType === "topicChildren" && (
        <div className="w-2 h-2 rounded-full bg-white"></div>
      )}
      <p
        className={`w-full  ${
          elementType === "answer" ? "leading-none tracking-normal" : ""
        }`}
      >
        {props.children}
      </p>
    </div>
  );
};

export default ElementStyle;
