import BaseState from "@common/stateMachine/baseState";
import TowStateMachine, { TowStateEnum } from "../towStateMachine";
import {
  showNotification,
  isWithinDistanceOfEntity,
  showAlert,
  showSubtitle,
  wasInteractJustReleased,
  showInteractMessage,
} from "@common/helpers";

export default class ReturningTruckState extends BaseState<TowStateEnum> {
  private _state: TowStateMachine;
  private _returnDelayInSeconds: number = 30;

  onEnter = (): void => {
    this._state = <TowStateMachine>this._stateMachine;
    this._state.showJobNotification(
      `You have ${this._returnDelayInSeconds} seconds to return your vehicle if you wish to stop working.`
    );
    setTimeout(() => {
      this._stateMachine.setState(TowStateEnum.WaitingForPickup);
    }, this._returnDelayInSeconds * 1000);
  };

  onExit = (): void => {};

  onUpdate = async (): Promise<void> => {
    const withinRangeOfTruckPed = isWithinDistanceOfEntity(
      this._state.signInPed,
      1.5
    );
    if (withinRangeOfTruckPed) {
      showInteractMessage("Return Truck");
      if (wasInteractJustReleased() && DoesEntityExist(this._state.truck)) {
        showNotification("You have returned the truck.", 2, true, true);
        DeleteVehicle(this._state.truck);
        this._state.truck = 0;
        this._stateMachine.setState(TowStateEnum.RetrievingTruck);
      }
      showSubtitle("Return ~y~tow truck~w~", 1000);
    } else {
      showSubtitle("Drive to ~y~drop-off~w~", 1000);
    }
  };
}
