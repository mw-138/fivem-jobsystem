import BaseState from "@common/stateMachine/baseState";
import ModShopStateMachine, { ModShopStateEnum } from "../modShopStateMachine";
import { showAdvancedNotification } from "@common/helpers";
import { NotificationPictures } from "@common/enums";

export default class DeliveryCompleteState extends BaseState<ModShopStateEnum> {
  private _state: ModShopStateMachine;

  onEnter = (): void => {
    this._state = <ModShopStateMachine>this._stateMachine;

    showAdvancedNotification(
      `Great work! You have been paid $${this._state.cashPayout} Keep an eye out for more work!`,
      "LS Customs",
      "Vehicle Delivery",
      2,
      NotificationPictures.CHAR_LS_CUSTOMS,
      8,
      true
    );

    this._state.cashPayout = 0;

    SetVehicleDoorsLockedForAllPlayers(this._state.pickupVehicle, true);

    setTimeout(() => {
      this._stateMachine.setState(ModShopStateEnum.WaitingForCall);
    }, 5000);
  };

  onExit = (): void => {
    if (DoesEntityExist(this._state.pickupVehicle)) {
      DeleteVehicle(this._state.pickupVehicle);
      this._state.pickupVehicle = 0;
    }
  };

  onUpdate = (): void => {};
}
