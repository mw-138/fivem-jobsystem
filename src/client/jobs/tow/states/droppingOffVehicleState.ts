import BaseState from "@common/stateMachine/baseState";
import TowStateMachine, { TowStateEnum } from "../towStateMachine";
import {
  showAdvancedNotification,
  isEntityWithinDistanceOfPoint,
  showSubtitle,
  drawMarker,
  isWithinDistanceOfPoint,
} from "@common/helpers";
import { NotificationPictures } from "@common/enums";

export default class DroppingOffVehicleState extends BaseState<TowStateEnum> {
  private _state: TowStateMachine;
  private _dropOffBlip: number = 0;

  onEnter = (): void => {
    this._state = <TowStateMachine>this._stateMachine;
    const [x, y, z] = this._state.truckSpawnCoords;

    this._state.showJobNotification("Now bring the vehicle back in one piece!");

    this._dropOffBlip = AddBlipForCoord(x, y, z);
    SetBlipRoute(this._dropOffBlip, true);
  };

  onExit = (): void => {
    if (DoesBlipExist(this._dropOffBlip)) {
      SetBlipRoute(this._dropOffBlip, false);
      RemoveBlip(this._dropOffBlip);
    }
  };

  onUpdate = (): void => {
    const withinRangeOfDropOff = isEntityWithinDistanceOfPoint(
      this._state.pickupVehicle,
      this._state.truckSpawnCoords,
      2
    );
    const shouldDrawMarker = isWithinDistanceOfPoint(
      this._state.truckSpawnCoords,
      20
    );

    if (shouldDrawMarker) {
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
    }

    if (withinRangeOfDropOff) {
      const isAttachedToTowTruck = IsVehicleAttachedToTowTruck(
        this._state.truck,
        this._state.pickupVehicle
      );
      if (!isAttachedToTowTruck) {
        DeleteVehicle(this._state.pickupVehicle);
        this._state.pickupVehicle = 0;
        this._state.showJobNotification(
          `Here is $${this._state.cashPayout}. Now get back out there!`
        );
        this._state.cashPayout = 0;
        this._stateMachine.setState(TowStateEnum.WaitingForPickup); // ReturningTruck
      } else {
        showSubtitle("Detatch ~y~vehicle~w~", 1000);
      }
    } else {
      showSubtitle("Drop off ~y~vehicle~w~", 1000);
    }
  };
}
