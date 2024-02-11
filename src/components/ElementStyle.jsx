const ElementStyle = ({ choosenElement, elementType, ...props }) => {
  return (
    <div
      style={{
        borderColor: `${choosenElement ? `#${props.col}` : "white"}`,
      }}
      className={`
      ${
        elementType === "questionPicker" || elementType === "topicPicker"
          ? "active:bg-slate-200 rounded-lg 2xl:text-2xl"
          : ""
      } 
      ${elementType === "questionLatestAnswer" ? "2xl:text-xl" : ""} 
     ${
       (elementType === "questionPicker" || elementType === "topicPicker") &&
       choosenElement === false
         ? "pl-1 border-4 "
         : " "
     }  
     ${
       (elementType === "questionPicker" || elementType === "topicPicker") &&
       choosenElement === true
         ? "pl-1 border-4 "
         : " "
     }  
     ${
       elementType === "radioButton"
         ? " border-none text-lg 2xl:text-2xl 2xl:font-normal  font-medium"
         : ""
     }  
     ${
       elementType === "facts" ||
       elementType === "topic" ||
       elementType === "questionPicker" ||
       elementType === "questionLatestAnswer" ||
       elementType === "topicPicker" ||
       elementType === "question" ||
       elementType === "answerLatestAnswer" ||
       elementType === "answer"
         ? "flex gap-3 h-full w-full text-base 2xl:text-2xl"
         : ""
     } 
     ${elementType === "tags" ? " flex gap-3 h-8 text-base 2xl:text-2xl" : ""} 
     ${
       elementType === "topicChildren"
         ? "flex gap-3 h-full w-full text-base 2xl:text-xl"
         : ""
     } 
     ${
       elementType === "answer"
         ? "text-xl 2xl:text-3xl items-start"
         : "items-center"
     }
     ${
       elementType === "answerLatestAnswer"
         ? "text-xl 2xl:text-2xl font-medium items-start"
         : ""
     }
     `}
    >
      {/* {(elementType === "facts" ||
        elementType === "questionPicker" ||
        elementType === "questionLatestAnswer" ||
        elementType === "topicPicker" ||
        elementType === "question" ||
        elementType === "answerLatestAnswer" ||
        elementType === "answer") && (
        <div
          className={`w-1 rounded-xl ${
            elementType === "questionLatestAnswer" ||
            elementType === "questionPicker" ||
            elementType === "question"
              ? "bg-blue-400"
              : ""
          }
          ${elementType === "topicPicker" ? "bg-red-400" : ""}
          ${elementType === "facts" ? "bg-neutral-400" : ""}
          ${
            elementType === "answer" || elementType === "answerLatestAnswer"
              ? "bg-green-400 h-full"
              : "h-[80%]"
          }
           `}
        ></div>
      )} */}
      {(elementType === "questionPicker" ||
        elementType === "topicPicker" ||
        elementType === "question" ||
        elementType === "answerLatestAnswer" ||
        elementType === "tags" ||
        elementType === "answer") && (
        <div
          className={`w-1 rounded-xl ${
            elementType === "answer" || elementType === "answerLatestAnswer"
              ? "h-full"
              : "h-[80%]"
          }
           `}
          style={{
            background: `#${props.col}`,
          }}
        ></div>
      )}
      {elementType === "topicChildren" && (
        <div className="w-2 h-2 rounded-full bg-white"></div>
      )}
      <p
        className={`w-full  ${
          elementType === "answerLatestAnswer" || elementType === "answer"
            ? "leading-tight tracking-normal"
            : ""
        }
        ${elementType === "answerLatestAnswer" ? "" : ""}`}
      >
        {props.children}
      </p>
    </div>
  );
};

export default ElementStyle;
