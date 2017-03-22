export {Player};

import globalGame from "../main";
import Sprite from "./sprite";
import AssetLoader from "../utils/assetLoader";
import {Drawable} from "./interfaces/Drawable";
import {Updateable} from "./interfaces/Updateable";

/**
 * @author KPentaris - 18/3/2017.
 */
export default class Player implements Drawable, Updateable {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private readonly _sprites: {[key: string]: Sprite[];};

  private _allImagesLoaded: boolean;
  private _currentAnimationFrame: number;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this._canvas = canvas;
    this._ctx = ctx;

    this._currentAnimationFrame = 0;
    this._sprites = {};

    this._allImagesLoaded = false;
  }

  public initSprites(): void {
    let idleArray = this._sprites.idle = Array<Sprite>();
    let scopeCapture = this;

    AssetLoader.getLoader().loadAllAssets() // TODO migrate load all assets to main
    .then((assetMap) => {
      assetMap.forEach(function(value) {
        idleArray.push(new Sprite(value, 0, 0, 300, 260));
      });
      scopeCapture._allImagesLoaded = true; // capture with arrow function doesn't seem to work here...
    });
  }

  update(): void {
    if(!this._allImagesLoaded) // don't execute until assets have been loaded
      return;

    // The modulus means to update the frame every X computed frames
    this._currentAnimationFrame += (globalGame.frames % 6 === 0 ? 1 : 0);
    this._currentAnimationFrame %= this._sprites.idle.length;
  }

  draw(): void {
    if(!this._allImagesLoaded) // don't execute until assets have been loaded
      return;

    this._ctx.save();

    this._sprites.idle[this._currentAnimationFrame].draw(this._ctx, 0, 0);

    this._ctx.restore();
  }

}