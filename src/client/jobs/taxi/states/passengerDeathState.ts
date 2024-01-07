import BaseState from "@common/stateMachine/baseState";
import TaxiStateMachine, { TaxiStateEnum } from "../taxiStateMachine";
import { showAdvancedNotification } from "@common/helpers";
import { NotificationPictures } from "@common/enums";

export default class PassengerDeathState extends BaseState<TaxiStateEnum> {
  private _state: TaxiStateMachine;

  onEnter = async (): Promise<void> => {
    this._state = <TaxiStateMachine>this._stateMachine;

    showAdvancedNotification(
      "I just got a call that one of your passengers died!? How!? Return the vehicle immediately!",
      "Downtown Cab Co.",
      "Passenger Pickup",
      2,
      NotificationPictures.CHAR_TAXI,
      8,
      true
    );

    this._stateMachine.setState(TaxiStateEnum.ReturnTaxi);
  };

  onExit = (): void => {};

  onUpdate = async (): Promise<void> => {};
}
