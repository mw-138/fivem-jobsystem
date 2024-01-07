import BaseState from "@common/stateMachine/baseState";
import ModShopStateMachine, { ModShopStateEnum } from "../modShopStateMachine";
import {
  drawMarker,
  getLocalCoords,
  isPlayerInVehicle,
  isWithinDistanceOfPoint,
  showAdvancedNotification,
  showAlert,
  showInteractMessage,
  showSubtitle,
  teleportPlayer,
} from "@common/helpers";
import { MarkerTypes, NotificationPictures } from "@common/enums";

export default class DropOffVehicleState extends BaseState<ModShopStateEnum> {
  private _state: ModShopStateMachine;
  private _blip: number;

  onEnter = (): void => {
    this._state = <ModShopStateMachine>this._stateMachine;

    showAdvancedNotification(
      "Come back to the shop and park it up!",
      "LS Customs",
      "Vehicle Drop-off",
      2,
      NotificationPictures.CHAR_LS_CUSTOMS,
      8,
      true
    );

    const [x, y, z] = this._state.dropOffCoords;

    this._blip = AddBlipForCoord(x, y, z);
    SetBlipRoute(this._blip, true);
  };

  onExit = (): void => {
    if (DoesBlipExist(this._blip)) {
      SetBlipRoute(this._blip, false);
      RemoveBlip(this._blip);
    }
  };

  onUpdate = (): void => {
    const withinRangeOfDropOff = isWithinDistanceOfPoint(
      this._state.dropOffCoords,
      2
    );
    const shouldDrawMarker = isWithinDistanceOfPoint(
      this._state.dropOffCoords,
      30
    );

    if (shouldDrawMarker) {
      drawMarker(
        MarkerTypes.MarkerTypeCarSymbol,
        this._state.dropOffCoords,
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
      if (!isPlayerInVehicle(this._state.pickupVehicle)) {
        this._stateMachine.setState(ModShopStateEnum.WorkOnVehicle);
      }
      showSubtitle("Exit vehicle", 1000);
    } else {
      showSubtitle("Drive to ~y~drop off~w~", 1000);
    }
  };
}
