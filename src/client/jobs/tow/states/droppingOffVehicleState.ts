import BaseState from "@common/stateMachine/baseState";
import TowStateMachine, { TowStateEnum } from "../towStateMachine";
import {
  showAdvancedNotification,
  isEntityWithinDistanceOfPoint,
  showSubtitle,
} from "@common/helpers";
import { NotificationPictures } from "@common/enums";

export default class DroppingOffVehicleState extends BaseState<TowStateEnum> {
  private _state: TowStateMachine;
  private _dropOffBlip: number = 0;

  onEnter = (): void => {
    this._state = <TowStateMachine>this._stateMachine;
    const [x, y, z] = this._state.truckSpawnCoords;

    showAdvancedNotification(
      "Now bring the vehicle back in one piece!",
      "Towing Impound Lot",
      "Vehicle Pickup",
      2,
      NotificationPictures.CHAR_PROPERTY_TOWING_IMPOUND,
      8,
      true
    );

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
    if (withinRangeOfDropOff) {
      const isAttachedToTowTruck = IsVehicleAttachedToTowTruck(
        this._state.truck,
        this._state.pickupVehicle
      );
      if (!isAttachedToTowTruck) {
        DeleteVehicle(this._state.pickupVehicle);
        this._state.pickupVehicle = 0;
        showAdvancedNotification(
          `Here is $${this._state.cashPayout}. Now get back out there!`,
          "Towing Impound Lot",
          "Vehicle Pickup",
          2,
          NotificationPictures.CHAR_PROPERTY_TOWING_IMPOUND,
          8,
          true
        );
        this._state.cashPayout = 0;
        this._stateMachine.setState(TowStateEnum.ReturningTruck);
      } else {
        showSubtitle("Detatch ~y~vehicle~w~", 1000);
      }
    } else {
      showSubtitle("Drop off ~y~vehicle~w~", 1000);
    }
  };
}
