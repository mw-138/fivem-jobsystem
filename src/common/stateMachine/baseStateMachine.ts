import BaseState from "./baseState";

export abstract class BaseStateMachine<T extends BaseState<number>> {
  protected _states: Map<number, T>;
  protected _currentState: T | undefined;
  protected _updateTick: number;
  public sharedData: Map<string, any>;

  constructor() {
    this.sharedData = new Map<string, any>();
    this._states = new Map<number, T>();
    this._currentState = undefined;
    this._updateTick = setTick(() => {
      this.update();
    });
  }

  public get<T>(): T {
    return this as unknown as T;
  }

  protected hasState(): boolean {
    return this._currentState !== undefined;
  }

  public start(): void {
    this.setState(0);
  }

  public stop(): void {
    if (this.hasState()) {
      this._currentState.onExit();
    }
    clearTick(this._updateTick);
  }

  public setState(stateKey: number): void {
    if (this.hasState()) {
      this._currentState.onExit();
    }

    const newState = this._states.get(stateKey);

    if (newState) {
      this._currentState = newState;
      this._currentState.onEnter();
    }
  }

  public onEnter(): void {
    if (this.hasState()) {
      this._currentState.onEnter();
    }
  }

  public onExit(): void {
    if (this.hasState()) {
      this._currentState.onExit();
    }
  }

  public update(): void {
    if (this.hasState()) {
      this._currentState.onUpdate();
    }
  }
}
