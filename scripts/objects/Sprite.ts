/**
 * Created by Ntinos on 19/3/2017.
 */

export default class Sprite {

  private readonly _spriteX: number;
  private readonly _spriteY: number;
  private readonly _spriteWidth: number;
  private readonly _spriteHeight: number;
  private readonly _spriteImage: HTMLImageElement;

  constructor(spriteImage: HTMLImageElement, spriteX: number, spriteY: number, spriteWidth: number, spriteHeight: number) {
    this._spriteX = spriteX;
    this._spriteY = spriteY;
    this._spriteWidth = spriteWidth;
    this._spriteHeight = spriteHeight;
    this._spriteImage = spriteImage;
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.drawImage(this._spriteImage, this._spriteX, this._spriteY, this._spriteWidth, this._spriteHeight, x, y, this._spriteWidth, this._spriteHeight);
  }

  drawWithRelativeOffset(ctx: CanvasRenderingContext2D, x: number, y: number, xOff: number, yOff: number): void {
    ctx.drawImage(this._spriteImage, this._spriteX + xOff, this._spriteY + yOff, this._spriteWidth, this._spriteHeight, x, y, this._spriteWidth, this._spriteHeight);
  }

  get spriteWidth(): number {
    return this._spriteWidth;
  }

  get spriteHeight(): number {
    return this._spriteHeight;
  }

}