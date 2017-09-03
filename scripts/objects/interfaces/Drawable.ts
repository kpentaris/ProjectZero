/**
  * @author KPentaris - 19/3/2017.
  */

/**
 * Interface for objects that need to be drawn in the canvas.
 */
export interface Drawable {
  layer(): number;
  draw(): void;
}