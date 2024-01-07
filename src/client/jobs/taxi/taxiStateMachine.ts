import BaseState from "@common/stateMachine/baseState";
import { BaseStateMachine } from "@common/stateMachine/baseStateMachine";
import RetrieveTaxiState from "./states/retrieveTaxiState";
import WaitingForCallState from "./states/waitingForCallState";
import PickingUpPassengersState from "./states/pickingUpPassengersState";
import PassengerDeathState from "./states/passengerDeathState";
import DropOffPassengersState from "./states/dropOffPassengersState";
import WaitingForPassengersToEnterState from "./states/waitingForPassengersToEnterState";
import ReturnTaxiState from "./states/returnTaxiState";

export enum TaxiStateEnum {
  RetrieveTaxi,
  WaitingForCall,
  PickingUpPassengers,
  PassengerDeath,
  DropOffPassengers,
  WaitingForPassengersToEnter,
  ReturnTaxi,
}

export default class TaxiStateMachine extends BaseStateMachine<
  BaseState<TaxiStateEnum>
> {
  public taxiPed: number = 0;
  public taxiVehicle: number = 0;
  public passengers: number[] = [];
  public taxiSpawnCoords: number[] = [899.81, -180.86, 73.86];
  public cashPayout: number = 0;

  constructor() {
    super();
    this._states.set(TaxiStateEnum.RetrieveTaxi, new RetrieveTaxiState(this));
    this._states.set(
      TaxiStateEnum.WaitingForCall,
      new WaitingForCallState(this)
    );
    this._states.set(
      TaxiStateEnum.PickingUpPassengers,
      new PickingUpPassengersState(this)
    );
    this._states.set(
      TaxiStateEnum.PassengerDeath,
      new PassengerDeathState(this)
    );
    this._states.set(
      TaxiStateEnum.DropOffPassengers,
      new DropOffPassengersState(this)
    );
    this._states.set(
      TaxiStateEnum.WaitingForPassengersToEnter,
      new WaitingForPassengersToEnterState(this)
    );
    this._states.set(TaxiStateEnum.ReturnTaxi, new ReturnTaxiState(this));
  }

  public stop(): void {
    super.stop();
    if (DoesEntityExist(this.taxiPed)) {
      DeletePed(this.taxiPed);
    }
    if (DoesEntityExist(this.taxiVehicle)) {
      DeleteVehicle(this.taxiVehicle);
    }
    if (this.passengers.length > 0) {
      this.passengers.forEach((ped) => {
        if (DoesEntityExist(ped)) {
          DeletePed(ped);
        }
      });
    }
  }

  public isOneOrMorePassengersDead(): boolean {
    return this.passengers.some((ped) => IsPedDeadOrDying(ped, true));
  }
}
