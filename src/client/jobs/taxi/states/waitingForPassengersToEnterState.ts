import BaseState from "@common/stateMachine/baseState";
import TaxiStateMachine, { TaxiStateEnum } from "../taxiStateMachine";
import { showSubtitle } from "@common/helpers";

export default class WaitingForPassengersToEnterState extends BaseState<TaxiStateEnum> {
  private _state: TaxiStateMachine;
  private _blips: number[] = [];

  onEnter = async (): Promise<void> => {
    this._state = <TaxiStateMachine>this._stateMachine;
    this._state.passengers.forEach((ped) => {
      const blip = AddBlipForEntity(ped);
      SetBlipSprite(blip, 270);
      SetBlipColour(blip, 69);
      SetBlipScale(blip, 0.5);
      this._blips.push(blip);
    });
  };

  onExit = (): void => {
    this._blips.forEach((blip) => {
      if (DoesBlipExist(blip)) {
        RemoveBlip(blip);
      }
    });
  };

  onUpdate = async (): Promise<void> => {
    const allInVehicle = this._state.passengers.every((ped) =>
      IsPedInVehicle(ped, this._state.taxiVehicle, false)
    );
    if (allInVehicle) {
      this._stateMachine.setState(TaxiStateEnum.DropOffPassengers);
    } else {
      showSubtitle("Wait for passengers to enter taxi", 1000);
    }
  };
}
