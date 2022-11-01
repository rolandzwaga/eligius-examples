import {
  ConfigurationFactory,
  endAction,
  requestAction,
  startAction,
} from "eligius";

export const addPlayControl = function (
  this: ConfigurationFactory,
  actionName: string,
  actionOperationData: {
    selector: string;
    actionOperationData: {
      eventName: string;
      eventArgs?: any[];
    };
  }
) {
  this.createInitAction(actionName)
    .addStartOperationByType(requestAction, { systemName: "AddPlayControl" })
    .addStartOperationByType(startAction, {
      actionOperationData,
    })
    .addEndOperationByType(requestAction, { systemName: "AddPlayControl" })
    .addEndOperationByType(endAction, {
      actionOperationData: {
        selector: actionOperationData.selector,
      },
    });
};
