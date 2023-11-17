import { Transition } from "@headlessui/react";
import { useGesture } from "@use-gesture/react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdArrowDropdown } from "react-icons/io";
import useWebSocket from "react-use-websocket";
import Button from "./components/Button";
import CloseButton from "./components/CloseButton";
import HomeButton from "./components/HomeButton";
import InspectorAnswer from "./components/InspectorAnswer";
import InspectorFacts from "./components/InspectorFacts";
import InspectorTopics from "./components/InspectorTopics";
import LanguageButton from "./components/LanguageButton";
import Menu from "./components/Menu";
import MenuWrapper from "./components/MenuWrapper";
import NavigationButton from "./components/NavigationButton";
import useOutsideClickMenu from "./hooks/useOutsideClickMenu";

const questions = [
  "What do you think is the reason the sky is blue?",
  "What do you think is the reason the sky is blue?",
  "What do you think is the reason the sky is blue?",
  "What do you think is the reason the sky is blue?",
  "What do you think is the reason the sky is blue?",
  "What do you think is the reason the sky is blue?",
  "What do you think is the reason the sky is blue?",
];
let contentAnswer = {
  n: {
    id: 7670,
    labels: ["Answer"],
    properties: {
      CTime: "1678207834334",
      SelfID: 0,
      SessionID: "b50a074ba9e34a8fbca61126b62a3ddd",
      VertexID: 15,
      VertexType: 0,
      categories: [11],
      de: "Die Regierung sollte das Problem der Energiekrise lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauen zse lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauense lösen.se lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauense lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauen Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauenu müssen. Die Regierung sollte das Problem der Energiekrise lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauen zu müssen. Die Regierung sollte das Problem der Energiekrise lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauen zu müssen. Die Regierung sollte das Problem der Energiekrise lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauen zu müssen. Die Regierung sollte das Problem der Energiekrise lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauen zu müssen. Die Regierung sollte das Problem der Energiekrise lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauen zu müssen.",
      en: "The government should solve the energy crisis issue. We should find a way to provide. Energy. Uh, in a more efficient way and without requiring to. Without requiring to dig coal.",
      keywords: [16, 17, 18, 19],
      lang: 1,
      questions: [0],
    },
    type: "node",
  },
};
let contentArr = [
  {
    selected: {
      element: "answer",
      date: "12 July 2023",
      time: "12:23",
      text: ["I would love to have more art in the streets"],
    },
    associated: [
      {
        element: "question",
        text: ["What do you think is the reason the sky is blue?"],
      },
      { element: "topic", text: ["City", "Future", "Art", "Streets"] },
      {
        element: "facts",
        text: [
          "75% of the topics answers belong to the question “What do you think is the reason the sky is blue?”",
          "75% of the topics answers belong to the question “What do you think is the reason the sky is blue?”",
        ],
      },
    ],
  },
  {
    selected: {
      element: "facts",
      text: [
        "75% of the topics answers belong to the question “What do you think is the reason the sky is blue?”",
        "75% of the topics answers belong to the question “What do you think is the reason the sky is blue?”",
      ],
    },
    associated: [
      {
        element: "question",
        text: [
          "What do you think is the reason the sky is blue?",
          "What do you think is the reason the sky is blue?",
          "What do you think is the reason the sky is blue?",
          "What do you think is the reason the sky is blue?",
          "What do you think is the reason the sky is blue?",
          "What do you think is the reason the sky is blue?",
          "What do you think is the reason the sky is blue?",
        ],
      },
      { element: "topic", text: ["City", "Future", "Art", "Streets"] },
    ],
  },
];

const App = () => {
  const { t, i18n } = useTranslation();
  const handleLanguageChange = (e) => {
    if (i18n.language === "en") {
      i18n.changeLanguage("de");
    } else if (i18n.language === "de") {
      i18n.changeLanguage("en");
    }
  };
  const [choosenElement, setChoosenElement] = useState("none");
  const [showPanel, setShowPanel] = useState(true);
  const [content, setContent] = useState(contentArr[1]);
  const [navigationState, setNavigationState] = useState("move");
  const [selectedQuestions, setSelectedQuestions] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  const [selectedSortBy, setSelectedSortBy] = useState(0);
  const [selectedLatestAnswer, setSelectedLatestAnswer] = useState(0);
  const [questionMenu, setQuestionMenu] = useState(false);
  const [sortByMenu, setSortByMenu] = useState(false);
  const [languageMenu, setLanguageMenu] = useState(false);
  const [latestAnswerMenu, setLatestAnswerMenu] = useState(false);
  const socketUrl = "ws://localhost:5002";

  const { sendMessage, lastMessage } = useWebSocket(socketUrl, {});
  useWebSocket(socketUrl, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
  });

  const buttonRef = useRef(null);
  const sortByMenuRef = useRef(null);
  const latestAnswerMenuRef = useRef(null);
  const questionMenuRef = useRef(null);
  const navigationRef = useRef(null);
  const needHelpRef = useRef(null);
  const languageRef = useRef(null);
  const inspectorRef = useRef(null);

  const refs = [
    inspectorRef,
    languageRef,
    needHelpRef,
    navigationRef,
    buttonRef,
    sortByMenuRef,
    latestAnswerMenuRef,
    questionMenuRef,
  ];

  const dragOptions = { filterTaps: true, tapsThreshold: 10, delay: 1000 };

  const bind = useGesture(
    {
      onDrag: (e) => {
        if (!e.pinching) {
          let interfaceClick = false;
          refs.forEach((element) => {
            if (element.current && element.current.contains(e.target)) {
              interfaceClick = true;
              console.log("INTERFACE DRAG");
            }
          });
          if (!interfaceClick) {
            if (e.dragging) {
              handleGesture(e, "drag");
              console.log("VVVV DRAG");
            } else if (e.tap) {
              handleGesture(e, "tap");
              console.log("VVVV TAP");
            }
          }
        }
      },
      onPinch: (e) => {
        let interfaceClick = false;
        refs.forEach((element) => {
          if (element.current && element.current.contains(e.target)) {
            interfaceClick = true;
            console.log("INTERFACE PINCH");
          }
        });
        if (!interfaceClick) {
          handleGesture(e, "pinch");
          console.log(e);
        }
      },
    },
    {
      drag: dragOptions,
    }
  );

  useEffect(() => {
    if (choosenElement === "answer") {
      setContent(contentArr[0]);
    } else if (choosenElement === "none") {
      setContent(contentArr[1]);
    }
  }, [choosenElement]);

  useEffect(() => {
    sendMessage(
      JSON.stringify({
        windowWidth: window.screen.width,
        windowHeight: window.screen.height,
      })
    );
    console.log("WINDOW RESIZE");
  }, [window.screen]);

  const handleCloseButton = () => {
    console.log("closeButton: true");
    setShowPanel(false);
  };

  const handleContentSwitch = () => {
    if (choosenElement === "answer") {
      setChoosenElement("none");
    } else if (choosenElement === "none") {
      setChoosenElement("answer");
    }
    setTimeout(() => {
      setShowPanel(true);
    }, 200);
  };

  const handleQuestionSelected = (i) => {
    const newSelectedQuestions = selectedQuestions.map((question, index) => {
      if (i === index) {
        return !question;
      } else {
        return question;
      }
    });
    setSelectedQuestions(newSelectedQuestions);
  };

  const handleSortBySelected = (i) => {
    setSelectedSortBy(i);
  };

  const handleLatestAnswerSelected = (i) => {
    setSelectedLatestAnswer(i);
  };

  const handleNavigationSwitch = (element) => {
    setNavigationState(element);
  };

  const toggleQuestionMenu = () => {
    setQuestionMenu((prev) => !prev);
    if (sortByMenu === true || latestAnswerMenu === true) {
      setSortByMenu(false);
      setLatestAnswerMenu(false);
    }
  };

  const toggleLanguageMenu = () => {
    setLanguageMenu((prev) => !prev);
  };

  const toggleSortByMenu = () => {
    setSortByMenu((prev) => !prev);
    if (questionMenu === true || latestAnswerMenu === true) {
      setQuestionMenu(false);
      setLatestAnswerMenu(false);
    }
  };

  const toggleLatestAnswerMenu = () => {
    setLatestAnswerMenu((prev) => !prev);
    if (questionMenu === true || sortByMenu === true) {
      setQuestionMenu(false);
      setSortByMenu(false);
    }
  };

  const handleOutsideClick = () => {
    setSortByMenu(false);
    setQuestionMenu(false);
    setLatestAnswerMenu(false);
    setLanguageMenu(false);
  };

  useOutsideClickMenu(
    [
      buttonRef,
      sortByMenuRef,
      latestAnswerMenuRef,
      questionMenuRef,
      languageRef,
    ],
    handleOutsideClick
  );

  const handleGesture = (e, type) => {
    let message = JSON.stringify({
      type: type,
      movement: e.movement,
    });
    sendMessage(message);
    console.log(message);
  };

  useEffect(() => {
    let receivedValue;
    if (lastMessage !== null) {
      receivedValue = JSON.parse(lastMessage.data);
      console.log(receivedValue);
      if (receivedValue.hasOwnProperty("hitRect")) {
        handleCloseButton();
      }
    }
  }, [lastMessage, sendMessage]);

  return (
    <div
      {...bind()}
      className="touch-none select-none font-futurium w-screen h-screen overflow-hidden flex justify-center items-end bg-opacity-20 p-12 relative"
    >
      <div className="absolute flex h-full top-12 gap-1 2xl:gap-4 left-12  flex-col justify-start items-start">
        <div ref={buttonRef} className="flex justify-center 2xl:gap-8 items-start gap-4">
          <Button onClick={toggleQuestionMenu}>
            <p>{t("button.question")}</p>
            <IoMdArrowDropdown className="w-6 h-6 2xl:w-12 2xl:h-12" />
          </Button>
          <Button onClick={toggleSortByMenu}>
            <p>{t("button.sort")}</p>
            <IoMdArrowDropdown className="w-6 h-6 2xl:w-12 2xl:h-12" />
          </Button>
          <Button onClick={toggleLatestAnswerMenu}>
            <p>{t("button.latest")}</p>
            <IoMdArrowDropdown className="w-6 h-6 2xl:w-12 2xl:h-12" />
          </Button>
        </div>
        <MenuWrapper
          _ref={questionMenuRef}
          showState={questionMenu}
          className=""
        >
          <Menu
            type="questionPicker"
            state={selectedQuestions}
            items={questions}
            onClickFunction={handleQuestionSelected}
            setState={setSelectedQuestions}
          />
        </MenuWrapper>
        <MenuWrapper
          className={`${i18n.language==="de"? "ml-[435px]": "ml-[410px]"} -mt-4`}
          _ref={sortByMenuRef}
          showState={sortByMenu}
        >
          <Menu
            type="radioButton"
            state={selectedSortBy}
            items={["Questions and Topics", "Questions", "Topics"]}
            onClickFunction={handleSortBySelected}
          />
        </MenuWrapper>
        <MenuWrapper
          className={`${i18n.language==="de"? "ml-[730px]": "ml-[680px]"} -mt-4`}
          _ref={latestAnswerMenuRef}
          showState={latestAnswerMenu}
        >
          <Menu
            type="radioButton"
            state={selectedLatestAnswer}
            items={["All", "Last 10", "Last 100", "Last 1000"]}
            onClickFunction={handleLatestAnswerSelected}
          />
        </MenuWrapper>
      </div>
      <Transition
        appear={true}
        show={showPanel}
        className="drop-shadow-3xl flex absolute right-12 top-12"
        enter="transition ease duration-500 transform"
        enterFrom="opacity-0 translate-x-12"
        enterTo="opacity-100 translate-x-0"
        leave="transition ease duration-300 transform"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 translate-x-12"
        afterLeave={handleContentSwitch}
      >
        <div className="flex flex-col max-w-sm 2xl:max-w-4xl justify-center items-end gap-2">
          {choosenElement !== "none" && (
            <div onClick={handleCloseButton}>
              <CloseButton />
            </div>
          )}
          <div className="w-full flex" ref={inspectorRef}>
            {choosenElement === "none" && (
              <InspectorFacts content={contentAnswer.n} />
            )}
            {choosenElement === "answer" && (
              <div className="flex-col gap-4 flex">
                <InspectorAnswer content={contentAnswer.n} />
                <InspectorTopics
                  content={contentAnswer.n.properties.keywords}
                />
              </div>
            )}
          </div>
        </div>
      </Transition>
      <div className="flex justify-center items-center gap-4 absolute bottom-1/2">
        <div
          onClick={handleCloseButton}
          className="flex bg-green-500 hover:bg-green-300"
        >
          Answer
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-4 absolute bottom-16 right-48">
        <div ref={needHelpRef}>
          <Button>
            <p>{t("needHelpButton")}</p>
          </Button>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-4 absolute bottom-14 right-12">
        <div ref={languageRef}>
          <LanguageButton
            currentLanguage={i18n.language.toUpperCase()}
            changeLanguage={() => handleLanguageChange()}
            toggleLanguageMenu={() => toggleLanguageMenu()}
            languageMenuState={languageMenu}
          />
        </div>
      </div>
      <div
        ref={navigationRef}
        className="flex justify-center items-center gap-6 "
      >
        <NavigationButton
          onLeftClick={() => handleNavigationSwitch("move")}
          onRightClick={() => handleNavigationSwitch("rotate")}
          navigationState={navigationState}
        />
        <HomeButton />
        <NavigationButton type="zoom" />
      </div>
    </div>
  );
};

export default App;
