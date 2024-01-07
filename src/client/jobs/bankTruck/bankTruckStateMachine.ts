import BaseState from "@common/stateMachine/baseState";
import { BaseStateMachine } from "@common/stateMachine/baseStateMachine";
import SignInState from "./states/signInState";
import PutMoneyBagsIntoTruckState from "./states/putMoneyBagsIntoTruckState";
import RetrieveMoneyBagsState from "./states/retrieveMoneyBagsState";
import RetrieveTruckState from "./states/retrieveTruckState";
import ReturnTruckState from "./states/returnTruckState";
import DeliverBagsToBankState from "./states/deliverBagsToBankState";
import {
  getRandomItemsFromArray,
  showAdvancedNotification,
  shuffleArray,
} from "@common/helpers";
import { NotificationPictures, SoundNames, SoundRefs } from "@common/enums";
import { Sounds } from "@common/classes/sounds";

export enum BankTruckStateEnum {
  SignIn,
  RetrieveTruck,
  RetrieveMoneyBags,
  PutMoneyBagsIntoTruck,
  DeliverBagsToBank,
  ReturnTruck,
}

export class MoneyBagSpawn {
  id: string;
  pedCoords: number[];
  pedHeading: number;
  payout: number;
  sortOrder: number;

  constructor(
    id: string,
    pedCoords: number[],
    pedHeading: number,
    payout: number,
    sortOrder: number
  ) {
    this.id = id;
    this.pedCoords = pedCoords;
    this.pedHeading = pedHeading;
    this.payout = payout;
    this.sortOrder = sortOrder;
  }
}

export default class BankTruckStateMachine extends BaseStateMachine<
  BaseState<BankTruckStateEnum>
> {
  public signInPed: number = 0;
  public truck: number = 0;
  public moneyBagSpawns: MoneyBagSpawn[] = [
    new MoneyBagSpawn("pillbox_hill", [147.17, -1044.22, 29.37], 103.11, 10, 0),
    new MoneyBagSpawn("alta", [311.47, -282.57, 54.16], 98.94, 10, 0),
    new MoneyBagSpawn("burton", [-353.62, -53.47, 49.04], 111.12, 10, 0),
    new MoneyBagSpawn(
      "rockford_hills",
      [-1211.89, -335.14, 37.78],
      155.04,
      10,
      0
    ),
    new MoneyBagSpawn(
      "grand_senora_desert",
      [1176.27, 2711.18, 38.09],
      307.45,
      10,
      1
    ),
    new MoneyBagSpawn("paleto_bay", [-103.02, 6471.81, 31.63], 130.87, 10, 2),
  ];
  public availableMoneyBagSpawns: MoneyBagSpawn[] = [];
  public payout: number = 0;
  public robberPeds: number[] = [];
  public robberVehicle: number;

  constructor() {
    super();
    this._states.set(BankTruckStateEnum.SignIn, new SignInState(this));
    this._states.set(
      BankTruckStateEnum.RetrieveTruck,
      new RetrieveTruckState(this)
    );
    this._states.set(
      BankTruckStateEnum.RetrieveMoneyBags,
      new RetrieveMoneyBagsState(this)
    );
    this._states.set(
      BankTruckStateEnum.PutMoneyBagsIntoTruck,
      new PutMoneyBagsIntoTruckState(this)
    );
    this._states.set(
      BankTruckStateEnum.DeliverBagsToBank,
      new DeliverBagsToBankState(this)
    );
    this._states.set(
      BankTruckStateEnum.ReturnTruck,
      new ReturnTruckState(this)
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
    if (DoesEntityExist(this.robberVehicle)) {
      DeleteVehicle(this.robberVehicle);
    }
    if (this.robberPeds.length > 0) {
      this.robberPeds.forEach((ped) => {
        if (DoesEntityExist(ped)) {
          DeletePed(ped);
        }
      });
    }
  }

  public showJobNotification(message: string, subject: string = ""): void {
    showAdvancedNotification(
      message,
      "Gruppe 6",
      subject,
      2,
      NotificationPictures.CHAR_BANK_FLEECA,
      4,
      true
    );
  }

  public generateRandomMoneyBagSpawns(): void {
    this.availableMoneyBagSpawns = getRandomItemsFromArray(
      shuffleArray(this.moneyBagSpawns)
    );
    this.availableMoneyBagSpawns.forEach((bag) => (this.payout += bag.payout));
    this.availableMoneyBagSpawns.sort((a, b) => a.sortOrder - b.sortOrder);
  }
}
