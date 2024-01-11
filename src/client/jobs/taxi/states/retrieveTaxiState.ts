import BaseState from "@common/stateMachine/baseState";
import TaxiStateMachine, { TaxiStateEnum } from "../taxiStateMachine";
import {
  isWithinDistanceOfEntity,
  drawMarker,
  showInteractMessage,
  isAreaClear,
  spawnVehicle,
  showNotification,
  spawnPed,
  wasInteractJustReleased,
  startProgressBar,
  showSubtitle,
  teleportPlayer,
} from "@common/helpers";

export default class RetrieveTaxiState extends BaseState<TaxiStateEnum> {
  private _state: TaxiStateMachine;

  private _pedSpawnCoords: number[] = [894.93, -179.12, 74.7];
  private _pedSpawnHeading: number = 237.16;
  private _taxiSpawnHeading: number = 236.37;
  private _blip: number = 0;

  onEnter = async (): Promise<void> => {
    this._state = <TaxiStateMachine>this._stateMachine;
    if (!DoesEntityExist(this._state.taxiPed)) {
      this._state.taxiPed = await spawnPed(
        2,
        "ig_mrk",
        this._pedSpawnCoords,
        this._pedSpawnHeading,
        true
      );
    }

    const [x, y, z] = GetEntityCoords(this._state.taxiPed, false);
    this._blip = AddBlipForCoord(x, y, z);
    SetBlipRoute(this._blip, true);

    teleportPlayer(this._pedSpawnCoords, this._pedSpawnHeading, false, 500);
  };

  onExit = (): void => {
    if (DoesBlipExist(this._blip)) {
      SetBlipRoute(this._blip, false);
      RemoveBlip(this._blip);
    }
  };

  onUpdate = async (): Promise<void> => {
    const withinRangeOfTaxiPed = isWithinDistanceOfEntity(
      this._state.taxiPed,
      1.5
    );
    if (withinRangeOfTaxiPed) {
      drawMarker(
        36,
        this._state.taxiSpawnCoords,
        [0, 0, 0],
        [0, 0, 0],
        [0.5, 0.5, 0.5],
        [255, 255, 0, 255],
        true,
        false,
        true
      );
      if (!DoesEntityExist(this._state.taxiVehicle)) {
        showInteractMessage("Retrieve taxi");
        if (wasInteractJustReleased()) {
          if (isAreaClear(this._state.taxiSpawnCoords)) {
            this._state.taxiVehicle = await spawnVehicle(
              "taxi",
              this._state.taxiSpawnCoords,
              this._taxiSpawnHeading
            );
            SetVehicleDirtLevel(this._state.taxiVehicle, 0);
            this._stateMachine.setState(TaxiStateEnum.WaitingForCall);
          } else {
            showNotification(
              "Cannot spawn taxi. Area is not clear",
              2,
              true,
              true
            );
          }
        }
      }
    } else {
      showSubtitle("Retrieve ~y~Taxi~w~", 1000);
    }
  };
}
