import BaseState from "@common/stateMachine/baseState";
import ModShopStateMachine, { ModShopStateEnum } from "../modShopStateMachine";
import {
  drawMarker,
  getLocalCoords,
  isPlayerInVehicle,
  isWithinDistanceOfPoint,
  setBlipLabel,
  showAdvancedNotification,
  showAlert,
  showInteractMessage,
  showSubtitle,
  teleportPlayer,
} from "@common/helpers";
import { MarkerTypes, NotificationPictures } from "@common/enums";

export default class VehicleWorkDoneState extends BaseState<ModShopStateEnum> {
  private _state: ModShopStateMachine;
  private _blip: number;

  onEnter = (): void => {
    this._state = <ModShopStateMachine>this._stateMachine;
    const pickupCoords = this._state.pickupVehicleCoords;

    showAdvancedNotification(
      "Now take the vehicle back to the owner.",
      "LS Customs",
      "Vehicle Delivery",
      2,
      NotificationPictures.CHAR_LS_CUSTOMS,
      8,
      true
    );

    const [x, y, z] = pickupCoords;
    this._blip = AddBlipForCoord(x, y, z);
    SetBlipRoute(this._blip, true);

    // teleportPlayer([x, y, z], 0, true, 500);
    // TaskLeaveVehicle(PlayerPedId(), vehicle, 0);
  };

  onExit = (): void => {
    if (DoesBlipExist(this._blip)) {
      SetBlipRoute(this._blip, false);
      RemoveBlip(this._blip);
    }
  };

  onUpdate = (): void => {
    const [vehicle, dropOffCoords] = [
      this._state.pickupVehicle,
      this._state.pickupVehicleCoords,
    ];
    const withinRangeOfDropOff = isWithinDistanceOfPoint(dropOffCoords, 2);
    const shouldDrawMarker = isWithinDistanceOfPoint(dropOffCoords, 30);
    if (shouldDrawMarker) {
      drawMarker(
        MarkerTypes.MarkerTypeCarSymbol,
        dropOffCoords,
        [0, 0, 0],
        [0, 0, 0],
        [1, 1, 1],
        [255, 0, 0, 255],
        true,
        true,
        true
      );
    }
    if (withinRangeOfDropOff) {
      showSubtitle("Exit vehicle", 1000);
      if (!isPlayerInVehicle(vehicle)) {
        this._stateMachine.setState(ModShopStateEnum.DeliveryComplete);
      }
    } else {
      showSubtitle("Drive to ~y~drop-off~w~", 1000);
    }
  };
}
