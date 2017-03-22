/**
 * @author KPentaris - 18/3/2017.
 */

import GameObject from "./objects/gameObject";
import Player from "./objects/player";
import AssetLoader from "./utils/AssetLoader";

let globalGame: GameObject = (function main(): GameObject {
  let canvas: HTMLCanvasElement = document.createElement("canvas");

  if(!(!!canvas.getContext && canvas.getContext("2d"))) {
    alert("Your browser doesn't support HTML5, please update to latest version");
    return;
  }

  let context: CanvasRenderingContext2D = canvas.getContext("2d");

  let game: GameObject = new GameObject(canvas, context);
  let player: Player = new Player(canvas, context);

  game.registerUpdateable(player);
  game.registerDrawable(player);

  canvas.width = 320;
  canvas.height = 480;
  canvas.style.border = "1px solid #000";
  document.body.appendChild(canvas);

  context.fillStyle = "#70C5CF";

  AssetLoader.getLoader().loadAllAssets()
    .then((assets) => {run()});

  return game;
})();

function run() {
  let mainLoop = function() {
    update();
    render();
    window.requestAnimationFrame(mainLoop);
  };
  window.requestAnimationFrame(mainLoop);
}

function update() {
  globalGame.frames++;

  globalGame.updateables.forEach(updateable => updateable.update());
}

function render() {
  globalGame.ctx.fillRect(0, 0, globalGame.canvas.width, globalGame.canvas.height);

  globalGame.drawables.forEach(drawable => drawable.draw());
}

export default globalGame;