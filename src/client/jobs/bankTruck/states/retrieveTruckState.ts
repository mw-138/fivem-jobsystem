import BaseState from "@common/stateMachine/baseState";
import BankTruckStateMachine, {
  BankTruckStateEnum,
} from "../bankTruckStateMachine";
import {
  Colors,
  NotificationPictures,
  SoundNames,
  SoundRefs,
} from "@common/enums";
import {
  getRandomItemsFromArray,
  isPlayerInVehicle,
  setBlipLabel,
  showAdvancedNotification,
  showSubtitle,
  shuffleArray,
  spawnVehicle,
} from "@common/helpers";

export default class RetrieveTruckState extends BaseState<BankTruckStateEnum> {
  private _state: BankTruckStateMachine;
  private _truckSpawnCoords: number[] = [-35.46, -700.05, 32.34];
  private _truckSpawnHeading: number = 338.08;
  private _blip: number;

  onEnter = async (): Promise<void> => {
    this._state = <BankTruckStateMachine>this._stateMachine;

    this._state.showJobNotification("Get in your truck and get started!");

    if (!DoesEntityExist(this._state.truck)) {
      this._state.truck = await spawnVehicle(
        "stockade",
        this._truckSpawnCoords,
        this._truckSpawnHeading
      );

      SetVehicleDirtLevel(this._state.truck, 0);

      this._blip = AddBlipForEntity(this._state.truck);
      SetBlipColour(this._blip, 5);
      SetBlipRoute(this._blip, true);

      // TODO: Delete
      SetPedIntoVehicle(PlayerPedId(), this._state.truck, -1);
    }
  };

  onExit = (): void => {
    if (DoesBlipExist(this._blip)) {
      SetBlipRoute(this._blip, false);
      RemoveBlip(this._blip);
    }
  };

  onUpdate = (): void => {
    if (isPlayerInVehicle(this._state.truck)) {
      this._stateMachine.setState(BankTruckStateEnum.RetrieveMoneyBags);
    } else {
      showSubtitle("Enter ~y~truck~w~", 1000);
    }
  };
}
