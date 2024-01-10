import BaseState from "@common/stateMachine/baseState";
import TaxiStateMachine, { TaxiStateEnum } from "../taxiStateMachine";
import {
  generateCashPayoutByDistance,
  getFullStreetName,
  getRandomElement,
  getRandomNumber,
  getRandomRoadSidePointNearPlayer,
  isWithinDistanceOfPoint,
  showAdvancedNotification,
  showSubtitle,
  spawnPed,
  teleportPlayer,
} from "@common/helpers";
import { NotificationPictures } from "@common/enums";

export default class PickingUpPassengersState extends BaseState<TaxiStateEnum> {
  private _state: TaxiStateMachine;
  private _civCount: number = 0;
  private _blip: number = 0;
  private _pickupPoint: number[];
  private _availableSeats: number[];

  private getRandomCivilianModel(): string | number {
    return getRandomElement([
      // Male
      "a_m_m_afriamer_01",
      "a_m_m_bevhills_02",
      "a_m_m_farmer_01",
      "a_m_m_golfer_01",
      "a_m_m_indian_01",
      "a_m_m_mexlabor_01",
      "a_m_m_prolhost_01",
      "a_m_m_skater_01",
      "a_m_m_socenlat_01",
      "a_m_y_beachvesp_02",
      // Female
      "a_f_m_bevhills_01",
      "a_f_m_prolhost_01",
      "a_f_m_salton_01",
      "a_f_m_eastsa_01",
      "a_f_m_downtown_01",
      "a_f_m_fatwhite_01",
      "a_f_m_tourist_01",
      "a_f_m_soucentmc_01",
      "a_f_y_business_04",
      "a_f_y_bevhills_04",
    ]);
  }

  private getAvailableSeat(): number | undefined {
    const index = getRandomElement(this._availableSeats);
    if (index === undefined) {
      return undefined;
    }
    if (!IsVehicleSeatFree(this._state.taxiVehicle, index)) {
      return undefined;
    }
    const indexToRemove = this._availableSeats.indexOf(index);
    if (indexToRemove !== -1) {
      this._availableSeats.splice(indexToRemove, 1);
    }
    return index;
  }

  onEnter = async (): Promise<void> => {
    this._state = <TaxiStateMachine>this._stateMachine;

    const taxi = this._state.taxiVehicle;
    this._civCount = getRandomNumber(1, GetVehicleMaxNumberOfPassengers(taxi));

    const [roadSidePoint, roadSideHeading] =
      getRandomRoadSidePointNearPlayer(1000);
    this._pickupPoint = roadSidePoint;
    const [x, y, z] = roadSidePoint;

    this._state.showJobNotification(
      `${this._civCount} ${
        this._civCount > 1 ? "people" : "person"
      } need picked up @ ${getFullStreetName(roadSidePoint, true)}.`
    );

    const peds = [];
    for (let index = 0; index < this._civCount; index++) {
      const ped = await spawnPed(
        2,
        this.getRandomCivilianModel(),
        roadSidePoint,
        roadSideHeading,
        false
      );
      SetPedCombatAttributes(ped, 17, true);
      peds.push(ped);
    }
    this._state.passengers = peds;

    this._blip = AddBlipForCoord(x, y, z);
    SetBlipRoute(this._blip, true);
    SetBlipSprite(this._blip, this._civCount > 1 ? 685 : 280);
    SetBlipColour(this._blip, 5);

    this._state.cashPayout = generateCashPayoutByDistance(roadSidePoint, 0.2);

    this._availableSeats = [];
    for (
      let index = 0;
      index < GetVehicleMaxNumberOfPassengers(taxi);
      index++
    ) {
      this._availableSeats.push(index);
    }
  };

  onExit = (): void => {
    if (DoesBlipExist(this._blip)) {
      SetBlipRoute(this._blip, false);
      RemoveBlip(this._blip);
    }
  };

  onUpdate = async (): Promise<void> => {
    const taxi = this._state.taxiVehicle;
    const withinRangeOfPickup = isWithinDistanceOfPoint(this._pickupPoint, 10);
    if (this._state.isOneOrMorePassengersDead()) {
      this._stateMachine.setState(TaxiStateEnum.PassengerDeath);
    }
    if (withinRangeOfPickup) {
      this._state.passengers.forEach((ped) => {
        const seatIndex = this.getAvailableSeat();
        if (seatIndex !== undefined) {
          TaskEnterVehicle(ped, taxi, 10000, seatIndex, 1, 1, 0);
        }
      });
      this._stateMachine.setState(TaxiStateEnum.WaitingForPassengersToEnter);
    } else {
      showSubtitle(
        `Drive to ~y~${
          this._state.passengers.length > 1 ? "passengers" : "passenger"
        }~w~`,
        1000
      );
    }
  };
}
