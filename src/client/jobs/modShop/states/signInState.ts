import BaseState from "@common/stateMachine/baseState";
import ModShopStateMachine, { ModShopStateEnum } from "../modShopStateMachine";
import {
  isWithinDistanceOfEntity,
  showAdvancedNotification,
  showInteractMessage,
  spawnPed,
  wasInteractJustReleased,
} from "@common/helpers";
import { NotificationPictures } from "@common/enums";

export default class SignInState extends BaseState<ModShopStateEnum> {
  private _state: ModShopStateMachine;

  private _pedSpawnCoords: number[] = [-206.98, -1341.56, 34.89];
  private _pedSpawnHeading: number = 37.92;

  onEnter = async (): Promise<void> => {
    this._state = <ModShopStateMachine>this._stateMachine;
    if (!DoesEntityExist(this._state.signInPed)) {
      this._state.signInPed = await spawnPed(
        2,
        "s_m_y_xmech_01",
        this._pedSpawnCoords,
        this._pedSpawnHeading,
        true
      );
    }

    this._stateMachine.setState(ModShopStateEnum.WaitingForCall);
  };

  onExit = (): void => {};

  onUpdate = async (): Promise<void> => {
    const withinRangeOfSignInPed = isWithinDistanceOfEntity(
      this._state.signInPed,
      1.5
    );
    if (withinRangeOfSignInPed) {
      showInteractMessage("Sign In");
      if (wasInteractJustReleased()) {
        showAdvancedNotification(
          "You have signed in",
          "LS Customs",
          "",
          2,
          NotificationPictures.CHAR_LS_CUSTOMS,
          8,
          true
        );
        this._stateMachine.setState(ModShopStateEnum.WaitingForCall);
      }
    }
  };
}
