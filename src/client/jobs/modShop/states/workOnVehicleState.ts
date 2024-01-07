import BaseState from "@common/stateMachine/baseState";
import ModShopStateMachine, { ModShopStateEnum } from "../modShopStateMachine";
import {
  isWithinDistanceOfEntity,
  showAdvancedNotification,
  showInteractMessage,
  startProgressBar,
  wasInteractJustReleased,
  isWithinDistanceOfPoint,
  getRandomNumber,
  getRandomElementsWithoutDuplicates,
  drawMarker,
  drawText3d,
  showSubtitle,
  randomEnumValue,
  showNotification,
  playAnimation,
  applyVehicleMod,
  showAlert,
  Delay,
  oneOrMoreVehicleDoorsDamaged,
  getNearestWheel,
  setRandomVehicleMod,
} from "@common/helpers";
import {
  NotificationPictures,
  VehicleModType,
  MarkerTypes,
  Colors,
  PedScenarios,
} from "@common/enums";

enum VehicleChangeActionState {
  PrimaryPaint,
  SecondaryPaint,
  PearlescentPaint,
  ChangeWheel,
  CleanBody,
  FixBody,
  Spoiler,
  FrontBumper,
  RearBumper,
  NeonLights,
  InteriorColor,
  WindowTint,
  Livery,
  Skirts,
  EngineUpgrade,
  TurboUpgrade,
  TransmissionUpgrade,
  SuspensionUpgrade,
  BrakesUpgrade,
  XenonLights,
  Horn,
  Bonnet,
  Exhaust,
  Trunk,
  Grill,
  Chassis,
}

class VehicleChangeAction {
  state: VehicleChangeActionState;
  payout: number;
  duration: number;

  constructor(
    state: VehicleChangeActionState,
    payout: number,
    duration: number
  ) {
    this.state = state;
    this.payout = payout;
    this.duration = duration;
  }
}

export default class WorkOnVehicleState extends BaseState<ModShopStateEnum> {
  private _state: ModShopStateMachine;
  private _isWorkingOnVehicle: boolean = false;
  private _changeableParts: VehicleChangeAction[];

  private generateChangeableParts(): VehicleChangeAction[] {
    const availableParts = [
      new VehicleChangeAction(VehicleChangeActionState.PrimaryPaint, 20, 1000),
      new VehicleChangeAction(
        VehicleChangeActionState.SecondaryPaint,
        20,
        1000
      ),
      new VehicleChangeAction(
        VehicleChangeActionState.PearlescentPaint,
        10,
        1000
      ),
      new VehicleChangeAction(VehicleChangeActionState.ChangeWheel, 20, 1000),
      new VehicleChangeAction(VehicleChangeActionState.Spoiler, 10, 1000),
      new VehicleChangeAction(VehicleChangeActionState.FrontBumper, 10, 1000),
      new VehicleChangeAction(VehicleChangeActionState.RearBumper, 10, 1000),
      new VehicleChangeAction(VehicleChangeActionState.NeonLights, 10, 1000),
      new VehicleChangeAction(VehicleChangeActionState.InteriorColor, 10, 1000),
      new VehicleChangeAction(VehicleChangeActionState.WindowTint, 10, 1000),
      new VehicleChangeAction(VehicleChangeActionState.Livery, 10, 1000),
      new VehicleChangeAction(VehicleChangeActionState.Skirts, 10, 1000),
      new VehicleChangeAction(VehicleChangeActionState.EngineUpgrade, 10, 1000),
      new VehicleChangeAction(VehicleChangeActionState.TurboUpgrade, 10, 1000),
      new VehicleChangeAction(
        VehicleChangeActionState.TransmissionUpgrade,
        10,
        1000
      ),
      new VehicleChangeAction(
        VehicleChangeActionState.SuspensionUpgrade,
        10,
        1000
      ),
      new VehicleChangeAction(VehicleChangeActionState.BrakesUpgrade, 10, 1000),
      new VehicleChangeAction(VehicleChangeActionState.XenonLights, 10, 1000),
      new VehicleChangeAction(VehicleChangeActionState.Horn, 10, 1000),
      new VehicleChangeAction(VehicleChangeActionState.Bonnet, 10, 1000),
      new VehicleChangeAction(VehicleChangeActionState.Exhaust, 10, 1000),
      new VehicleChangeAction(VehicleChangeActionState.Trunk, 10, 1000),
      new VehicleChangeAction(VehicleChangeActionState.Grill, 10, 1000),
    ];
    const retval = getRandomElementsWithoutDuplicates(
      availableParts,
      getRandomNumber(1, availableParts.length)
    );
    const requiredParts: VehicleChangeAction[] = [
      new VehicleChangeAction(VehicleChangeActionState.CleanBody, 0, 1000),
      new VehicleChangeAction(VehicleChangeActionState.FixBody, 0, 1000),
    ];
    return [...retval, ...requiredParts];
  }

  private getFirstChangeablePart(): VehicleChangeAction | undefined {
    if (this._changeableParts.length <= 0) {
      return undefined;
    }
    return this._changeableParts[0];
  }

  private removeCurrentChangeablePart(): void {
    if (this._changeableParts.length <= 0) {
      return;
    }
    this._changeableParts.splice(0, 1);
  }

  private getTaskDescriptionText(state: VehicleChangeActionState): string {
    switch (state) {
      case VehicleChangeActionState.ChangeWheel:
        return "Go to any wheel";
      default:
        return "Go to vehicle body";
    }
  }

  private async doVehicleChangeAction(
    state: VehicleChangeActionState,
    targetCoords: number[],
    canPerform: boolean,
    actionLabel: string,
    actionProgressLabel: string,
    actionDuration: number
  ): Promise<boolean> {
    if (!this._isWorkingOnVehicle) {
      const taskText = this.getTaskDescriptionText(state);
      if (!IsStringNullOrEmpty(taskText)) {
        showSubtitle(taskText, 1000);
      }
      if (canPerform) {
        showInteractMessage(actionLabel);
        if (wasInteractJustReleased()) {
          const [tx, ty, tz] = targetCoords;
          this._isWorkingOnVehicle = true;
          TaskTurnPedToFaceCoord(PlayerPedId(), tx, ty, tz, -1);

          let scenario = PedScenarios.Weld;
          switch (state) {
            case VehicleChangeActionState.ChangeWheel:
              scenario = PedScenarios.Kneel;
              break;
          }
          TaskStartScenarioInPlace(PlayerPedId(), scenario, 0, false);

          const completed = await startProgressBar(
            actionProgressLabel,
            actionDuration,
            [0, 0, 0, 150],
            [255, 150, 0, 255],
            [255, 255, 255, 255]
          );
          if (completed) {
            this._isWorkingOnVehicle = false;
            ClearPedTasks(PlayerPedId());
            this.removeCurrentChangeablePart();
            showNotification(
              `${this._changeableParts.length} ${
                this._changeableParts.length > 1 ||
                this._changeableParts.length === 0
                  ? "parts"
                  : "part"
              } left`,
              2,
              true,
              true
            );
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  onEnter = (): void => {
    this._state = <ModShopStateMachine>this._stateMachine;

    showAdvancedNotification(
      "Go up to the vehicle to start working.",
      "LS Customs",
      "Vehicle Work",
      2,
      NotificationPictures.CHAR_LS_CUSTOMS,
      8,
      true
    );

    this._changeableParts = this.generateChangeableParts();
    this._changeableParts.forEach(
      (part) => (this._state.cashPayout += part.payout)
    );
  };

  onExit = (): void => {};

  onUpdate = async (): Promise<void> => {
    const currentChangeablePart = this.getFirstChangeablePart();
    const vehicle = this._state.pickupVehicle;

    if (currentChangeablePart === undefined) {
      this._stateMachine.setState(ModShopStateEnum.VehicleWorkDone);
    } else {
      const withinRangeOfVehicle = isWithinDistanceOfEntity(vehicle, 2);
      const [isNearWheel, nearestWheel, nearestWheelIndex] =
        getNearestWheel(vehicle);

      switch (currentChangeablePart.state) {
        case VehicleChangeActionState.PrimaryPaint:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.PrimaryPaint,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Change Primary Paint",
              "Changing Primary Paint...",
              currentChangeablePart.duration
            )
          ) {
            SetVehicleCustomPrimaryColour(
              vehicle,
              getRandomNumber(0, 255),
              getRandomNumber(0, 255),
              getRandomNumber(0, 255)
            );
          }
          break;
        case VehicleChangeActionState.SecondaryPaint:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.SecondaryPaint,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Change Secondary Paint",
              "Changing Secondary Paint...",
              currentChangeablePart.duration
            )
          ) {
            SetVehicleCustomSecondaryColour(
              vehicle,
              getRandomNumber(0, 255),
              getRandomNumber(0, 255),
              getRandomNumber(0, 255)
            );
          }
          break;

        case VehicleChangeActionState.PearlescentPaint:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.PearlescentPaint,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Add Pearlescent Paint",
              "Adding Pearlescent Paint...",
              currentChangeablePart.duration
            )
          ) {
            const [pearlescent, wheel] = GetVehicleExtraColours(vehicle);
            SetVehicleExtraColours(vehicle, randomEnumValue(Colors), wheel);
          }
          break;
        case VehicleChangeActionState.ChangeWheel:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.ChangeWheel,
              nearestWheel,
              isNearWheel,
              "Replace Wheels",
              "Replacing Wheels...",
              currentChangeablePart.duration
            )
          ) {
            setRandomVehicleMod(vehicle, VehicleModType.VMT_WHEELS);
            const [pearlescent, wheel] = GetVehicleExtraColours(vehicle);
            SetVehicleExtraColours(
              vehicle,
              pearlescent,
              randomEnumValue(Colors)
            );
          }
          break;
        case VehicleChangeActionState.CleanBody:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.CleanBody,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Clean Body",
              "Cleaning Body...",
              currentChangeablePart.duration
            )
          ) {
            SetVehicleDirtLevel(vehicle, 0);
          }
          break;
        case VehicleChangeActionState.FixBody:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.FixBody,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Fix Body",
              "Fixing Body...",
              currentChangeablePart.duration
            )
          ) {
            SetVehicleFixed(vehicle);
          }
          break;
        case VehicleChangeActionState.Spoiler:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.Spoiler,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Change Spoiler",
              "Changing Spoiler...",
              currentChangeablePart.duration
            )
          ) {
            setRandomVehicleMod(vehicle, VehicleModType.VMT_SPOILER);
          }
          break;
        case VehicleChangeActionState.FrontBumper:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.FrontBumper,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Change Front Bumper",
              "Changing Front Bumper...",
              currentChangeablePart.duration
            )
          ) {
            setRandomVehicleMod(vehicle, VehicleModType.VMT_BUMPER_F);
          }
          break;
        case VehicleChangeActionState.RearBumper:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.RearBumper,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Change Rear Bumper",
              "Changing Rear Bumper...",
              currentChangeablePart.duration
            )
          ) {
            setRandomVehicleMod(vehicle, VehicleModType.VMT_BUMPER_R);
          }
          break;
        case VehicleChangeActionState.NeonLights:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.NeonLights,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Add Neon Lights",
              "Adding Neon Lights...",
              currentChangeablePart.duration
            )
          ) {
            for (let index = 0; index < 4; index++) {
              SetVehicleNeonLightEnabled(vehicle, index, true);
            }
            SetVehicleNeonLightsColour(
              vehicle,
              getRandomNumber(0, 255),
              getRandomNumber(0, 255),
              getRandomNumber(0, 255)
            );
          }
          break;
        case VehicleChangeActionState.InteriorColor:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.InteriorColor,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Change Interior Paint",
              "Changing Interior Paint...",
              currentChangeablePart.duration
            )
          ) {
            SetVehicleInteriorColor(vehicle, randomEnumValue(Colors));
            SetVehicleDashboardColor(vehicle, randomEnumValue(Colors));
          }
          break;
        case VehicleChangeActionState.WindowTint:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.WindowTint,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Change Window Tint",
              "Changing Window Tint...",
              currentChangeablePart.duration
            )
          ) {
            SetVehicleWindowTint(vehicle, getRandomNumber(1, 6));
          }
          break;
        case VehicleChangeActionState.Livery:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.Livery,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Add Livery",
              "Adding Livery...",
              currentChangeablePart.duration
            )
          ) {
            setRandomVehicleMod(vehicle, VehicleModType.VMT_LIVERY_MOD);
          }
          break;
        case VehicleChangeActionState.Skirts:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.Skirts,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Add Skirts",
              "Adding Skirts...",
              currentChangeablePart.duration
            )
          ) {
            setRandomVehicleMod(vehicle, VehicleModType.VMT_SKIRT);
          }
          break;
        case VehicleChangeActionState.EngineUpgrade:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.EngineUpgrade,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Add Engine Upgrade",
              "Adding Engine Upgrade...",
              currentChangeablePart.duration
            )
          ) {
            setRandomVehicleMod(vehicle, VehicleModType.VMT_ENGINE);
          }
          break;
        case VehicleChangeActionState.TurboUpgrade:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.TurboUpgrade,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Add Turbo Upgrade",
              "Adding Turbo Upgrade...",
              currentChangeablePart.duration
            )
          ) {
            applyVehicleMod(vehicle, VehicleModType.VMT_TURBO, true);
          }
          break;
        case VehicleChangeActionState.TransmissionUpgrade:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.TransmissionUpgrade,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Add Transmission Upgrade",
              "Adding Transmission Upgrade...",
              currentChangeablePart.duration
            )
          ) {
            setRandomVehicleMod(vehicle, VehicleModType.VMT_GEARBOX);
          }
          break;
        case VehicleChangeActionState.SuspensionUpgrade:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.SuspensionUpgrade,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Add Suspension Upgrade",
              "Adding Suspension Upgrade...",
              currentChangeablePart.duration
            )
          ) {
            setRandomVehicleMod(vehicle, VehicleModType.VMT_SUSPENSION);
          }
          break;
        case VehicleChangeActionState.BrakesUpgrade:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.BrakesUpgrade,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Add Brakes Upgrade",
              "Adding Brakes Upgrade...",
              currentChangeablePart.duration
            )
          ) {
            setRandomVehicleMod(vehicle, VehicleModType.VMT_BRAKES);
          }
          break;
        case VehicleChangeActionState.XenonLights:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.XenonLights,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Add Xenon Lights",
              "Adding Xenon Lights...",
              currentChangeablePart.duration
            )
          ) {
            applyVehicleMod(vehicle, VehicleModType.VMT_XENON_LIGHTS, true);
            SetVehicleXenonLightsCustomColor(
              vehicle,
              getRandomNumber(0, 255),
              getRandomNumber(0, 255),
              getRandomNumber(0, 255)
            );
          }
          break;
        case VehicleChangeActionState.Horn:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.Horn,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Add Horn",
              "Adding Horn...",
              currentChangeablePart.duration
            )
          ) {
            setRandomVehicleMod(vehicle, VehicleModType.VMT_HORN);
          }
          break;
        case VehicleChangeActionState.Bonnet:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.Bonnet,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Add Bonnet",
              "Adding Bonnet...",
              currentChangeablePart.duration
            )
          ) {
            setRandomVehicleMod(vehicle, VehicleModType.VMT_BONNET);
          }
          break;
        case VehicleChangeActionState.Exhaust:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.Exhaust,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Add Exhaust",
              "Adding Exhaust...",
              currentChangeablePart.duration
            )
          ) {
            setRandomVehicleMod(vehicle, VehicleModType.VMT_EXHAUST);
          }
          break;
        case VehicleChangeActionState.Trunk:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.Trunk,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Add Trunk",
              "Adding Trunk...",
              currentChangeablePart.duration
            )
          ) {
            setRandomVehicleMod(vehicle, VehicleModType.VMT_TRUNK);
          }
          break;
        case VehicleChangeActionState.Grill:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.Grill,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Add Grill",
              "Adding Grill...",
              currentChangeablePart.duration
            )
          ) {
            setRandomVehicleMod(vehicle, VehicleModType.VMT_GRILL);
          }
          break;
        case VehicleChangeActionState.Chassis:
          if (
            await this.doVehicleChangeAction(
              VehicleChangeActionState.Chassis,
              GetEntityCoords(vehicle, false),
              withinRangeOfVehicle,
              "Add Chassis",
              "Adding Chassis...",
              currentChangeablePart.duration
            )
          ) {
            setRandomVehicleMod(vehicle, VehicleModType.VMT_CHASSIS);
            setRandomVehicleMod(vehicle, VehicleModType.VMT_CHASSIS2);
            setRandomVehicleMod(vehicle, VehicleModType.VMT_CHASSIS3);
            setRandomVehicleMod(vehicle, VehicleModType.VMT_CHASSIS4);
            setRandomVehicleMod(vehicle, VehicleModType.VMT_CHASSIS5);
          }
          break;
      }
    }
  };
}
