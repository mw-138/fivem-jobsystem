import BaseState from "@common/stateMachine/baseState";
import BankTruckStateMachine, {
  BankTruckStateEnum,
  MoneyBagSpawn,
} from "../bankTruckStateMachine";
import { NotificationPictures, WeaponHashes } from "@common/enums";
import {
  getRandomElement,
  getRandomElementsWithoutDuplicates,
  getRandomRoadSidePointNearPlayer,
  isEntityWithinDistanceOfPoint,
  isPlayerInVehicle,
  isWithinDistanceOfEntity,
  isWithinDistanceOfPoint,
  setBlipLabel,
  showAdvancedNotification,
  showAlert,
  showInteractMessage,
  showNotification,
  showSubtitle,
  spawnPed,
  spawnPedInsideVehicle,
  spawnVehicle,
  startProgressBar,
  wasInteractJustReleased,
} from "@common/helpers";

export default class RetrieveMoneyBagsState extends BaseState<BankTruckStateEnum> {
  private _state: BankTruckStateMachine;
  private _currentMoneyBag: MoneyBagSpawn;
  private _moneyBagPed: number;
  private _blip: number;
  private _robberBlip: number;

  private _vehicleBlip: number = 0;
  private _robberBlips: number[] = [];
  private _vehicleSpawnRadius: number = 200;

  private _robbersFoundPlayer: boolean = false;
  private _robbersSpawned: boolean = false;
  private _allRobbersDead: boolean = false;

  private _vehicleModels: string[] = ["glendale"];
  private _pedModels: string[] = [
    "mp_m_freemode_01",
    "mp_f_freemode_01",
    "g_m_importexport_01",
    "g_m_m_armboss_01",
    "g_m_m_armboss_01",
    "g_m_m_armgoon_01",
    "g_m_m_armgoon_01",
    "g_m_m_armlieut_01",
    "g_m_m_armlieut_01",
    "g_m_m_chemwork_01",
    "g_m_m_chemwork_01",
    "g_m_m_chiboss_01",
    "g_m_m_chiboss_01",
    "g_m_m_chicold_01",
    "g_m_m_chicold_01",
    "g_m_m_chigoon_01",
    "g_m_m_chigoon_01",
  ];

  onEnter = async (): Promise<void> => {
    this._state = <BankTruckStateMachine>this._stateMachine;

    if (this._state.availableMoneyBagSpawns.length > 0) {
      this._currentMoneyBag = this._state.availableMoneyBagSpawns[0];

      this._moneyBagPed = await spawnPed(
        2,
        "s_m_m_armoured_01",
        this._currentMoneyBag.pedCoords,
        this._currentMoneyBag.pedHeading,
        true
      );

      const [x, y, z] = this._currentMoneyBag.pedCoords;
      this._blip = AddBlipForCoord(x, y, z);
      SetBlipRoute(this._blip, true);

      this._state.showJobNotification(
        "Go to the designated bank to retrieve money bags."
      );

      // this._robbersSpawned = Math.random() < 0.5;
      // if (this._robbersSpawned) {
      //   // this._state.setState(BankTruckStateEnum.NPCRobbers);
      //   showAdvancedNotification(
      //     "We received a tip-off that a group of robbers are coming for your truck. Take them out!",
      //     "Gruppe 6",
      //     "",
      //     2,
      //     NotificationPictures.CHAR_BANK_FLEECA,
      //     8,
      //     true
      //   );

      //   const [roadSidePoint, roadSideHeading] =
      //     getRandomRoadSidePointNearPlayer(this._vehicleSpawnRadius);
      //   this._state.robberVehicle = await spawnVehicle(
      //     getRandomElement(this._vehicleModels),
      //     roadSidePoint,
      //     roadSideHeading
      //   );
      //   const group = CreateGroup(53243);
      //   const maxSeats = GetVehicleModelNumberOfSeats(
      //     GetEntityModel(this._state.robberVehicle)
      //   );
      //   const robberPeds = [];
      //   for (let index = -1; index < maxSeats; index++) {
      //     const ped = await spawnPedInsideVehicle(
      //       2,
      //       getRandomElement(
      //         getRandomElementsWithoutDuplicates(this._pedModels, maxSeats)
      //       ),
      //       this._state.robberVehicle,
      //       index
      //     );
      //     GiveWeaponToPed(ped, WeaponHashes.weapon_pistol, 500, false, true);
      //     TaskShootAtEntity(
      //       ped,
      //       PlayerPedId(),
      //       -1,
      //       GetHashKey("FIRING_PATTERN_FULL_AUTO")
      //     );
      //     TaskVehicleChase(ped, PlayerPedId());
      //     // const blip = AddBlipForEntity(ped);
      //     // this._robberBlips.push(blip);
      //     robberPeds.push(ped);
      //     if (index === -1) {
      //       SetPedAsGroupLeader(ped, group);
      //     } else {
      //       SetPedAsGroupMember(ped, group);
      //     }
      //   }

      //   this._state.robberPeds = robberPeds;

      //   // AddBlipForEntity(this._state.robberVehicle);

      //   const [x, y, z] = GetEntityCoords(this._state.robberVehicle, false);
      //   this._vehicleBlip = AddBlipForRadius(x, y, z, this._vehicleSpawnRadius);
      //   SetBlipSprite(this._vehicleBlip, 9);
      //   SetBlipColour(this._vehicleBlip, 1);
      //   SetBlipAlpha(this._vehicleBlip, 64);
      // }

      this._state.availableMoneyBagSpawns.splice(0, 1);
    } else {
      this._state.setState(BankTruckStateEnum.DeliverBagsToBank);
    }
  };

  onExit = (): void => {
    if (DoesBlipExist(this._blip)) {
      SetBlipRoute(this._blip, false);
      RemoveBlip(this._blip);
    }
    if (DoesBlipExist(this._robberBlip)) {
      RemoveBlip(this._robberBlip);
    }
    if (DoesBlipExist(this._vehicleBlip)) {
      RemoveBlip(this._vehicleBlip);
    }
    if (this._robberBlips.length > 0) {
      this._robberBlips.forEach((blip) => {
        if (DoesBlipExist(blip)) {
          RemoveBlip(blip);
        }
      });
    }
    if (DoesEntityExist(this._state.robberVehicle)) {
      DeleteVehicle(this._state.robberVehicle);
    }
    if (this._state.robberPeds.length > 0) {
      this._state.robberPeds.forEach((ped) => {
        if (DoesEntityExist(ped)) {
          DeletePed(ped);
        }
      });
    }
  };

  onUpdate = async (): Promise<void> => {
    const canInteractWithPed = isWithinDistanceOfEntity(this._moneyBagPed, 2);
    const withinRangeOfBank = isWithinDistanceOfEntity(this._moneyBagPed, 40);
    const inTruck = isPlayerInVehicle(this._state.truck);

    if (this._robbersSpawned && !this._allRobbersDead) {
      showSubtitle("Take out the ~r~robbers~w~", 1000);
    } else if (inTruck && !withinRangeOfBank) {
      showSubtitle("Go to the ~y~bank~w~", 1000);
    } else if (!inTruck && !withinRangeOfBank) {
      showSubtitle("Get back in your truck", 1000);
    } else if (inTruck && withinRangeOfBank) {
      showSubtitle("Exit your truck and enter the ~y~bank~w~", 1000);
    } else if (!inTruck && withinRangeOfBank) {
      showSubtitle("Collect money bag from ~y~security guard~w~", 1000);
    }

    if (canInteractWithPed) {
      showInteractMessage("Collect Money Bag");
      if (wasInteractJustReleased()) {
        const completed = await startProgressBar("Retrieving Money Bags", 1000);
        TaskTurnPedToFaceEntity(PlayerPedId(), this._moneyBagPed, 1000);
        if (completed) {
          showNotification("Item received: ~n~Money Bag~w~", 2, false, true);
          setTimeout(() => {
            if (DoesEntityExist(this._moneyBagPed)) {
              DeletePed(this._moneyBagPed);
            }
          }, 5000);
          this._state.setState(BankTruckStateEnum.PutMoneyBagsIntoTruck);
        }
      }
    }

    // if (this._robbersSpawned && !this._allRobbersDead) {
    //   this._allRobbersDead = this._state.robberPeds.every((ped) =>
    //     IsPedDeadOrDying(ped, true)
    //   );
    //   if (this._allRobbersDead) {
    //     showAdvancedNotification(
    //       "Good work. Now proceed to the bank and deliver the money bags.",
    //       "Gruppe 6",
    //       "",
    //       2,
    //       NotificationPictures.CHAR_BANK_FLEECA,
    //       8,
    //       true
    //     );
    //     this._allRobbersDead = true;
    //     if (DoesBlipExist(this._vehicleBlip)) {
    //       RemoveBlip(this._vehicleBlip);
    //     }
    //     if (this._robberBlips.length > 0) {
    //       this._robberBlips.forEach((blip) => {
    //         if (DoesBlipExist(blip)) {
    //           RemoveBlip(blip);
    //         }
    //       });
    //     }
    //   } else {
    //     const withinRangeOfPlayer = isEntityWithinDistanceOfPoint(
    //       this._state.robberVehicle,
    //       GetEntityCoords(PlayerPedId(), false),
    //       50
    //     );
    //     if (withinRangeOfPlayer && !this._robbersFoundPlayer) {
    //       this._robbersFoundPlayer = true;
    //       if (DoesBlipExist(this._vehicleBlip)) {
    //         RemoveBlip(this._vehicleBlip);
    //         this._vehicleBlip = AddBlipForEntity(this._state.robberVehicle);
    //       }
    //     }
    //   }
    //   this._stateMachine.setUpdateDelay(500);
    // } else {
    //   this._stateMachine.setUpdateDelay(withinRangeOfPed ? 0 : 500);
    // }
  };
}
