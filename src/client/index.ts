import BaseState from "@common/stateMachine/baseState";
import { BaseStateMachine } from "@common/stateMachine/baseStateMachine";
import TowStateMachine from "./jobs/tow/towStateMachine";
import TaxiStateMachine from "./jobs/taxi/taxiStateMachine";
import ModShopStateMachine from "./jobs/modShop/modShopStateMachine";
import BankTruckStateMachine from "./jobs/bankTruck/bankTruckStateMachine";
import { Delay, spawnVehicle } from "@common/helpers";
import { Sounds } from "@common/classes/sounds";

interface StateMachineDictionary {
  [key: string]: BaseStateMachine<BaseState<number>>;
}

const JobStateMachines: StateMachineDictionary = {
  ["tow"]: new TowStateMachine(),
  ["taxi"]: new TaxiStateMachine(),
  ["mod_shop"]: new ModShopStateMachine(),
  ["bank_truck"]: new BankTruckStateMachine(),
};

let currentJobStateMachine: BaseStateMachine<BaseState<number>> | undefined =
  undefined;

on("onResourceStart", async (name: string) => {
  if (name != GetCurrentResourceName()) return;

  // startJob("bank_truck");

  // const coords = [0, 0, 0];
  // const heading = 0;
  // const veh01 = await spawnVehicle("stockade", coords, heading);
  // const veh02 = await spawnVehicle("stockade", coords, heading);
  // const veh03 = await spawnVehicle("stockade", coords, heading);
});

on("onResourceStop", async (name: string) => {
  if (name != GetCurrentResourceName()) return;

  stopCurrentJob();
});

function startJob(id: string): void {
  if (currentJobStateMachine !== undefined) {
    currentJobStateMachine.stop();
  }
  const newStateMachine = JobStateMachines[id];
  if (!newStateMachine) {
    return;
  }
  currentJobStateMachine = newStateMachine;
  currentJobStateMachine.start();
}
on("jobsystem:start", startJob);

function stopCurrentJob(): void {
  if (currentJobStateMachine === undefined) {
    return;
  }
  currentJobStateMachine.stop();
  currentJobStateMachine = undefined;
}
on("jobsystem:stop", stopCurrentJob);

RegisterCommand(
  "jobsystem:set",
  (src: string, args: any[], rawCommand: string) => {
    if (args.length !== 1) {
      return;
    }
    startJob(String(args[0]));
  },
  true
);
