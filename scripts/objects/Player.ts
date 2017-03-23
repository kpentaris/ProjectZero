import globalGame from "../main";
import Sprite from "./sprite";
import AssetLoader from "../utils/assetLoader";
import {Drawable} from "./interfaces/Drawable";
import {Updateable} from "./interfaces/Updateable";
import {undef} from "../utils/UtilFunctions";

/**
 * @author KPentaris - 18/3/2017.
 */
export default class Player implements Drawable, Updateable {

  private readonly _frameUpdate: number = 6; //TODO Not sure if readonly

  // TODO Change into centric file (.json). Key is animation name and value is sprites key array.
  private readonly _animationFrames: Map<string, string[]> = new Map([
    ["idle", ["idle_frame_0", "idle_frame_1", "idle_frame_2", "idle_frame_3", "idle_frame_4", "idle_frame_5"]],
    ["walking", ["frame_0", "frame_1", "frame_2", "frame_3", "frame_4", "frame_5"]]
  ]);

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

  public async loadAnimation(animationKey: string) {
    if(undef(this._sprites[animationKey]))
      this._sprites[animationKey] = [];
    let images: HTMLImageElement[] = await AssetLoader.getLoader().getAssets(this._animationFrames.get(animationKey));
    images.forEach(image => {
      this._sprites[animationKey].push(new Sprite(image, 0, 0, image.width, image.height));
    });
  }

  update(): void {
    if(!this._allImagesLoaded)
      return;

    // The modulus means to update the frame every X computed frames
    this._currentAnimationFrame += (globalGame.frames % this._frameUpdate === 0 ? 1 : 0);
    this._currentAnimationFrame %= this._sprites.idle.length;
  }

  draw(): void {
    if(!this._allImagesLoaded) {
      this.loadAnimation("idle");
      this._allImagesLoaded = true;
      return;
    }

    this._ctx.save();

    this._sprites.idle[this._currentAnimationFrame].draw(this._ctx, 0, 0);

    this._ctx.restore();
  }

}