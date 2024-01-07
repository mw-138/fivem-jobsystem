import BaseState from "@common/stateMachine/baseState";
import TaxiStateMachine, { TaxiStateEnum } from "../taxiStateMachine";
import {
  drawMarker,
  isWithinDistanceOfPoint,
  showAdvancedNotification,
  showSubtitle,
} from "@common/helpers";
import { MarkerTypes, NotificationPictures } from "@common/enums";

export default class ReturnTaxiState extends BaseState<TaxiStateEnum> {
  private _state: TaxiStateMachine;
  private _blip: number;

  onEnter = async (): Promise<void> => {
    this._state = <TaxiStateMachine>this._stateMachine;

    const [x, y, z] = this._state.taxiSpawnCoords;
    this._blip = AddBlipForCoord(x, y, z);
    SetBlipRoute(this._blip, true);
  };

  onExit = (): void => {
    if (DoesBlipExist(this._blip)) {
      SetBlipRoute(this._blip, false);
      RemoveBlip(this._blip);
    }
  };

  onUpdate = async (): Promise<void> => {
    const taxi = this._state.taxiVehicle;
    const withinRangeOfDropOff = isWithinDistanceOfPoint(
      this._state.taxiSpawnCoords,
      2
    );
    const shouldDrawMarker = isWithinDistanceOfPoint(
      this._state.taxiSpawnCoords,
      20
    );

    if (shouldDrawMarker) {
      drawMarker(
        MarkerTypes.MarkerTypeCarSymbol,
        this._state.taxiSpawnCoords,
        [0, 0, 0],
        [0, 0, 0],
        [1, 1, 1],
        [255, 0, 0, 255],
        true,
        true,
        true
      );
    }

    if (GetVehicleEngineHealth(taxi) < 0) {
      showAdvancedNotification(
        "Somehow you managed to destroy your cab. I'm fining you for damages.",
        "Downtown Cab Co.",
        "Passenger Pickup",
        2,
        NotificationPictures.CHAR_TAXI,
        8,
        true
      );
      this._stateMachine.setState(TaxiStateEnum.RetrieveTaxi);
    }
    if (withinRangeOfDropOff) {
      showSubtitle("Exit vehicle", 1000);
      setTimeout(() => {
        DeleteVehicle(taxi);
      }, 5000);
      this._stateMachine.setState(TaxiStateEnum.RetrieveTaxi);
    } else {
      showSubtitle("Drive to vehicle ~y~drop-off~w~", 1000);
    }
  };
}
