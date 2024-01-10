import BaseState from "@common/stateMachine/baseState";
import { BaseStateMachine } from "@common/stateMachine/baseStateMachine";
import DroppingOffVehicleState from "./states/droppingOffVehicleState";
import PickingUpVehicleState from "./states/pickingUpVehicleState";
import WaitingForPickupState from "./states/waitingForPickupState";
import RetreivingTruckState from "./states/retrievingTruckState";
import ReturningTruckState from "./states/returningTruckState";
import { NotificationPictures } from "@common/enums";
import { showAdvancedNotification } from "@common/helpers";

export enum TowStateEnum {
  RetrievingTruck,
  WaitingForPickup,
  PickingUpVehicle,
  DroppingOffVehicle,
  ReturningTruck,
}

export default class TowStateMachine extends BaseStateMachine<
  BaseState<TowStateEnum>
> {
  public signInPed: number = 0;
  public truck: number = 0;
  public truckSpawnCoords: number[] = [401.79, -1631.84, 29.29];
  public pickupVehicle: number = 0;
  public cashPayout: number = 0;

  constructor() {
    super();
    this._states.set(
      TowStateEnum.RetrievingTruck,
      new RetreivingTruckState(this)
    );
    this._states.set(
      TowStateEnum.WaitingForPickup,
      new WaitingForPickupState(this)
    );
    this._states.set(
      TowStateEnum.PickingUpVehicle,
      new PickingUpVehicleState(this)
    );
    this._states.set(
      TowStateEnum.DroppingOffVehicle,
      new DroppingOffVehicleState(this)
    );
    this._states.set(
      TowStateEnum.ReturningTruck,
      new ReturningTruckState(this)
    );
  }

  public stop(): void {
    super.stop();
    if (DoesEntityExist(this.signInPed)) {
      DeletePed(this.signInPed);
    }
    if (DoesEntityExist(this.truck)) {
      DeleteVehicle(this.truck);
    }
  }

  public showJobNotification(message: string): void {
    showAdvancedNotification(
      message,
      "Towing Impound",
      "",
      2,
      NotificationPictures.CHAR_PROPERTY_TOWING_IMPOUND,
      2,
      true
    );
  }
}
