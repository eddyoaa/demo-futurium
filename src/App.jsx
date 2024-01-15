import { Transition } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdArrowDropdown } from "react-icons/io";
import useWebSocket from "react-use-websocket";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Button from "./components/Button";
import HomeButton from "./components/HomeButton";
import InspectorAnswer from "./components/InspectorAnswer";
import InspectorFacts from "./components/InspectorFacts";
import InspectorTopics from "./components/InspectorTopics";
import LanguageButton from "./components/LanguageButton";
import Menu from "./components/Menu";
import MenuWrapper from "./components/MenuWrapper";
import NavigationButton from "./components/NavigationButton";
import SliderMenu from "./components/SliderMenu";
import SortByBar from "./components/SortByBar";
import useGestureInterpreter from "./hooks/useGestureInterpreter";
import useOutsideClickMenu from "./hooks/useOutsideClickMenu";

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
  const [selectedLatestAnswer, setSelectedLatestAnswer] = useState(-1);
  const [latestAnswers, setLatestAnswers] = useState([]);
  const [questionMenu, setQuestionMenu] = useState(false);
  const [sliderMenu, setSliderMenu] = useState(false);
  const [languageMenu, setLanguageMenu] = useState(false);
  const [topicsMenu, setTopicsMenu] = useState(false);
  const [latestAnswerMenu, setLatestAnswerMenu] = useState(false);
  const [helpButton, setHelpButton] = useState(0);
  const [needHelpContent, setNeedHelpContent] = useState([]);
  const [needHelpMenu, setNeedHelpMenu] = useState(false);
  const [flyToButton, setFlyToButton] = useState(0);
  const [zoomMinusButton, setZoomMinusButton] = useState(false);
  const [zoomPlusButton, setZoomPlusButton] = useState(false);
  const [homeButton, setHomeButton] = useState(0);
  const [touchPosition, setTouchPosition] = useState([]);
  const [touchState, setTouchState] = useState("");
  const [touchTap, setTouchTap] = useState(0);
  const [closeButton, setCloseButton] = useState(0);
  const [closeButtonHit, setCloseButtonHit] = useState(false);
  const [resetValue, setResetValue] = useState(0);
  const [sliderValues, setSliderValues] = useState({});
  const [sliderPresets, setSliderPresets] = useState([{}, {}, {}]);
  const [receivedContent, setReceivedContent] = useState({});
  const [contentFacts, setContentFacts] = useState({
    properties_en: {
      facts: [],
      keywords: [],
      question: "",
    },
    properties: {
      facts: [],
      keywords: [],
      question: "",
    },
  });
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
  const sliderMenuRef = useRef(null);
  const needHelpMenuRef = useRef(null);
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
    sliderMenuRef,
    needHelpMenuRef,
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
    setCloseButtonHit(true);
    setCloseButton((prev) => prev + 1);
  };

  const handleSliderChange = (e, slider) => {
    setSliderValues({
      ...sliderValues,
      [slider]: +e.target.value,
    });
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
    switch (i) {
      case 0:
        setSliderValues(sliderPresets[0]);
        break;
      case 1:
        setSliderValues(sliderPresets[1]);
        break;
      case 2:
        setSliderValues(sliderPresets[2]);
        break;
      default:
        setSliderValues(sliderPresets[1]);
        break;
    }
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
      latestAnswerMenu === true ||
      topicsMenu === true ||
      sliderMenu === true
    ) {
      setLatestAnswerMenu(false);
      setTopicsMenu(false);
      setSliderMenu(false);
    }
  };

  const toggleSliderMenu = () => {
    setSliderMenu((prev) => !prev);
    if (
      questionMenu === true ||
      topicsMenu === true ||
      latestAnswerMenu === true
    ) {
      setQuestionMenu(false);
      setTopicsMenu(false);
      setLatestAnswerMenu(false);
    }
  };

  const toggleLanguageMenu = () => {
    setLanguageMenu((prev) => !prev);
  };

  const toggleLatestAnswerMenu = () => {
    setLatestAnswerMenu((prev) => !prev);
    if (questionMenu === true || topicsMenu === true || sliderMenu === true) {
      setQuestionMenu(false);
      setTopicsMenu(false);
      setSliderMenu(false);
    }
  };

  const toggleTopicsMenu = () => {
    setTopicsMenu((prev) => !prev);
    if (
      questionMenu === true ||
      latestAnswerMenu === true ||
      sliderMenu === true
    ) {
      setQuestionMenu(false);
      setLatestAnswerMenu(false);
      setSliderMenu(false);
    }
  };
  console.log(closeButtonHit);
  console.log(receivedContent);
  // handling panel animation
  const handleContentSwitch = () => {
    if (receivedContent === "" || closeButtonHit) {
      setChoosenElement(false);
      setCloseButtonHit(false);
    } else {
      setContentAnswer(receivedContent);
      setChoosenElement(true);
    }
    setTimeout(() => {
      setShowPanel(true);
    }, 150);
  };

  // handle Reset
  const handleReset = () => {
    let selectedValues = selectedQuestions.map((question) => {
      return true;
    });
    setSelectedQuestions(selectedValues);

    selectedValues = selectedTopics.map((topic) => {
      return true;
    });
    setSelectedTopics(selectedValues);
    handleSortByClick(1);
    setNavigationState("move");
    i18n.changeLanguage("de");
    handleCloseButton();
    handleOutsideClick();
  };

  // handling menu closure
  const handleOutsideClick = () => {
    setQuestionMenu(false);
    setTopicsMenu(false);
    setLatestAnswerMenu(false);
    setLanguageMenu(false);
    setSliderMenu(false);
    setNeedHelpMenu(false);
  };

  useOutsideClickMenu(
    [
      buttonRef,
      sortByMenuRef,
      latestAnswerMenuRef,
      questionMenuRef,
      topicsMenuRef,
      languageRef,
      sliderMenuRef,
      needHelpMenuRef,
      needHelpRef,
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
      if (receivedValue.hasOwnProperty("content")) {
        setShowPanel(false);
        setReceivedContent(receivedValue.content);
      }
      if (receivedValue.hasOwnProperty("Questions")) {
        const temp = {
          en: receivedValue.Questions.map((k) => k.en),
          de: receivedValue.Questions.map((k) => k.de),
        };
        setQuestions(temp);
        setSelectedQuestions(receivedValue.Questions.map((k) => true));
      }
      if (receivedValue.hasOwnProperty("Topics")) {
        const temp = {
          en: receivedValue.Topics.map((k) => k.en),
          de: receivedValue.Topics.map((k) => k.de),
        };
        setTopics(temp);
        setSelectedTopics(receivedValue.Topics.map((k) => true));
      }
      if (receivedValue.hasOwnProperty("Forces")) {
        setSliderPresets(receivedValue.Forces);
        setSliderValues(receivedValue.Forces[1]);
      }
      if (receivedValue.hasOwnProperty("Facts")) {
        setContentFacts(receivedValue.Facts);
      }
      if (receivedValue.hasOwnProperty("Reset")) {
        if (receivedValue.Reset > resetValue) {
          setResetValue(receivedValue.Reset);
          handleReset();
        }
      }
      if (receivedValue.hasOwnProperty("LatestAnswers")) {
        setLatestAnswers(receivedValue.LatestAnswers);
      }
      if (receivedValue.hasOwnProperty("NeedHelp")) {
        setNeedHelpContent(receivedValue.NeedHelp);
      }
    }
  }, [lastMessage, sendMessage]);

  // handling sending message via websocket on state change
  useEffect(() => {
    let message = JSON.stringify({
      navigationState: navigationState,
      selectedQuestions: selectedQuestions,
      selectedTopics: selectedTopics,
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
      flyToButton: flyToButton,
      sliderValues: sliderValues,
      closeButton: closeButton,
    });
    sendMessage(message);
  }, [
    navigationState,
    selectedQuestions,
    selectedTopics,
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
    sliderValues,
    closeButton,
  ]);

  return (
    <div
      {...bind()}
      className="touch-none noSelect select-none font-futurium w-screen h-screen overflow-hidden flex justify-center items-end bg-opacity-20 p-12 relative"
    >
      <div className="absolute flex h-full top-12 gap-1 2xl:gap-4 left-12 flex-col justify-start items-start">
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
            i18n.language === "de" ? "ml-[185px]" : "ml-[215px]"
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
            i18n.language === "de" ? "ml-[385px]" : "ml-[395px]"
          } -mt-4`}
          _ref={latestAnswerMenuRef}
          showState={latestAnswerMenu}
        >
          <Menu
            type="answerPicker"
            state={selectedLatestAnswer}
            items={latestAnswers}
            onClickFunction={handleLatestAnswerSelected}
          />
        </MenuWrapper>
      </div>
      <div ref={sortByMenuRef} className="flex absolute top-12 mx-auto">
        <SortByBar
          state={selectedSortBy}
          setState={setSelectedSortBy}
          toggleEvent={toggleSliderMenu}
          itemsAmount={3}
          clickEvent={handleSortByClick}
        />
      </div>
      <MenuWrapper
        _ref={sliderMenuRef}
        showState={sliderMenu}
        className="flex absolute top-40 mx-auto"
      >
        <SliderMenu
          state={sliderValues}
          labels={[
            ["sliderMenu.A", "sliderMenu.Q"],
            ["sliderMenu.A", "sliderMenu.C"],
            ["sliderMenu.A", "sliderMenu.K"],
            ["sliderMenu.Q", "sliderMenu.C"],
            ["sliderMenu.Q", "sliderMenu.K"],
            ["sliderMenu.K", "sliderMenu.C"],
          ]}
          onChangeFunction={handleSliderChange}
        />
      </MenuWrapper>
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
                  handleCloseButton={handleCloseButton}
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
      <div className="flex flex-row justify-center items-center gap-4 absolute bottom-16 right-40">
        <div ref={needHelpRef}>
          <Button
            onClick={() => {
              setNeedHelpMenu((prev) => !prev);
            }}
          >
            <p>{t("needHelpButton")}</p>
          </Button>
        </div>
      </div>
      <MenuWrapper
        _ref={needHelpMenuRef}
        showState={needHelpMenu}
        className="flex absolute bottom-36 right-40"
      >
        <Menu type="needHelp" items={needHelpContent} />
      </MenuWrapper>
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
            setZoomMinusButton(true);
          }}
          onLeftRelease={() => {
            setZoomMinusButton(false);
          }}
          onRightClick={() => {
            setZoomPlusButton(true);
          }}
          onRightRelease={() => {
            setZoomPlusButton(false);
          }}
        />
      </div>
    </div>
  );
};

export default App;
