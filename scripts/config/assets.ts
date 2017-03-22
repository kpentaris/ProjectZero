/**
  * @author KPentaris - 22/3/2017.
  */

export namespace Assets {
  export let assets: Map<string, string>;
}

//TODO REPLACE WITH WEBPACK TEMPLATE

(function() {
  Assets.assets = new Map();
  Assets.assets.set("idle_0", "assets/idle/frame_0.gif");
  Assets.assets.set("idle_1", "assets/idle/frame_1.gif");
  Assets.assets.set("idle_2", "assets/idle/frame_2.gif");
  Assets.assets.set("idle_3", "assets/idle/frame_3.gif");
  Assets.assets.set("idle_4", "assets/idle/frame_4.gif");
  Assets.assets.set("idle_5", "assets/idle/frame_5.gif");
})();