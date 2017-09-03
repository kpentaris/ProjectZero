/**
 * @author KPentaris - 22/3/2017.
 */

import {Assets} from "../config/assets";
/**
 * Asset loader utility singleton.
 * Handles loading allassets asynchronously
 * in a correct manner.
 */
export default class AssetLoader {

  private static _assetLoader: AssetLoader;
  private _assetUrls: Map<string, string>;
  private _assets: Map<string, HTMLImageElement>;
  private _toBeLoaded: number;

  private constructor() { // obfuscate constructor
    this._assetUrls = Assets.assets;
    this._assets = new Map();
    this._toBeLoaded = 0;
  }

  public static getLoader(): AssetLoader {
    if(this._assetLoader == null)
      this._assetLoader = new AssetLoader();
    return this._assetLoader;
  }

  public async getAsset(assetKey: string): Promise<HTMLImageElement> {
    if(this._assets.get(assetKey) != null)
      return this._assets.get(assetKey);

    await this.loadAsset(assetKey, this._assetUrls.get(assetKey));
    return this._assets.get(assetKey);
  }

  public async getAssets(assetKeys: string[]): Promise<HTMLImageElement[]> {
    let assets: HTMLImageElement[] = [];
    for (let index = 0; index < assetKeys.length; index++) {
      let asset: HTMLImageElement = await this.getAsset(assetKeys[index]);
      assets.push(asset);
    }
    return assets;
  }

  public getAssetURL(assetKey: string): string {
    return this._assetUrls.get(assetKey);
  }

  public loadAllAssets(): Promise<Map<string, HTMLImageElement>> {
    if(this._assetUrls.size == this._assets.size)
      return Promise.resolve(this._assets);

    return new Promise<Map<string, HTMLImageElement>>((resolve, reject) => {
      this._assetUrls.forEach((value, key, map) => {
        try {
          this.loadAsset(key, value);
        } catch(e) {
          reject();
        }
      });

      let timeoutCount = 0;
      let awaitFunction: () => void = () => {
        timeoutCount++;
        setTimeout(() => {
          if(this._toBeLoaded > 0 && timeoutCount > 50)
            reject();
          else if(this._toBeLoaded > 0)
            awaitFunction();
          else
            resolve(this._assets);
        }, 100);
      };
      awaitFunction();
    });
  }

  private async loadAsset(assetKey: string, url: string) {
    let extension = url.substring(url.lastIndexOf("."), url.length);

    if(extension.match(/\.(png|gif|jpe?g)$/)) { // TODO Move image extension regex to global readonly value
      let image: HTMLImageElement = await this.loadImage(url); // will throw exception on reject
      this._assets.set(assetKey, image);
    }
  }

  private loadImage(url: string): Promise<HTMLImageElement> {
    this._toBeLoaded++;
    let image = new Image();
    image.src = url;
    return new Promise((resolve, reject) => {
      image.onload = () => {
        this._toBeLoaded--;
        resolve(image);
      };
      image.onerror = function(event: ErrorEvent) {
        reject(event);
      }
    });
  }

}