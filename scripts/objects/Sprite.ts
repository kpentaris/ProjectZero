/**
 * Created by Ntinos on 19/3/2017.
 */

export default class Sprite {

  private spriteX: number;
  private spriteY: number;
  private spriteWidth: number;
  private spriteHeight: number;
  private spriteImage: HTMLImageElement;

  constructor(spriteImage: HTMLImageElement, spriteX: number, spriteY: number, spriteWidth: number, spriteHeight: number) {
    this.spriteX = spriteX;
    this.spriteY = spriteY;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.spriteImage = spriteImage;
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.drawImage(this.spriteImage, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight, x, y, this.spriteWidth, this.spriteHeight);
  }

}