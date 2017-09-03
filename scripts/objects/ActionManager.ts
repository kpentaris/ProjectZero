import {Actionable} from "./interfaces/Actionable";
/**
  * @author KPentaris - 1/9/2017.
  */
export default class ActionManager {

  public static readonly SPACE_BAR: number = 32;

  private _actionables: Array<Actionable>;

  constructor(actionables: Array<Actionable>) {
    this._actionables = actionables;
    document.addEventListener("keydown", e => {
      if (e.keyCode == ActionManager.SPACE_BAR) {
        this._actionables.forEach(actionable => {
          actionable.action();
        });
      }
    });
  }

  registerActionable(actionable: Actionable): void {
    this._actionables.push(actionable);
  }
}