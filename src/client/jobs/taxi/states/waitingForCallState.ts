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
    this._state.showJobNotification("Keep an eye out for calls.");
  };

  onExit = () => {};

  onUpdate = () => {
    if (isPlayerInVehicle(this._state.taxiVehicle)) {
      const rand = getRandomNumber(1, 100);
      if (rand < 100) {
        this._stateMachine.setState(TaxiStateEnum.PickingUpPassengers);
      }
      showSubtitle("Wait for a call", 1000);
    } else {
      showSubtitle("Get into your taxi", 1000);
    }
  };
}
