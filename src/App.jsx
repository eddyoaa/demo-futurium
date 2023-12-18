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
import useGestureInterpreter from "./hooks/useGestureInterpreter";
import useOutsideClickMenu from "./hooks/useOutsideClickMenu";

const questions = [
  "What would you want to use unused space in the city for?",
  "What could your city do to promote a healthy lifestyle?",
  "Which problems should the government solve in the next 10 years?",
  "What are the biggest problems in your neighborhood?",
  "What work do you do every day that you are not paid for?",
  "Which jobs do you find important?",
  "What would make you give up your car?",
  "If you were free to create your perfect job, what would it be like?",
];

const topics = [
  "Environment",
  "Education",
  "Labor",
  "Healthcare",
  "Urbanity",
  "Social structures",
  "Politics",
  "Economy",
  "Technology & Science",
  "Global",
  "Art and culture",
  "Recreation",
];

let contentAnswer = {
  n: {
    id: 7670,
    labels: ["Answer"],
    properties: {
      CTime: "15:30 Uhr",
      CDate: "12.12.23",
      SelfID: 0,
      SessionID: "b50a074ba9e34a8fbca61126b62a3ddd",
      VertexID: 15,
      VertexType: 0,
      categories: [11],
      de: "Die Regierung sollte das Problem der Energiekrise lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauen zse lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauense lösen.se lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauense lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauen Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauenu müssen. Die Regierung sollte das Problem der Energiekrise lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauen zu müssen. Die Regierung sollte das Problem der Energiekrise lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauen zu müssen. Die Regierung sollte das Problem der Energiekrise lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauen zu müssen. Die Regierung sollte das Problem der Energiekrise lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauen zu müssen. Die Regierung sollte das Problem der Energiekrise lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauen zu müssen.",
      en: "The government should solve the energy crisis issue. We should find a way to provide. Energy. Uh, in a more efficient way and without requiring to. Without requiring to dig coal.",
      keywords: ["Energie", "Regierung", "Energiekrise", "Umwelt"],
      lang: 1,
      questions: [
        "Welche Probleme sollte die Regierung in den nächsten 10 Jahren lösen?",
      ],
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
  const [choosenElement, setChoosenElement] = useState("answer");
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
  const [selectedTopics, setSelectedTopics] = useState([
    true,
    true,
    true,
    true,
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
  const [topicsMenu, setTopicsMenu] = useState(false);
  const [latestAnswerMenu, setLatestAnswerMenu] = useState(false);
  const [helpButton, setHelpButton] = useState(0);
  const [zoomMinusButton, setZoomMinusButton] = useState(0);
  const [zoomPlusButton, setZoomPlusButton] = useState(0);
  const [homeButton, setHomeButton] = useState(0);
  const [touchPosition, setTouchPosition] = useState([]);
  const [touchState, setTouchState] = useState("");
  const [touchTap, setTouchTap] = useState(0);
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
  const topicsMenuRef = useRef(null);
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
    topicsMenuRef,
  ];

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

  const handleTopicSelect = (i) => {
    const newSelectedTopics = selectedTopics.map((topic, index) => {
      if (i === index) {
        return !topic;
      } else {
        return topic;
      }
    });
    setSelectedTopics(newSelectedTopics);
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
    if (
      sortByMenu === true ||
      latestAnswerMenu === true ||
      topicsMenu === true
    ) {
      setSortByMenu(false);
      setLatestAnswerMenu(false);
      setTopicsMenu(false);
    }
  };

  const toggleLanguageMenu = () => {
    setLanguageMenu((prev) => !prev);
  };

  const toggleSortByMenu = () => {
    setSortByMenu((prev) => !prev);
    if (
      questionMenu === true ||
      latestAnswerMenu === true ||
      topicsMenu === true
    ) {
      setQuestionMenu(false);
      setLatestAnswerMenu(false);
      setTopicsMenu(false);
    }
  };

  const toggleLatestAnswerMenu = () => {
    setLatestAnswerMenu((prev) => !prev);
    if (questionMenu === true || sortByMenu === true || topicsMenu === true) {
      setQuestionMenu(false);
      setSortByMenu(false);
      setTopicsMenu(false);
    }
  };

  const toggleTopicsMenu = () => {
    setTopicsMenu((prev) => !prev);
    if (
      questionMenu === true ||
      sortByMenu === true ||
      latestAnswerMenu === true
    ) {
      setQuestionMenu(false);
      setSortByMenu(false);
      setLatestAnswerMenu(false);
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
      topicsMenuRef,
      languageRef,
    ],
    handleOutsideClick
  );

  const handleGesture = (e, type) => {
    setTouchPosition(e.movement);
    setTouchState(type);
    if (type === "tap") {
      setTouchTap((prev) => prev + 1);
      setTouchPosition(e.initial);
    }
  };

  const bind = useGestureInterpreter(handleGesture, refs);

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

  useEffect(() => {
    let message = JSON.stringify({
      navigationState: navigationState,
      selectedQuestions: selectedQuestions,
      selectedSortBy: selectedSortBy,
      selectedLatestAnswer: selectedLatestAnswer,
      language: i18n.language,
      helpButton: helpButton,
      zoomMinusButton: zoomMinusButton,
      zoomPlusButton: zoomPlusButton,
      homeButton: homeButton,
      touchPosition: touchPosition,
      touchTap: touchTap,
      touchState: touchState,
    });
    sendMessage(message);
  }, [
    navigationState,
    selectedQuestions,
    selectedSortBy,
    selectedLatestAnswer,
    i18n.language,
    helpButton,
    zoomMinusButton,
    zoomPlusButton,
    homeButton,
    touchPosition,
    touchTap,
    touchState,
  ]);

  return (
    <div
      {...bind()}
      className="touch-none select-none font-futurium w-screen h-screen overflow-hidden flex justify-center items-end bg-opacity-20 p-12 relative"
    >
      <div className="absolute flex h-full top-12 gap-1 2xl:gap-4 left-12  flex-col justify-start items-start">
        <div
          ref={buttonRef}
          className="flex justify-center 2xl:gap-8 items-start gap-4"
        >
          <Button onClick={toggleQuestionMenu}>
            <p>{t("button.question")}</p>
            <IoMdArrowDropdown className="w-6 h-6 2xl:w-12 2xl:h-12" />
          </Button>
          <Button onClick={toggleTopicsMenu}>
            <p>{t("button.topic")}</p>
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
          _ref={topicsMenuRef}
          showState={topicsMenu}
          className={`${
            i18n.language === "de" ? "ml-[260px]" : "ml-[310px]"
          } -mt-4`}
        >
          <Menu
            type="topicPicker"
            state={selectedTopics}
            items={topics}
            onClickFunction={handleTopicSelect}
            setState={setSelectedTopics}
          />
        </MenuWrapper>
        <MenuWrapper
          className={`${
            i18n.language === "de" ? "ml-[540px]" : "ml-[560px]"
          } -mt-4`}
          _ref={sortByMenuRef}
          showState={sortByMenu}
        >
          <Menu
            type="radioButton"
            state={selectedSortBy}
            items={
              i18n.language === "de"
                ? ["Standard", "nach Fragen", "nach Themen"]
                : ["Default", "Questions", "Topics"]
            }
            onClickFunction={handleSortBySelected}
          />
        </MenuWrapper>
        <MenuWrapper
          className={`${
            i18n.language === "de" ? "ml-[830px]" : "ml-[830px]"
          } -mt-4`}
          _ref={latestAnswerMenuRef}
          showState={latestAnswerMenu}
        >
          <Menu
            type="radioButton"
            state={selectedLatestAnswer}
            items={
              i18n.language === "de"
                ? ["Alle", "Letzte 10", "Letzte 100", "Letzte 1000"]
                : ["All", "Last 10", "Last 100", "Last 1000"]
            }
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
      {/* <div className="flex justify-center items-center gap-4 absolute bottom-1/2">
        <div
          onClick={handleCloseButton}
          className="flex bg-green-500 hover:bg-green-300"
        >
          Answer
        </div>
      </div> */}
      <div className="flex flex-row justify-center items-center gap-4 absolute bottom-16 right-48">
        <div ref={needHelpRef}>
          <Button
            onClick={() => {
              setHelpButton((prev) => prev + 1);
            }}
          >
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
        <HomeButton
          onClick={() => {
            setHomeButton((prev) => prev + 1);
          }}
        />
        <NavigationButton
          type="zoom"
          onLeftClick={() => {
            setZoomMinusButton((prev) => prev + 1);
          }}
          onRightClick={() => {
            setZoomPlusButton((prev) => prev + 1);
          }}
        />
      </div>
    </div>
  );
};

export default App;
