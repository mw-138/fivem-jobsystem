import BaseState from "@common/stateMachine/baseState";
import ModShopStateMachine, { ModShopStateEnum } from "../modShopStateMachine";
import { getRandomNumber, teleportPlayer } from "@common/helpers";

export default class WaitingForCallState extends BaseState<ModShopStateEnum> {
  private _state: ModShopStateMachine;

  onEnter = (): void => {
    this._state = <ModShopStateMachine>this._stateMachine;
  };

  onExit = (): void => {};

  onUpdate = (): void => {
    const rand = getRandomNumber(1, 100);
    if (rand < 100) {
      this._stateMachine.setState(ModShopStateEnum.PickingUpVehicle);
    }
  };
}
