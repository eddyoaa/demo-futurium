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
import SortByBar from "./components/SortByBar";
import useGestureInterpreter from "./hooks/useGestureInterpreter";
import useOutsideClickMenu from "./hooks/useOutsideClickMenu";

let contentFacts = {
  properties_en: {
    CTime: "3:30 p.m",
    CDate: "12.12.23",
    answer:
      "The government should solve the energy crisis issue. We should find a way to provide. Energy. Uh, in a more efficient way and without requiring to. Without requiring to dig coal.",
    keywords: [
      { label: "Energy", children: ["Power", "Cole"] },
      { label: "Government", children: ["City", "Money", "Safety"] },
      {
        label: "Environment",
        children: ["Nature", "Green", "Dirt"],
      },
    ],
    question: "Which problems should be solved in the next 10 years?",
  },
  properties: {
    CTime: "15:30 Uhr",
    CDate: "12.12.23",
    answer:
      "Die Regierung sollte das Problem der Energiekrise lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauen zse lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauense lösen.se lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauense lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauen Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauenu müssen. Die Regierung sollte das Problem der Energiekrise lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauen zu müssen. Die Regierung sollte das Problem der Energiekrise lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauen zu müssen. Die Regierung sollte das Problem der Energiekrise lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauen zu müssen. Die Regierung sollte das Problem der Energiekrise lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauen zu müssen. Die Regierung sollte das Problem der Energiekrise lösen. Wir sollten einen Weg finden, um zu versorgen. Energie. Äh, auf eine effizientere Art und Weise, ohne es zu erfordern. Ohne Kohle abbauen zu müssen.",
    keywords: [
      { label: "Energie", children: ["Strom", "Kohle"] },
      { label: "Regierung", children: ["Staat", "Geld", "Grundversorgung"] },
      {
        label: "Umwelt",
        children: ["Natur", "Grünflächen", "Verschmutzung"],
      },
    ],
    question:
      "Welche Probleme sollte die Regierung in den nächsten 10 Jahren lösen?",
  },
};

const App = () => {
  // translator setup
  const { t, i18n } = useTranslation();
  const handleLanguageChange = (e) => {
    if (i18n.language === "en") {
      i18n.changeLanguage("de");
    } else if (i18n.language === "de") {
      i18n.changeLanguage("en");
    }
  };

  // static values setup
  // const topics = [
  //   t("topics.env"),
  //   t("topics.ed"),
  //   t("topics.work"),
  //   t("topics.hel"),
  //   t("topics.urb"),
  //   t("topics.soc"),
  //   t("topics.pol"),
  //   t("topics.ec"),
  //   t("topics.tec"),
  //   t("topics.glo"),
  //   t("topics.art"),
  //   t("topics.le"),
  // ];

  // const questions = [
  //   t("questions.0"),
  //   t("questions.1"),
  //   t("questions.2"),
  //   t("questions.3"),
  //   t("questions.4"),
  //   t("questions.5"),
  //   t("questions.6"),
  //   t("questions.7"),
  // ];

  // states
  const [choosenElement, setChoosenElement] = useState(false);
  const [showPanel, setShowPanel] = useState(true);
  const [contentAnswer, setContentAnswer] = useState("");
  const [navigationState, setNavigationState] = useState("move");
  const [questions, setQuestions] = useState({ en: [], de: [] });
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [topics, setTopics] = useState({ en: [], de: [] });
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedSortBy, setSelectedSortBy] = useState(1);
  const [selectedLatestAnswer, setSelectedLatestAnswer] = useState(0);
  const [questionMenu, setQuestionMenu] = useState(false);
  const [languageMenu, setLanguageMenu] = useState(false);
  const [topicsMenu, setTopicsMenu] = useState(false);
  const [latestAnswerMenu, setLatestAnswerMenu] = useState(false);
  const [helpButton, setHelpButton] = useState(0);
  const [flyToButton, setFlyToButton] = useState(0);
  const [zoomMinusButton, setZoomMinusButton] = useState(0);
  const [zoomPlusButton, setZoomPlusButton] = useState(0);
  const [homeButton, setHomeButton] = useState(0);
  const [touchPosition, setTouchPosition] = useState([]);
  const [touchState, setTouchState] = useState("");
  const [touchTap, setTouchTap] = useState(0);
  const [closePanel, setClosePanel] = useState(false);
  const socketUrl = "ws://localhost:5002";

  // setting up websocket connection
  const { sendMessage, lastMessage } = useWebSocket(socketUrl, {});
  useWebSocket(socketUrl, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
  });

  // setting up refs for area detection
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

  // window resize event
  useEffect(() => {
    sendMessage(
      JSON.stringify({
        windowWidth: window.screen.width,
        windowHeight: window.screen.height,
      })
    );
    //console.log("WINDOW RESIZE");
  }, [window.screen]);

  // button handlers
  const handleCloseButton = () => {
    setShowPanel(false);
    setClosePanel(true);
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

  const handleSortByClick = (i) => {
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
    if (latestAnswerMenu === true || topicsMenu === true) {
      setLatestAnswerMenu(false);
      setTopicsMenu(false);
    }
  };

  const toggleLanguageMenu = () => {
    setLanguageMenu((prev) => !prev);
  };

  const toggleLatestAnswerMenu = () => {
    setLatestAnswerMenu((prev) => !prev);
    if (questionMenu === true || topicsMenu === true) {
      setQuestionMenu(false);
      setTopicsMenu(false);
    }
  };

  const toggleTopicsMenu = () => {
    setTopicsMenu((prev) => !prev);
    if (questionMenu === true || latestAnswerMenu === true) {
      setQuestionMenu(false);
      setLatestAnswerMenu(false);
    }
  };

  // handling panel animation
  const handleContentSwitch = () => {
    if (JSON.parse(lastMessage.data).content === "" || closePanel) {
      setChoosenElement(false);
      setClosePanel(false);
    } else {
      setContentAnswer(JSON.parse(lastMessage.data).content);
      setChoosenElement(true);
    }
    setTimeout(() => {
      setShowPanel(true);
    }, 150);
  };

  // handling menu closure
  const handleOutsideClick = () => {
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

  // handling touch inputs
  const handleGesture = (e, type) => {
    setTouchPosition(e.movement);
    setTouchState(type);
    if (type === "tap") {
      setTouchTap((prev) => prev + 1);
      setTouchPosition(e.initial);
    }
  };

  const bind = useGestureInterpreter(handleGesture, refs);

  // handling received message via websocket
  useEffect(() => {
    let receivedValue;
    if (lastMessage !== null) {
      receivedValue = JSON.parse(lastMessage.data);
      console.log(receivedValue);
      if (receivedValue.hasOwnProperty("content")) {
        setShowPanel(false);
      }
      if (receivedValue.hasOwnProperty("questions")) {
        const temp = {
          en: Object.keys(receivedValue.questions).map(
            (k) => receivedValue.questions[k].en
          ),
          de: Object.keys(receivedValue.questions).map(
            (k) => receivedValue.questions[k].de
          ),
        };
        setQuestions(temp);
        setSelectedQuestions(
          Object.keys(receivedValue.questions).map((k) => true)
        );
      }
      if (receivedValue.hasOwnProperty("topics")) {
        const temp = {
          en: Object.keys(receivedValue.topics).map(
            (k) => receivedValue.topics[k].en
          ),
          de: Object.keys(receivedValue.topics).map(
            (k) => receivedValue.topics[k].de
          ),
        };
        setTopics(temp);
        setSelectedTopics(Object.keys(receivedValue.topics).map((k) => true));
      }
    }
  }, [lastMessage, sendMessage]);

  // handling sending message via websocket on state change
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
    flyToButton,
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
            <IoMdArrowDropdown className="w-6 h-6 2xl:w-8 2xl:h-8" />
          </Button>
          <Button onClick={toggleTopicsMenu}>
            <p>{t("button.topic")}</p>
            <IoMdArrowDropdown className="w-6 h-6 2xl:w-8 2xl:h-8" />
          </Button>
          <Button onClick={toggleLatestAnswerMenu}>
            <p>{t("button.latest")}</p>
            <IoMdArrowDropdown className="w-6 h-6 2xl:w-8 2xl:h-8" />
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
            items={i18n.language === "en" ? questions.en : questions.de}
            onClickFunction={handleQuestionSelected}
            setState={setSelectedQuestions}
          />
        </MenuWrapper>
        <MenuWrapper
          _ref={topicsMenuRef}
          showState={topicsMenu}
          className={`${
            i18n.language === "de" ? "ml-[200px]" : "ml-[240px]"
          } -mt-4`}
        >
          <Menu
            type="topicPicker"
            state={selectedTopics}
            items={i18n.language === "en" ? topics.en : topics.de}
            onClickFunction={handleTopicSelect}
            setState={setSelectedTopics}
          />
        </MenuWrapper>
        <MenuWrapper
          className={`${
            i18n.language === "de" ? "ml-[420px]" : "ml-[440px]"
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
      <div
        ref={sortByMenuRef}
        className="flex justify-center items-center absolute top-12 mx-auto"
      >
        <SortByBar
          state={selectedSortBy}
          setState={setSelectedSortBy}
          itemsAmount={3}
          clickEvent={handleSortByClick}
        />
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
        <div className="flex flex-col max-w-sm 2xl:max-w-3xl justify-center items-end gap-2">
          {choosenElement && (
            <div onClick={handleCloseButton}>
              <CloseButton />
            </div>
          )}
          <div className="w-full flex" ref={inspectorRef}>
            {!choosenElement && (
              <InspectorFacts
                content={
                  i18n.language === "en"
                    ? contentFacts.properties_en
                    : contentFacts.properties
                }
              />
            )}
            {choosenElement && (
              <div className="flex-col gap-4 flex">
                <InspectorAnswer
                  handleClickEvent={() => {
                    setFlyToButton((prev) => prev + 1);
                  }}
                  content={
                    i18n.language === "en"
                      ? contentAnswer.properties_en
                      : contentAnswer.properties
                  }
                />
                <InspectorTopics
                  content={
                    i18n.language === "en"
                      ? contentAnswer.properties_en
                      : contentAnswer.properties
                  }
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
      <div className="flex flex-row justify-center items-center gap-4 absolute bottom-16 right-40">
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
      <div className="flex flex-row justify-center items-center gap-4 absolute bottom-12 right-12">
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
