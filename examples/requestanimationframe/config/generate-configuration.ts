import {
  addControllerToElement,
  clearElement,
  createElement,
  endLoop,
  getControllerInstance,
  getQueryParams,
  IEngineConfiguration,
  removeControllerFromElement,
  removeElement,
  selectElement,
  setElementContent,
  setGlobalData,
  setOperationData,
  startLoop,
  TimelineEventNames,
} from "eligius";
import fs from "fs";
import path from "path";
import { customFactory, TIMELINE_TITLE } from "./custom-factory";

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
    attributes: { "data-language-selector": true, defaultValue: "nl-NL" },
  })
  .addStartOperationByType(setElementContent, { insertionType: "prepend" })
  .addStartOperationByType(selectElement, {
    selector: "[data-language-selector=true]",
  })
  .addStartOperationByType(startLoop, {
    collection: "config:availableLanguages",
  })
  .addStartOperationByType(createElement, {
    elementName: "option",
    attributes: {
      value: "operationdata.currentItem.languageCode",
    },
    text: "operationdata.currentItem.label",
  })
  .addStartOperationByType(setElementContent, { insertionType: "append" })
  .addStartOperationByType(endLoop, {})
  .addStartOperationByType(getControllerInstance, {
    systemName: "EventListenerController",
  })
  .addStartOperationByType(addControllerToElement, {
    eventName: "change",
    actions: ["BroadcastLanguageChange"],
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
  .addDuration(0, 10)
  .addStartOperationByType(selectElement, { selector: ".main-presentation" })
  .addStartOperationByType(setElementContent, {
    template: '<div class="intro-text"></div>',
  })
  .addEndOperationByType(selectElement, { selector: ".intro-text" })
  .addEndOperationByType(removeElement, {});

customFactory.addTextToElement(
  "AddIntro",
  TIMELINE_TITLE,
  { start: 0, end: 10 },
  {
    selector: ".intro-text",
    template: "<div data-text-intro></div>",
    labelSelector: "[data-text-intro]",
    labelId: "introText1",
  }
);

customFactory.addTextToElement(
  "AddIntro",
  TIMELINE_TITLE,
  { start: 3, end: 10 },
  {
    selector: ".intro-text",
    template: "<div data-text-intro2></div>",
    labelSelector: "[data-text-intro2]",
    labelId: "introText2",
  }
);

// Get the final configuration and save it to file
let configuration: IEngineConfiguration | undefined;
customFactory.getConfiguration((config) => {
  configuration = config;
  return undefined;
});

fs.writeFileSync(
  path.resolve(__dirname, "../src/config-data.json"),
  JSON.stringify(configuration, null, 2),
  {
    encoding: "utf-8",
  }
);
