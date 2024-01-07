import BaseState from "@common/stateMachine/baseState";
import BankTruckStateMachine, {
  BankTruckStateEnum,
} from "../bankTruckStateMachine";
import { NotificationPictures } from "@common/enums";
import {
  getRandomAreaCoord,
  getRandomMapCoord,
  getRandomRoadSidePointNearPlayer,
  isWithinDistanceOfEntity,
  setBlipLabel,
  showAdvancedNotification,
  showInteractMessage,
  showNotification,
  spawnPed,
  wasInteractJustReleased,
} from "@common/helpers";

export default class DeliverBagsToBankState extends BaseState<BankTruckStateEnum> {
  private _state: BankTruckStateMachine;

  private _ped: number;
  private _pedCoords: number[] = [259.6, 218.01, 106.29];
  private _pedHeading: number = 110.88;
  private _blip: number;

  onEnter = async (): Promise<void> => {
    this._state = <BankTruckStateMachine>this._stateMachine;

    this._state.showJobNotification(
      "Drive your truck to the vault to deliver the money bags."
    );

    this._ped = await spawnPed(
      2,
      "ig_bankman",
      this._pedCoords,
      this._pedHeading,
      true
    );

    const [x, y, z] = this._pedCoords;
    this._blip = AddBlipForCoord(x, y, z);
    SetBlipRoute(this._blip, true);
  };

  onExit = (): void => {
    if (DoesEntityExist(this._ped)) {
      DeletePed(this._ped);
    }
    if (DoesBlipExist(this._blip)) {
      SetBlipRoute(this._blip, false);
      RemoveBlip(this._blip);
    }
  };

  onUpdate = (): void => {
    const canInteractWithPed = isWithinDistanceOfEntity(this._ped, 2);
    if (canInteractWithPed) {
      showInteractMessage("Deliver Money Bags");
      if (wasInteractJustReleased()) {
        showNotification("Money Bags Delivered", 2, true, true);
        this._state.setState(BankTruckStateEnum.ReturnTruck);
      }
    }
  };
}
