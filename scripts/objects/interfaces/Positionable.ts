/**
  * @author KPentaris - 8/9/2017.
  */
export interface Positionable {
  currentXPosition: number;
  currentYPosition: number;
  nextXPosition: number;
  nextYPosition: number;

  translate(): void;
}