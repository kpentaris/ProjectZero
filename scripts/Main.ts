/**
 * @author KPentaris - 18/3/2017.
 */

import GameObject from "./objects/GameObject";
import Player from "./objects/Player";
import AssetLoader from "./utils/AssetLoader";
import ActionManager from "./objects/ActionManager";
import Background from "./objects/Background";
import {requestAnimationFrameShim} from "./utils/Shims";

let globalGame: GameObject = (function main(): GameObject {
  let canvas: HTMLCanvasElement = document.createElement("canvas");

  if(!(!!canvas.getContext && canvas.getContext("2d"))) {
    alert("Your browser doesn't support HTML5, please update to latest version");
    return;
  }

  let context: CanvasRenderingContext2D = canvas.getContext("2d");
  let game: GameObject = new GameObject(canvas, context);
  let player: Player = new Player(canvas, context);
  let background: Background = new Background(canvas, context);
  let actionmanager: ActionManager = new ActionManager([player], canvas, context);

  game.updateables = [];
  game.registerUpdateable(player);
  game.registerUpdateable(background);
  game.registerDrawable(player);
  game.registerDrawable(background);

  canvas.width = 320;
  canvas.height = 480;
  canvas.style.border = "1px solid #000";
  document.body.appendChild(canvas);

  context.fillStyle = "#70C5CF";

  AssetLoader.getLoader().loadAllAssets()
    .then((assets) => {run()});

  // Inside IIF to avoid state pollution
  function run() {
    let mainLoop = function() {
      update();
      render();
      requestAnimationFrameShim(mainLoop);
    };
    requestAnimationFrameShim(mainLoop);
  }

  function update() {
    globalGame.frames++;

    globalGame.updateables.forEach(updateable => updateable.update());
  }

  function render() {
    globalGame.ctx.fillRect(0, 0, globalGame.canvas.width, globalGame.canvas.height); // this cleans the canvas

    globalGame.drawables.sort((a, b) => a.layer() < b.layer() ? 0 : 1).forEach(drawable => drawable.draw());
  }

  return game;
})();

export default globalGame;