import { BaseStateMachine } from "./baseStateMachine";

export default abstract class BaseState<T extends number> {
  abstract onEnter: Function;
  abstract onExit: Function;
  abstract onUpdate: Function;

  protected _stateMachine: BaseStateMachine<BaseState<any>>;

  constructor(stateMachine: BaseStateMachine<BaseState<any>>) {
    this._stateMachine = stateMachine;
  }
}
