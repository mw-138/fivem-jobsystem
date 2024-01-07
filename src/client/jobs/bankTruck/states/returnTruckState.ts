import BaseState from "@common/stateMachine/baseState";
import BankTruckStateMachine, {
  BankTruckStateEnum,
} from "../bankTruckStateMachine";
import { MarkerTypes, NotificationPictures } from "@common/enums";
import {
  drawMarker,
  isPlayerInVehicle,
  isWithinDistanceOfPoint,
  setBlipLabel,
  showAdvancedNotification,
  showAlert,
  showSubtitle,
} from "@common/helpers";

export default class ReturnTruckState extends BaseState<BankTruckStateEnum> {
  private _state: BankTruckStateMachine;
  private _dropOffCoords: number[] = [-19.8, -705.51, 32.34];
  private _blip: number;

  onEnter = async (): Promise<void> => {
    this._state = <BankTruckStateMachine>this._stateMachine;
    this._state.showJobNotification("Return your truck.");

    const [x, y, z] = this._dropOffCoords;
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
    const withinRangeOfCoords = isWithinDistanceOfPoint(this._dropOffCoords, 5);
    const shouldDrawMarker = isWithinDistanceOfPoint(this._dropOffCoords, 40);

    if (shouldDrawMarker) {
      drawMarker(
        MarkerTypes.MarkerTypeCarSymbol,
        this._dropOffCoords,
        [0, 0, 0],
        [0, 0, 0],
        [1, 1, 1],
        [255, 0, 0, 255],
        false,
        true,
        false
      );
    }

    if (withinRangeOfCoords) {
      if (isPlayerInVehicle(this._state.truck)) {
        showSubtitle("Exit Truck", 1000);
      } else {
        this._state.showJobNotification(
          `Great job! You have been paid $${this._state.payout}`
        );
        if (DoesEntityExist(this._state.truck)) {
          DeleteVehicle(this._state.truck);
        }
        this._state.setState(BankTruckStateEnum.SignIn);
      }
    } else {
      showSubtitle("Return the truck to ~y~Union Repository~w~.", 1000);
    }
  };
}
