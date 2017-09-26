/**
 * @author KPentaris - 23/3/2017.
 */
export default class UtilFunctions {
  public static isNullOrUndefined(value: any): boolean {
    return UtilFunctions.isNull(value) || UtilFunctions.isUndefined(value);
  }

  public static isUndefined(value: any): boolean {
    return value === undefined;
  }

  public static isDefined(value: any): boolean {
    return value !== undefined;
  }

  public static isNull(value: any): boolean {
    return value === null;
  }

  public static isNotNull(value: any): boolean {
    return !UtilFunctions.isNull(value);
  }

  //copied from lodash
  public static isObjectLike(value: any): boolean {
    return !!value && typeof value == 'object';
  }

  //copied from lodash
  public static isObject(value: any): boolean {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
  }

  //copied from lodash
  public static isFunction(value: any): boolean {
    let tag = UtilFunctions.isObject(value) ? Object.prototype.toString.call(value) : '';
    return tag == '[object Function]' || tag == '[object GeneratorFunction]';
  }

  // copied from lodash
  public static isString(value: any): boolean {
    return typeof value == 'string' ||
      (UtilFunctions.isObjectLike(value) && Object.prototype.toString.call(value) == '[object String]');
  }

  public static isStringNonEmpty(value: any): boolean {
    return UtilFunctions.isString(value) && (<string>value).length > 0;
  }

  public static isNumber(n: any): boolean {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  public static toStr(value: any): string {
    return UtilFunctions.isStringNonEmpty(value) ? value : value.toString();
  }

  public static shortestDistanceSum(shape: Map<number,number>, testShape: Map<number, number>): number {
    let sum = 0;
    shape.forEach((x, y) => {
      let smallestDistance = 9999;
      testShape.forEach((testX, testY) => {
        smallestDistance = Math.min(smallestDistance, UtilFunctions.pointToPointDistance(x, y, testX, testY));
      });
      sum += smallestDistance;
    });
    return sum / shape.size;
  }

  public static pointToPointDistance(x: number, y: number, x1: number, y1: number): number {
    return Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));
  }

}

export function def(obj) {
  return !UtilFunctions.isNullOrUndefined(obj);
}

export function undef(obj) {
  return UtilFunctions.isNullOrUndefined(obj);
}