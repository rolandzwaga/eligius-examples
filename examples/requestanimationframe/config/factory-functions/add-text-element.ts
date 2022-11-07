import {
  ConfigurationFactory,
  endAction,
  IDuration,
  requestAction,
  startAction,
} from "eligius";
import { ACTION_TEMPLATE_NAMES } from "../custom-factory";

export function addTextToElement(
  this: ConfigurationFactory,
  actionName: string,
  uri: string,
  duration: IDuration,
  actionOperationData: {
    selector: string;
    template: string;
    labelSelector: string;
    labelId: string;
  }
) {
  this.createTimelineAction(uri, actionName)
    .addStartOperationByType(requestAction, {
      systemName: ACTION_TEMPLATE_NAMES.AppendTextToElement,
    })
    .addStartOperationByType(startAction, { actionOperationData })
    .addEndOperationByType(requestAction, {
      systemName: ACTION_TEMPLATE_NAMES.AppendTextToElement,
    })
    .addEndOperationByType(endAction, {
      actionOperationData: { selector: actionOperationData.labelSelector },
    })
    .addDuration(duration.start, duration.end);
}
