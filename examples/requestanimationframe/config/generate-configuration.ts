import {
  addClass,
  addControllerToElement,
  broadcastEvent,
  clearElement,
  clearOperationData,
  createElement,
  endLoop,
  endWhen,
  getControllerInstance,
  getQueryParams,
  otherwise,
  removeControllerFromElement,
  removeElement,
  removePropertiesFromOperationData,
  selectElement,
  setElementContent,
  setGlobalData,
  setOperationData,
  startLoop,
  TimelineEventNames,
  when,
} from "eligius";
import fs from "fs";
import path from "path";
import {
  ACTION_TEMPLATE_NAMES,
  customFactory,
  TIMELINE_TITLE,
} from "./custom-factory";

// START: Initialization actions

let initActionCreator = customFactory.createInitAction("GetUserName");
initActionCreator
  .addStartOperationByType(getQueryParams, {
    defaultValues: { username: "guest" },
  })
  .addStartOperationByType(setGlobalData, { properties: ["queryParams"] });

initActionCreator = customFactory.createInitAction("MainTitleLabel");
initActionCreator
  .addStartOperationByType(selectElement, { selector: "#main-title" })
  .addStartOperationByType(getControllerInstance, {
    systemName: "LabelController",
  })
  .addStartOperationByType(addControllerToElement, {
    labelId: "mainTitle",
  } as any)
  .addEndOperationByType(selectElement, { selector: "#main-title" })
  .addEndOperationByType(removeControllerFromElement, {
    controllerName: "LabelController",
  });

customFactory.addPlayControl("RewindControl", {
  selector: "[data-id='rewind']",
  actionOperationData: {
    eventName: TimelineEventNames.SEEK_REQUEST,
    eventArgs: [0],
  },
});
customFactory.addPlayControl("PlayControl", {
  selector: "[data-id='play']",
  actionOperationData: {
    eventName: TimelineEventNames.PLAY_REQUEST,
  },
});
customFactory.addPlayControl("PauseControl", {
  selector: "[data-id='pause']",
  actionOperationData: {
    eventName: TimelineEventNames.PAUSE_REQUEST,
  },
});

initActionCreator = customFactory.createInitAction("ProgressbarSetup");
initActionCreator
  .addStartOperationByType(selectElement, { selector: "#progress-text" })
  .addStartOperationByType(setOperationData, {
    properties: { textElement: "operationData.selectedElement" },
  })
  .addStartOperationByType(selectElement, { selector: "#progress" })
  .addStartOperationByType(getControllerInstance, {
    systemName: "ProgressbarController",
  })
  .addStartOperationByType(addControllerToElement, {})
  .addEndOperationByType(selectElement, { selector: "#progress" })
  .addEndOperationByType(removeControllerFromElement, {
    controllerName: "ProgressbarController",
  });

initActionCreator = customFactory.createInitAction("LanguageSelection");
initActionCreator
  .addStartOperationByType(selectElement, {
    selector: "[data-selector-container=true]",
  })
  .addStartOperationByType(createElement, {
    elementName: "select",
    attributes: { "data-language-selector": true, defaultValue: "en-US" },
  })
  .addStartOperationByType(setElementContent, { insertionType: "prepend" })
  .addStartOperationByType(selectElement, {
    selector: "[data-language-selector=true]",
  })
  .addStartOperationByType(startLoop, {
    collection: "config:availableLanguages",
  })
  .addStartOperationByType(when, {
    expression:
      "context.parent.currentItem.languageCode==globaldata.defaultLanguage",
  })
  .addStartOperationByType(setOperationData, {
    properties: {
      isSelectedItem: true,
    },
  })
  .addStartOperationByType(otherwise, {})
  .addStartOperationByType(removePropertiesFromOperationData, {
    propertyNames: ["isSelectedItem"],
  })
  .addStartOperationByType(endWhen, {})
  .addStartOperationByType(createElement, {
    elementName: "option",
    attributes: {
      value: "context.currentItem.languageCode",
      selected: "operationData.isSelectedItem",
    },
    text: "context.currentItem.label",
  })
  .addStartOperationByType(setElementContent, { insertionType: "append" })
  .addStartOperationByType(endLoop, {})
  .addStartOperationByType(getControllerInstance, {
    systemName: "EventListenerController",
  })
  .addStartOperationByType(addControllerToElement, {
    eventName: "change",
    actions: [ACTION_TEMPLATE_NAMES.BroadcastLanguageChange],
  } as any)
  .addEndOperationByType(selectElement, {
    selector: "[data-language-selector=true]",
  })
  .addEndOperationByType(removeControllerFromElement, {
    controllerName: "EventListenerController",
  })
  .addEndOperationByType(selectElement, {
    selector: "[data-selector-container=true]",
  })
  .addEndOperationByType(clearElement, {});

initActionCreator = customFactory.createInitAction("SubtitleDisplay");
initActionCreator
  .addStartOperationByType(selectElement, { selector: "#subtitles" })
  .addStartOperationByType(getControllerInstance, {
    systemName: "SubtitlesController",
  })
  .addStartOperationByType(addControllerToElement, {
    language: "config:language",
    subtitleData: "json:testSubtitles",
  } as any)
  .addEndOperationByType(selectElement, { selector: "#subtitles" })
  .addEndOperationByType(removeControllerFromElement, {
    controllerName: "SubtitlesController",
  });

// END: Initialization actions

// START: Timeline actions

let timelineActionCreator = customFactory.createTimelineAction(
  TIMELINE_TITLE,
  "AddIntroContainer"
);
timelineActionCreator
  .addDuration(0, 19)
  .addStartOperationByType(selectElement, { selector: ".main-presentation" })
  .addStartOperationByType(setElementContent, {
    template: '<div class="intro-text"></div>',
  })
  .addEndOperationByType(selectElement, { selector: ".intro-text" })
  .addEndOperationByType(removeElement, {});

customFactory.addTextToElement(
  "AddIntro1",
  TIMELINE_TITLE,
  { start: 0, end: 9 },
  {
    selector: ".intro-text",
    template: "<div data-text-intro></div>",
    labelSelector: "[data-text-intro]",
    labelId: "introText1",
  }
);

customFactory.addTextToElement(
  "AddIntro2",
  TIMELINE_TITLE,
  { start: 3, end: 9 },
  {
    selector: ".intro-text",
    template: '<div data-text-intro2 class="intro2-text"></div>',
    labelSelector: "[data-text-intro2]",
    labelId: "introText2",
  }
);

customFactory.addTextToElement(
  "AddIntro3",
  TIMELINE_TITLE,
  { start: 6, end: 12 },
  {
    selector: ".intro-text",
    template: '<div data-text-intro3 class="intro3-text"></div>',
    labelSelector: "[data-text-intro3]",
    labelId: "introText3",
  }
);

customFactory
  .createTimelineAction(TIMELINE_TITLE, "CenterAndGrowIntro3")
  .addDuration(8, 12)
  .addStartOperationByType(selectElement, { selector: "[data-text-intro3]" })
  .addStartOperationByType(addClass, { className: "center-and-grow" });

customFactory.addTextToElement(
  "AddIntro4",
  TIMELINE_TITLE,
  { start: 12, end: 18 },
  {
    selector: ".intro-text",
    template: '<div data-text-intro4 class="intro4-text bigger-intro"></div>',
    labelSelector: "[data-text-intro4]",
    labelId: "introText4",
  }
);

customFactory.addTextToElement(
  "AddIntro5",
  TIMELINE_TITLE,
  { start: 15, end: 18 },
  {
    selector: ".intro-text",
    template: '<div data-text-intro5 class="intro5-text bigger-intro"></div>',
    labelSelector: "[data-text-intro5]",
    labelId: "introText5",
  }
);

customFactory
  .createTimelineAction(TIMELINE_TITLE, "ShowNameInput")
  .addDuration(18, 19)
  .addStartOperationByType(broadcastEvent, {
    eventName: TimelineEventNames.PAUSE_REQUEST,
  })
  .addStartOperationByType(selectElement, { selector: ".intro-text" })
  .addStartOperationByType(setElementContent, {
    insertionType: "overwrite",
    template: '<div class="input-container"></div>',
  })
  .addStartOperationByType(selectElement, { selector: ".input-container" })
  .addStartOperationByType(createElement, {
    elementName: "input",
    attributes: {
      class: "user-name-input",
      type: "text",
      value: "globaldata.queryParams.username",
    },
  })
  .addStartOperationByType(setElementContent, { insertionType: "append" })
  .addStartOperationByType(selectElement, { selector: ".user-name-input" })
  .addStartOperationByType(getControllerInstance, {
    systemName: "LabelController",
  })
  .addStartOperationByType(addControllerToElement, {
    labelId: "usernameInputPlaceholder",
    attributeName: "placeholder",
  })
  .addStartOperationByType(selectElement, { selector: ".input-container" })
  .addStartOperationByType(createElement, {
    elementName: "button",
    attributes: {
      type: "button",
      class: "tell-name-button",
    },
  })
  .addStartOperationByType(setElementContent, { insertionType: "append" })
  .addStartOperationByType(clearOperationData, {})
  .addStartOperationByType(selectElement, { selector: ".tell-name-button" })
  .addStartOperationByType(getControllerInstance, {
    systemName: "LabelController",
  })
  .addStartOperationByType(addControllerToElement, {
    labelId: "usernameSubmitButton",
  } as any)
  .addStartOperationByType(getControllerInstance, {
    systemName: "EventListenerController",
  })
  .addStartOperationByType(addControllerToElement, {
    eventName: "click",
    actions: [ACTION_TEMPLATE_NAMES.SetUsernameFromInput],
    actionOperationData: {
      inputSelector: ".user-name-input",
    },
  } as any)
  .addEndOperationByType(selectElement, { selector: ".user-name-input" })
  .addEndOperationByType(removeControllerFromElement, {
    controllerName: "LabelController",
  })
  .addEndOperationByType(selectElement, { selector: ".tell-name-button" })
  .addEndOperationByType(removeControllerFromElement, {
    controllerName: "LabelController",
  })
  .addEndOperationByType(removeControllerFromElement, {
    controllerName: "EventListenerController",
  })
  .addEndOperationByType(selectElement, { selector: ".input-container" })
  .addEndOperationByType(removeElement, {});

// Get the final configuration and save it to file
const configuration = customFactory.getConfiguration();

fs.writeFileSync(
  path.resolve(__dirname, "../src/config-data.json"),
  JSON.stringify(configuration, null, 2),
  {
    encoding: "utf-8",
  }
);
