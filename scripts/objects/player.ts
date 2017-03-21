import {globalGame} from "../main";
export {Player};

import {Sprite} from "./sprite";
import {Drawable} from "./interfaces/Drawable";
import {Updateable} from "./interfaces/Updateable";

/**
 * Created by Ntinos on 18/3/2017.
 */
class Player implements Drawable, Updateable {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private readonly _sprites; //private readonly _sprites: { [s: string]: Sprite[]; };

  private _currentAnimationFrame: number;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this._canvas = canvas;
    this._ctx = ctx;

    this._currentAnimationFrame = 0;
    this._sprites = {};
  }

  public initSprites(img: HTMLImageElement): void {
    let idleArray = this._sprites.idle;
    this.createImage("../../resources/idle/frame_0").onload = function () {
      idleArray.push(new Sprite(this as HTMLImageElement, 0, 0, 300, 260));
    };
    this.createImage("../../resources/idle/frame_1").onload = function () {
      idleArray.push(new Sprite(this as HTMLImageElement, 0, 0, 300, 260));
    };
    /*this._sprites.idle = [
      new Sprite(this.createImage("../../resources/Idle/frame_0"), 0, 0, 300, 260),
      new Sprite(this.createImage("../../resources/Idle/frame_1"), 0, 0, 300, 260),
      new Sprite(this.createImage("../../resources/Idle/frame_2"), 0, 0, 300, 260),
      new Sprite(this.createImage("../../resources/Idle/frame_3"), 0, 0, 300, 260),
      new Sprite(this.createImage("../../resources/Idle/frame_4"), 0, 0, 300, 260),
      new Sprite(this.createImage("../../resources/Idle/frame_5"), 0, 0, 300, 260)
    ];*/
  }

  update(): void {
    // The modulus means to update the frame every X computed frames
    this._currentAnimationFrame += (globalGame.frames % 6 === 0 ? 1 : 0);
    this._currentAnimationFrame %= this._sprites.idle.length;
  }

  draw(): void {
    this._ctx.save();

    this._sprites.idle[this._currentAnimationFrame].draw(this._ctx, 0, 0);

    this._ctx.restore();
  }

  private createImage(src: string): HTMLImageElement {
    let imageEL = document.createElement("img");
    imageEL.setAttribute("src", src);
    imageEL.setAttribute("style", "display:none");
    return imageEL;
  }

}
