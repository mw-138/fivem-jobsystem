import BaseState from "@common/stateMachine/baseState";
import BankTruckStateMachine, {
  BankTruckStateEnum,
} from "../bankTruckStateMachine";
import { NotificationPictures } from "@common/enums";
import {
  spawnPed,
  isWithinDistanceOfEntity,
  showInteractMessage,
  wasInteractJustReleased,
  showAdvancedNotification,
  getRandomItemsFromArray,
  shuffleArray,
} from "@common/helpers";

export default class SignInState extends BaseState<BankTruckStateEnum> {
  private _state: BankTruckStateMachine;

  private _pedSpawnCoords: number[] = [-27.76, -661.39, 33.48];
  private _pedSpawnHeading: number = 184.47;

  onEnter = async (): Promise<void> => {
    this._state = <BankTruckStateMachine>this._stateMachine;

    if (!DoesEntityExist(this._state.signInPed)) {
      this._state.signInPed = await spawnPed(
        2,
        "s_m_m_armoured_01",
        this._pedSpawnCoords,
        this._pedSpawnHeading,
        true
      );
    }

    this._state.generateRandomMoneyBagSpawns();

    // TODO: Delete
    this._state.setState(BankTruckStateEnum.RetrieveTruck);
  };

  onExit = (): void => {};

  onUpdate = (): void => {
    const withinRangeOfSignInPed = isWithinDistanceOfEntity(
      this._state.signInPed,
      1.5
    );
    if (withinRangeOfSignInPed) {
      showInteractMessage("Sign In");
      if (wasInteractJustReleased()) {
        this._state.showJobNotification("You have signed in");
        this._stateMachine.setState(BankTruckStateEnum.RetrieveTruck);
      }
    }
  };
}
