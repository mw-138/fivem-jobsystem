import BaseState from "@common/stateMachine/baseState";
import TaxiStateMachine, { TaxiStateEnum } from "../taxiStateMachine";
import {
  getRandomRoadSidePoint,
  getRandomMapCoord,
  showAdvancedNotification,
  getFullStreetName,
  isEntityWithinDistanceOfPoint,
  showSubtitle,
} from "@common/helpers";
import { NotificationPictures } from "@common/enums";

export default class DropOffPassengersState extends BaseState<TaxiStateEnum> {
  private _state: TaxiStateMachine;
  private _dropOffPoint: number[];
  private _blip: number;
  private _passengersLeaving: boolean = false;

  onEnter = async (): Promise<void> => {
    this._state = <TaxiStateMachine>this._stateMachine;

    const [roadSidePoint, roadSideHeading] = getRandomRoadSidePoint(
      getRandomMapCoord()
    );
    this._dropOffPoint = roadSidePoint;
    const [x, y, z] = roadSidePoint;

    this._state.showJobNotification(
      `Drop off your passengers @ ${getFullStreetName(roadSidePoint, true)}.`
    );

    this._blip = AddBlipForCoord(x, y, z);
    SetBlipRoute(this._blip, true);
  };

  onExit = (): void => {
    if (DoesBlipExist(this._blip)) {
      SetBlipRoute(this._blip, false);
      RemoveBlip(this._blip);
    }
    this._passengersLeaving = false;
  };

  onUpdate = async (): Promise<void> => {
    const taxi = this._state.taxiVehicle;
    const withinRangeOfDropOff = isEntityWithinDistanceOfPoint(
      taxi,
      this._dropOffPoint,
      10
    );
    if (this._state.isOneOrMorePassengersDead()) {
      this._stateMachine.setState(TaxiStateEnum.PassengerDeath);
    }
    if (withinRangeOfDropOff) {
      const hasStopped = IsVehicleStopped(taxi);
      if (hasStopped) {
        if (!this._passengersLeaving) {
          this._passengersLeaving = true;
          this._state.passengers.forEach((ped) => {
            TaskLeaveVehicle(ped, taxi, 0);
            TaskWanderStandard(ped, 10, 10);
            setTimeout(() => {
              DeletePed(ped);
            }, 10000);
          });
        }

        const allPassengersOutOfTaxi = this._state.passengers.every(
          (ped) => !IsPedInVehicle(ped, taxi, true)
        );
        if (allPassengersOutOfTaxi) {
          this._state.showJobNotification(
            `You have been paid $${this._state.cashPayout}.`
          );
          this._stateMachine.setState(TaxiStateEnum.WaitingForCall);
        } else {
          showSubtitle("Wait for passengers to exit taxi", 1000);
        }
      } else {
        showSubtitle("Stop vehicle", 1000);
      }
    } else {
      showSubtitle("Drive passengers to ~y~destination~w~", 1000);
    }
  };
}
