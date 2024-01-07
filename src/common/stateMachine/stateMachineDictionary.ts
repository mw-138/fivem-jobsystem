import BaseState from "./baseState";
import { BaseStateMachine } from "./baseStateMachine";

export default interface StateMachineDictionary {
  [key: string]: BaseStateMachine<BaseState<number>>;
}
