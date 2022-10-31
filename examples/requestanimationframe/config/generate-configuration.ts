import {
  addControllerToElement,
  broadcastEvent,
  ConfigurationFactory,
  EndableActionCreator,
  getControllerInstance,
  getQueryParams,
  IEngineConfiguration,
  removeControllerFromElement,
  requestAction,
  selectElement,
  setGlobalData,
  startAction,
  TimelineEventNames,
} from "eligius";
import fs from "fs";
import path from "path";

const factory = new ConfigurationFactory();
factory
  .init("nl-NL")
  .addLanguage("nl-NL", "Nederlands")
  .addLanguage("en-GB", "English")
  .setLayoutTemplate("template:layoutTemplate")
  .setContainerSelector("#ct-container")
  .addTimeline(
    "what-is-eligius",
    "animation",
    100,
    false,
    ".main-presentation"
  );

const settingsEditor = factory.editTimelineProviderSettings();
settingsEditor
  .addProvider("animation")
  .setSystemName("RequestAnimationFrameTimelineProvider")
  .setVendor("eligius");

let actionCreator: EndableActionCreator = factory.createAction(
  "BroadcastPlayControlRequest"
) as EndableActionCreator;
actionCreator.addStartOperationByType(broadcastEvent, {});

actionCreator = factory.createAction("AddPlayControl") as EndableActionCreator;

actionCreator
  .addStartOperationByType(selectElement, {})
  .addStartOperationByType(getControllerInstance, {
    systemName: "EventListenerController",
  })
  .addStartOperationByType(addControllerToElement, {
    eventName: "click",
    actions: ["BroadcastPlayControlRequest"],
  } as any)
  .addEndOperationByType(selectElement, {})
  .addEndOperationByType(removeControllerFromElement, {
    controllerName: "EventListenerController",
  });

const initActionCreator = factory.createInitAction("GetUserName");
initActionCreator
  .addStartOperationByType(getQueryParams, {
    defaultValues: { username: "guest" },
  })
  .addStartOperationByType(setGlobalData, { properties: ["queryParams"] })
  .next()
  .createInitAction("RewindControl")
  .addStartOperationByType(requestAction, { systemName: "AddPlayControl" })
  .addStartOperationByType(startAction, {
    actionOperationData: {
      selector: "[data-id='rewind']",
      actionOperationData: {
        eventName: TimelineEventNames.SEEK_REQUEST,
        eventArgs: [0],
      },
    },
  })
  .next()
  .createInitAction("PlayControl")
  .addStartOperationByType(requestAction, { systemName: "AddPlayControl" })
  .addStartOperationByType(startAction, {
    actionOperationData: {
      selector: "[data-id='play']",
      actionOperationData: {
        eventName: TimelineEventNames.PLAY_REQUEST,
      },
    },
  })
  .next()
  .createInitAction("PlayControl")
  .addStartOperationByType(requestAction, { systemName: "AddPlayControl" })
  .addStartOperationByType(startAction, {
    actionOperationData: {
      selector: "[data-id='pause']",
      actionOperationData: {
        eventName: TimelineEventNames.PAUSE_REQUEST,
      },
    },
  });

let configuration: IEngineConfiguration | undefined;
factory.getConfiguration((config) => {
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
