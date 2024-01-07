import BaseState from "@common/stateMachine/baseState";
import TaxiStateMachine, { TaxiStateEnum } from "../taxiStateMachine";
import {
  getRandomNumber,
  isPlayerInVehicle,
  showAdvancedNotification,
  showSubtitle,
} from "@common/helpers";
import { NotificationPictures } from "@common/enums";

export default class WaitingForCallState extends BaseState<TaxiStateEnum> {
  private _state: TaxiStateMachine;

  onEnter = () => {
    this._state = <TaxiStateMachine>this._stateMachine;
    showAdvancedNotification(
      "Keep an eye out for calls.",
      "Downtown Cab Co.",
      "Passenger Pickup",
      2,
      NotificationPictures.CHAR_TAXI,
      8,
      true
    );
  };

  onExit = () => {};

  onUpdate = () => {
    if (isPlayerInVehicle(this._state.taxiVehicle)) {
      const rand = getRandomNumber(1, 100);
      if (rand < 100) {
        this._stateMachine.setState(TaxiStateEnum.PickingUpPassengers);
      }
      showSubtitle("Wait for call", 1000);
    } else {
      showSubtitle("Get into taxi", 1000);
    }
  };
}
