import BaseState from "@common/stateMachine/baseState";
import TowStateMachine, { TowStateEnum } from "../towStateMachine";
import {
  isWithinDistanceOfEntity,
  drawMarker,
  showInteractMessage,
  showNotification,
  isAreaClear,
  spawnVehicle,
  getRandomElement,
  spawnPed,
  wasInteractJustReleased,
  showSubtitle,
} from "@common/helpers";

export default class RetreivingTruckState extends BaseState<TowStateEnum> {
  private _state: TowStateMachine;
  private _towTruckSpawnHeading: number = 140.5;

  private _pedSpawnCoords: number[] = [409.3, -1623.1, 29.29];
  private _pedSpawnHeading: number = 228.42;

  private getRandomTruckModel(): string {
    return getRandomElement([
      // "towtruck",
      // "towtruck2",
      // "towtruck3",
      "towtruck4",
    ]);
  }

  onEnter = async (): Promise<void> => {
    this._state = <TowStateMachine>this._stateMachine;

    if (!DoesEntityExist(this._state.signInPed)) {
      this._state.signInPed = await spawnPed(
        2,
        "s_m_y_xmech_01",
        this._pedSpawnCoords,
        this._pedSpawnHeading,
        true
      );
    }

    // const [x, y, z] = this._state.getTruckSpawnCoords();
    // ClearAreaOfVehicles(x, y, z, 5, false, false, false, false, false);
    // this.teleportPlayer(
    //   this._state.getTruckSpawnCoords(),
    //   0,
    //   false,
    //   500
    // );
  };

  onExit = (): void => {};

  onUpdate = async (): Promise<void> => {
    const withinRangeOfTruckPed = isWithinDistanceOfEntity(
      this._state.signInPed,
      1.5
    );
    showSubtitle("Retrieve ~y~Tow Truck~w~", 1000);
    if (withinRangeOfTruckPed) {
      drawMarker(
        36,
        this._state.truckSpawnCoords,
        [0, 0, 0],
        [0, 0, 0],
        [0.5, 0.5, 0.5],
        [0, 150, 255, 255],
        true,
        false,
        true
      );
      if (!DoesEntityExist(this._state.truck)) {
        showInteractMessage("Retrieve Truck");
        if (wasInteractJustReleased()) {
          if (isAreaClear(this._state.truckSpawnCoords)) {
            this._state.truck = await spawnVehicle(
              this.getRandomTruckModel(),
              this._state.truckSpawnCoords,
              this._towTruckSpawnHeading
            );
            this._stateMachine.setState(TowStateEnum.WaitingForPickup);
          } else {
            showNotification(
              "Cannot spawn truck. Area is not clear",
              2,
              true,
              true
            );
          }
        }
      }
    }
  };
}
