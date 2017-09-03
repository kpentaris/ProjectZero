/**
  * @author KPentaris - 19/3/2017.
  */

/**
 * Interface for objects that need to change their state after an arbitrary
 * amount of frames have passed.
 */
export interface Updateable {
  update(): void;
}