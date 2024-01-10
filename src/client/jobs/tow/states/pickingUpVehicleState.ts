import BaseState from "@common/stateMachine/baseState";
import TowStateMachine, { TowStateEnum } from "../towStateMachine";
import {
  getRandomElement,
  showAdvancedNotification,
  getRandomRoadSidePoint,
  getRandomMapCoord,
  spawnVehicle,
  generateCashPayoutByDistance,
  isPlayerInVehicle,
  showSubtitle,
  teleportPlayer,
  getRandomRoadSidePointNearPlayer,
} from "@common/helpers";
import { NotificationPictures } from "@common/enums";

class Vehicle {
  model: string | number;
  payoutRate: number;

  constructor(model: string | number, payoutRate: number) {
    this.model = model;
    this.payoutRate = payoutRate;
  }
}

export default class PickingUpVehicleState extends BaseState<TowStateEnum> {
  private _state: TowStateMachine;
  private _vehicleBlip: number;

  private getRandomVehicleModel(): Vehicle {
    return getRandomElement([
      new Vehicle("regina", 1),
      new Vehicle("ingot", 1),
      new Vehicle("primo", 1),
      new Vehicle("premier", 1),
      new Vehicle("stanier", 1),
      new Vehicle("stratum", 1),
      new Vehicle("asea", 1),
      new Vehicle("washington", 1),
      new Vehicle("intruder", 1),
      new Vehicle("fugitive", 1),
      new Vehicle("asterope", 1),
      new Vehicle("surge", 1),
      new Vehicle("tailgater", 1),
      new Vehicle("schafter", 1),
      new Vehicle("thrax", 2),
      new Vehicle("tezeract", 3),
    ]);
  }

  onEnter = async (): Promise<void> => {
    this._state = <TowStateMachine>this._stateMachine;

    this._state.showJobNotification(
      "I have a vehicle for you to pick up. Go to the waypoint on your GPS and bring it back here."
    );

    const [coords, heading] = getRandomRoadSidePointNearPlayer(1000);
    const randVehicle = this.getRandomVehicleModel();
    this._state.pickupVehicle = await spawnVehicle(
      randVehicle.model,
      coords,
      heading
    );
    SetVehicleOnGroundProperly(this._state.pickupVehicle);

    this._vehicleBlip = AddBlipForEntity(this._state.pickupVehicle);
    SetBlipColour(this._vehicleBlip, 5);
    SetBlipRoute(this._vehicleBlip, true);

    this._state.cashPayout = generateCashPayoutByDistance(
      coords,
      0.035 * randVehicle.payoutRate
    );
  };

  onExit = (): void => {
    if (DoesBlipExist(this._vehicleBlip)) {
      SetBlipRoute(this._vehicleBlip, false);
      RemoveBlip(this._vehicleBlip);
    }
  };

  onUpdate = (): void => {
    if (isPlayerInVehicle(this._state.truck)) {
      const attachedVehicle = GetEntityAttachedToTowTruck(this._state.truck);
      const isPickupVehicleAttached =
        DoesEntityExist(attachedVehicle) &&
        IsVehicleAttachedToTowTruck(this._state.truck, attachedVehicle);
      if (isPickupVehicleAttached) {
        this._state.setState(TowStateEnum.DroppingOffVehicle);
      } else {
        showSubtitle("Collect ~y~Vehicle~w~", 1000);
      }
    } else {
      showSubtitle("Pick up ~y~vehicle~w~", 1000);
    }
  };
}
