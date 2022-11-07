import {
  addControllerToElement,
  animateWithClass,
  broadcastEvent,
  clearElement,
  ConfigurationFactory,
  EndableActionCreator,
  getControllerInstance,
  log,
  removeClass,
  removeControllerFromElement,
  selectElement,
  setElementContent,
  setOperationData,
  TimelineEventNames,
} from "eligius";
import * as factoryFunctions from "./factory-functions";

export const ACTION_TEMPLATE_NAMES = {
  BroadcastEvent: "BroadcastEvent",
  AddPlayControl: "AddPlayControl",
  AppendTextToElement: "AppendTextToElement",
  BroadcastLanguageChange: "BroadcastLanguageChange",
};

export const TIMELINE_TITLE = "what-is-eligius";
export const TIMELINE_LENGTH_IN_SECS = 100;

const factory = new ConfigurationFactory()
  .init("en-US")
  .addLanguage("en-US", "English")
  .addLanguage("nl-NL", "Nederlands")
  .setLayoutTemplate("template:layoutTemplate")
  .setContainerSelector("#ct-container")
  .addTimeline(
    TIMELINE_TITLE,
    "animation",
    TIMELINE_LENGTH_IN_SECS,
    false,
    ".main-presentation"
  )
  .editTimelineProviderSettings()
  .addProvider("animation")
  .setSystemName("RequestAnimationFrameTimelineProvider")
  .setVendor("eligius")
  .end();

// Start: Action templates

let actionCreator: EndableActionCreator = factory.createAction(
  ACTION_TEMPLATE_NAMES.BroadcastEvent
);
actionCreator.addStartOperationByType(broadcastEvent, {});

actionCreator = factory.createAction(ACTION_TEMPLATE_NAMES.AddPlayControl);
actionCreator
  // start:
  // select the button element
  .addStartOperationByType(selectElement, {})
  // create an event listener controller
  .addStartOperationByType(getControllerInstance, {
    systemName: "EventListenerController",
  })
  // attach the controller to the button, and trigger the BroadcastPlayControlRequest event on click
  .addStartOperationByType(addControllerToElement, {
    eventName: "click",
    actions: [ACTION_TEMPLATE_NAMES.BroadcastEvent],
  } as any)
  // end:
  // select the button element
  .addEndOperationByType(selectElement, {})
  // detach the controller
  .addEndOperationByType(removeControllerFromElement, {
    controllerName: "EventListenerController",
  });

actionCreator = factory.createAction(ACTION_TEMPLATE_NAMES.AppendTextToElement);
actionCreator
  .addStartOperationByType(selectElement, {})
  .addStartOperationByType(setElementContent, { insertionType: "append" })
  .addStartOperationByType(setOperationData, {
    properties: { selector: "operationdata.labelSelector" },
  })
  .addStartOperationByType(selectElement, {})
  .addStartOperationByType(getControllerInstance, {
    systemName: "LabelController",
  })
  .addStartOperationByType(addControllerToElement, {})
  .addStartOperationByType(animateWithClass, { className: "fade-in" })
  .addStartOperationByType(removeClass, { className: "fade-in" })
  .addEndOperationByType(selectElement, {})
  .addEndOperationByType(animateWithClass, { className: "fade-out" })
  .addEndOperationByType(removeControllerFromElement, {})
  .addEndOperationByType(clearElement, {});

actionCreator = factory.createAction(
  ACTION_TEMPLATE_NAMES.BroadcastLanguageChange
);
actionCreator
  .addStartOperationByType(log, {})
  .addStartOperationByType(broadcastEvent, {
    eventName: TimelineEventNames.LANGUAGE_CHANGE,
    eventArgs: ["operationData.targetValue"],
  })
  .addStartOperationByType(log, {});

// End: Action templates

// START LABELS:

factory
  .addLabels("mainTitle", {
    "en-US": "Eligius de-mystified",
    "nl-NL": "Eligius ontmystificeerd",
  })
  .addLabels("introText1", {
    "en-US": "So, what exactly is Eligius?",
    "nl-NL": "Dus, wat is Eligius precies?",
  })
  .addLabels("introText2", {
    "en-US": "Well, in short, it's a story telling engine!",
    "nl-NL": "Nouja, kort gezegd, het is een verhalenmachine!",
  })
  .addLabels("introText3", {
    "en-US": "A story telling engine?",
    "nl-NL": "Een verhalenmachine?",
  });

// END LABELS

const customFactory = ConfigurationFactory.extendMultiple(
  factory,
  factoryFunctions
);

export { customFactory };
