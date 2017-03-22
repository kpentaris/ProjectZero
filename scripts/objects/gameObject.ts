/**
 * Created by Ntinos on 18/3/2017.
 */

import {Updateable} from "./interfaces/Updateable";
import {Drawable} from "./interfaces/Drawable";

export default class GameObject {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _frames: number;
  private _gameState: GameState;

  private _updateables: Updateable[];
  private _drawables: Drawable[];

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this._canvas = canvas;
    this._ctx = ctx;
    this._frames = 0;
  }

  get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  set canvas(value) {
    this._canvas = value;
  }

  get ctx(): CanvasRenderingContext2D {
    return this._ctx;
  }

  set ctx(value) {
    this._ctx = value;
  }

  get frames(): number {
    return this._frames;
  }

  set frames(value: number) {
    this._frames = value;
  }

  get updateables(): Updateable[] {
    return this._updateables;
  }

  set updateables(value: Updateable[]) {
    this._updateables = value;
  }

  get drawables(): Drawable[] {
    return this._drawables;
  }

  set drawables(value: Drawable[]) {
    this._drawables = value;
  }

  registerUpdateable(object: Updateable): void {
    if (this._updateables == null || this._updateables == undefined)
      this._updateables = [];
    this._updateables.push(object);
  }

  registerDrawable(object: Drawable): void {
    if (this._drawables == null || this._drawables == undefined)
      this._drawables = [];
    this._drawables.push(object);
  }

}