import BaseState from "@common/stateMachine/baseState";
import BankTruckStateMachine, {
  BankTruckStateEnum,
} from "../bankTruckStateMachine";
import {
  isNearTrunkOfVehicle,
  setVehicleDoorsOpen,
  setVehicleDoorsShut,
  showAdvancedNotification,
  showInteractMessage,
  showNotification,
  showSubtitle,
  startProgressBar,
  wasInteractJustReleased,
} from "@common/helpers";
import { NotificationPictures } from "@common/enums";

export default class PutMoneyBagsIntoTruckState extends BaseState<BankTruckStateEnum> {
  private _state: BankTruckStateMachine;
  private _blip: number;

  onEnter = async (): Promise<void> => {
    this._state = <BankTruckStateMachine>this._stateMachine;

    this._state.showJobNotification("Place your bag into your truck!");

    this._blip = AddBlipForEntity(this._state.truck);
    SetBlipColour(this._blip, 5);
    SetBlipRoute(this._blip, true);
  };

  onExit = (): void => {
    if (DoesBlipExist(this._blip)) {
      SetBlipRoute(this._blip, false);
      RemoveBlip(this._blip);
    }
  };

  onUpdate = async (): Promise<void> => {
    const truck = this._state.truck;
    const nearTruckTrunk = isNearTrunkOfVehicle(truck);
    if (nearTruckTrunk) {
      showInteractMessage("Place Money Bag Into Truck");
      if (wasInteractJustReleased()) {
        setVehicleDoorsOpen(truck, [2, 3], false, false);
        TaskTurnPedToFaceEntity(PlayerPedId(), truck, 1000);
        const completed = await startProgressBar(
          "Placing Money Bags Into Truck",
          2000
        );
        if (completed) {
          setVehicleDoorsShut(truck, [2, 3], false);
          showNotification("Bag Placed Into Truck", 2, true, true);
          this._state.setState(BankTruckStateEnum.RetrieveMoneyBags);
        }
      }
    } else {
      showSubtitle("Go to rear doors of your ~y~truck~w~", 1000);
    }
  };
}
