import BaseState from "@common/stateMachine/baseState";
import TowStateMachine, { TowStateEnum } from "../towStateMachine";
import {
  isPlayerInVehicle,
  showAdvancedNotification,
  showSubtitle,
} from "@common/helpers";
import { NotificationPictures } from "@common/enums";

export default class WaitingForPickupState extends BaseState<TowStateEnum> {
  private _state: TowStateMachine;

  onEnter = (): void => {
    this._state = <TowStateMachine>this._stateMachine;
    showAdvancedNotification(
      "Keep an eye out, you should receive a ping soon.",
      "Towing Impound Lot",
      "Vehicle Pickup",
      2,
      NotificationPictures.CHAR_PROPERTY_TOWING_IMPOUND,
      8,
      true
    );
  };

  onExit = (): void => {};

  onUpdate = async (): Promise<void> => {
    if (isPlayerInVehicle(this._state.truck)) {
      const rand = Math.ceil(Math.random() * 100);
      if (rand < 20) {
        this._stateMachine.setState(TowStateEnum.PickingUpVehicle);
      }
      showSubtitle("Wait for calls", 1000);
    } else {
      showSubtitle("Get back inside your tow truck", 1000);
    }
  };
}
