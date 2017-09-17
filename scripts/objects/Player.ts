import globalGame from "../Main";
import Sprite from "./Sprite";
import AssetLoader from "../utils/AssetLoader";
import {Drawable} from "./interfaces/Drawable";
import {Updateable} from "./interfaces/Updateable";
import {undef} from "../utils/UtilFunctions";
import {Actionable} from "./interfaces/Actionable";
import {Positionable} from "./interfaces/Positionable";

/**
 * @author KPentaris - 18/3/2017.
 */
export default class Player implements Drawable, Updateable, Positionable, Actionable {

  private readonly _updateFrameRate: number = 5; //TODO Not sure if readonly

  // TODO Change into centric file (.json). Key is animation name and value is sprites key array.
  private readonly _animationFrames: Map<string, string[]> = new Map([
    ["idle", ["idle_frame_0", "idle_frame_1", "idle_frame_2", "idle_frame_3", "idle_frame_4", "idle_frame_5"]],

    ["walking", ["walking_frame_1", "walking_frame_2", "walking_frame_3", "walking_frame_4", "walking_frame_5",
      "walking_frame_6", "walking_frame_7", "walking_frame_8", "walking_frame_9", "walking_frame_10",
      "walking_frame_11", "walking_frame_12"]]
  ]);

  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private readonly _sprites: {[key: string]: Sprite[];};

  private _allImagesLoaded: boolean;
  private _currentSprite: string;
  private _currentAnimationFrame: number;

  private _playerState: PlayerState;
  private readonly _startYVelocity = -10; // guessing this is in pixels of Y movement?
  private readonly _gravity: number = 0.75; // guessing this is how many pixels player fals per frame?
  private _yVelocity: number = 0;

  currentXPosition: number = 20;
  currentYPosition: number = 310;
  nextXPosition: number = 20;
  nextYPosition: number = 310;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this._canvas = canvas;
    this._ctx = ctx;

    this._currentSprite = "walking";
    this._currentAnimationFrame = 0;
    this._sprites = {};
    this._playerState = PlayerState.RUNNING;
    this._allImagesLoaded = false;
    this.loadAllAnimations();
  }

  public async loadAllAnimations() {
    await this.loadAnimation("idle");
    await this.loadAnimation("walking");
    this._allImagesLoaded = true;
  }

  public async loadAnimation(animationKey: string) {
    if(undef(this._sprites[animationKey]))
      this._sprites[animationKey] = [];
    let images: HTMLImageElement[] = await AssetLoader.getLoader().getAssets(this._animationFrames.get(animationKey));
    images.forEach(image => {
      this._sprites[animationKey].push(new Sprite(image, 0, 0, image.width, image.height));
    });
  }

  /**
   * Updates the state of this actor
   */
  update(): void {
    if(!this._allImagesLoaded) {
      return;
    }
    this.translate();
    // The modulus means to update the frame every X computed frames
    this._currentAnimationFrame += (globalGame.frames % this._updateFrameRate === 0 ? 1 : 0);
    this._currentAnimationFrame %= this._sprites[this._currentSprite].length;
  }

  layer(): number {
    return 1;
  }

  /**
   * Draws this actor according to its current state
   */
  draw(): void {
    if(!this._allImagesLoaded) {
      return;
    }

    this._ctx.save();

    let sprite = this._sprites[this._currentSprite][this._currentAnimationFrame];
    sprite.draw(this._ctx, this.currentXPosition, this.currentYPosition);

    this._ctx.restore();
  }

  /**
   * Changes the player's current position according to velocity
   * and applies gravity to current speed
   */
  translate(): void {
    this.nextYPosition += this._yVelocity;
    this.currentYPosition = this.nextYPosition;
    if(Math.round(this.currentYPosition) >= 310) { // TODO Change the static value
      this._playerState = PlayerState.RUNNING;
      this._yVelocity = 0;
      this.nextYPosition = 310;
    } else {
      this._yVelocity += this._gravity;
    }
  }

  /**
   * Performs the action that this actor can perform
   *
   * Note: Since this is a single action game, we can get away with
   * a single method on the interface
   */
  action(): void {
    if(this._playerState != PlayerState.JUMPING) {
      this._currentAnimationFrame = 0; // reset animation frame
      this._yVelocity = this._startYVelocity;
      this._playerState = PlayerState.JUMPING;
      // TODO change current sprite to jumping animation
    }
  }

}

enum PlayerState {
  RUNNING,
  JUMPING
}