import {Drawable} from "./interfaces/Drawable";
import {Updateable} from "./interfaces/Updateable";
import Sprite from "./Sprite";
import AssetLoader from "../utils/AssetLoader";
/**
 * @author KPentaris - 2/9/2017.
 */
export default class Background implements Drawable, Updateable {

  private readonly skyBackgroundHeight: number = 295;
  private readonly forestBackgroundHeight: number = 321;
  private readonly baseBackgroundWidth: number = 511;

  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _sky: Sprite;
  private _forest: Sprite;
  private _allImagesLoaded: boolean = false;
  private _xSkyOffset: number = 0;
  private _xForestOffset: number = 0;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this._canvas = canvas;
    this._ctx = ctx;

    this.loadBackgroundAssets();
  }

  async loadBackgroundAssets() {
    let background: HTMLImageElement = await AssetLoader.getLoader().getAsset("background");
    this._sky = new Sprite(background, 3, 80, this.baseBackgroundWidth + this._canvas.width, this.skyBackgroundHeight);
    this._forest = new Sprite(background, 3, 300, this.baseBackgroundWidth + this._canvas.width, this.forestBackgroundHeight);
    this._allImagesLoaded = true;
  }

  update(): void {
    if(!this._allImagesLoaded) {
      return;
    }

    this._xForestOffset++;
    this._xSkyOffset += this._xForestOffset % 3 == 0 ? 1 : 0;
    this._xForestOffset %= this.baseBackgroundWidth;
    this._xSkyOffset %= this.baseBackgroundWidth;
  }

  layer(): number {
    return 0;
  }

  draw(): void {
    if(!this._allImagesLoaded) {
      return;
    }
    this._ctx.save();
    this._sky.drawWithRelativeOffset(this._ctx, 0, 0, this._xSkyOffset, 0);
    this._forest.drawWithRelativeOffset(this._ctx, 0, this._canvas.height - this.forestBackgroundHeight, this._xForestOffset, 0);
    this._ctx.restore();
  }
}