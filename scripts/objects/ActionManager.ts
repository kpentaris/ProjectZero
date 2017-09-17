import {Actionable} from "./interfaces/Actionable";
import enumerate = Reflect.enumerate;
/**
 * @author KPentaris - 1/9/2017.
 */
export default class ActionManager {

  public static readonly SPACE_BAR: number = 32;

  private _actionables: Array<Actionable>;

  constructor(actionables: Array<Actionable>, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this._actionables = actionables;
    document.addEventListener("keydown", e => {
      if(e.keyCode == ActionManager.SPACE_BAR) {
        this._actionables.forEach(actionable => {
          actionable.action();
        });
      }
    });

    let mousePoints: Map<number, number> = new Map();
    let detectShape: boolean = false;
    // document.addEventListener("mousedown", e => {
    //   mousePoints = new Map();
    //   detectShape = true;
    // });
    // document.addEventListener("mousemove", e => {
    //   if (detectShape) {
    //     if (mousePoints.get(e.clientX) == null || mousePoints.get(e.clientX) != e.clientY)
    //       mousePoints.set(e.clientX, e.clientY);
    //     context.save();
    //     context.fillStyle = "#ee00ff";
    //     context.fillRect(e.clientX, e.clientY, 5, 5);
    //     context.restore();
    //   }
    // });
    // document.addEventListener("mouseup", e => {
    //   detectShape = false;
    //   let sumX: number = 0, sumY: number = 0;
    //   mousePoints.forEach((y: number, x: number) => {
    //     sumX += x;
    //     sumY += y;
    //   });
    //   let centroidX: number = sumX / mousePoints.size;
    //   let centroidY: number = sumY / mousePoints.size;
    //   context.save();
    //   context.fillStyle = "#2ca5ff";
    //   context.fillRect(centroidX, centroidY, 5, 5);
    //   context.restore();
    // });
  }

  registerActionable(actionable: Actionable): void {
    this._actionables.push(actionable);
  }
}