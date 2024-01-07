import BaseState from "@common/stateMachine/baseState";
import { BaseStateMachine } from "@common/stateMachine/baseStateMachine";
import SignInState from "./states/signInState";
import WaitingForCallState from "./states/waitingForCallState";
import PickingUpVehicleState from "./states/pickingUpVehicleState";
import DropOffVehicleState from "./states/dropOffVehicleState";
import WorkOnVehicleState from "./states/workOnVehicleState";
import VehicleWorkDoneState from "./states/vehicleWorkDoneState";
import DeliveryCompleteState from "./states/deliveryCompleteState";

export enum ModShopStateEnum {
  SignIn,
  WaitingForCall,
  PickingUpVehicle,
  DropOffVehicle,
  WorkOnVehicle,
  VehicleWorkDone,
  DeliveryComplete,
}

export default class ModShopStateMachine extends BaseStateMachine<
  BaseState<ModShopStateEnum>
> {
  public dropOffCoords: number[] = [-222.58, -1329.4, 30.89];
  public signInPed: number = 0;
  public pickupVehicle: number = 0;
  public pickupVehicleCoords: number[] = [0, 0, 0];
  public cashPayout: number = 0;

  constructor() {
    super();
    this._states.set(ModShopStateEnum.SignIn, new SignInState(this));
    this._states.set(
      ModShopStateEnum.WaitingForCall,
      new WaitingForCallState(this)
    );
    this._states.set(
      ModShopStateEnum.PickingUpVehicle,
      new PickingUpVehicleState(this)
    );
    this._states.set(
      ModShopStateEnum.DropOffVehicle,
      new DropOffVehicleState(this)
    );
    this._states.set(
      ModShopStateEnum.WorkOnVehicle,
      new WorkOnVehicleState(this)
    );
    this._states.set(
      ModShopStateEnum.VehicleWorkDone,
      new VehicleWorkDoneState(this)
    );
    this._states.set(
      ModShopStateEnum.DeliveryComplete,
      new DeliveryCompleteState(this)
    );
  }

  public stop(): void {
    super.stop();
    if (DoesEntityExist(this.signInPed)) {
      DeletePed(this.signInPed);
    }
    if (DoesEntityExist(this.pickupVehicle)) {
      DeleteVehicle(this.pickupVehicle);
    }
  }
}
