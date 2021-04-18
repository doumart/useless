import * as PIXI from "pixi.js";

import Events from "./Events";

function createGradTexture(start: string, end: string) {
  const quality = 512;
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = quality;

  const ctx = canvas.getContext("2d");
  const grd = ctx.createLinearGradient(0, 0, 0, quality);
  grd.addColorStop(0, start);
  grd.addColorStop(1, end);

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 1, quality);

  return PIXI.Texture.from(canvas);
}

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
PIXI.settings.RESOLUTION = 1;
PIXI.settings.ROUND_PIXELS = true;
PIXI.settings.RENDER_OPTIONS.antialias = false;
PIXI.settings.PRECISION_FRAGMENT = "highp";

const app = new PIXI.Application({
  width: 800,
  height: 600,
  antialias: true,
  autoDensity: true,
});
app.loader.add("cube", "assets/cube2.png");
app.loader.add("eyes", "assets/eyes.png");
app.loader.add("bubble", "assets/bubble.png");
app.loader.add("button", "assets/button_spritesheet.png");
app.loader.add("button_data", "assets/button_spritesheet.json");
app.loader.load(init);

function init(_: any, resources: any) {
  let count = 0;

  const backgroundTexture = createGradTexture("#8e1ea2", "#320235");
  const sprite = new PIXI.Sprite(backgroundTexture);
  sprite.position.set(0, 0);
  sprite.width = app.screen.width;
  sprite.height = app.screen.height;
  app.stage.addChild(sprite);

  const bigText = new PIXI.Text("PRESS ME!", {
    fontSize: 80,
    fontFamily: "Arial",
    dropShadow: true,
    dropShadowAlpha: 0.8,
    dropShadowAngle: 2.1,
    dropShadowBlur: 4,
    dropShadowColor: "#10101066",
    dropShadowDistance: 10,
    fill: ["#feae55"],
    stroke: "#fa9b2e",
    fontWeight: "lighter",
    lineJoin: "round",
    strokeThickness: 6,
  });
  bigText._resolution = 2;
  bigText.anchor.set(0.5);
  bigText.position.set(app.screen.width / 2, 60);
  app.stage.addChild(bigText);

  const text = new PIXI.Text("", { fontSize: 20, fontFamily: "monospace" });
  text._resolution = 2;

  const speechBubble = new PIXI.NineSlicePlane(resources.bubble.texture, 5, 5, 15, 25);
  speechBubble.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  speechBubble.position.set(0, 0);

  const bubbleContainer = new PIXI.Container();
  bubbleContainer.addChild(speechBubble);
  bubbleContainer.addChild(text);

  const robotContainer = new PIXI.Container();

  const cube = new PIXI.Sprite(resources.cube.texture);
  cube.anchor.set(0.5);
  cube.scale.set(4);
  cube.position.set(app.screen.width / 2, app.screen.height - cube.height / 2);
  robotContainer.addChild(cube);

  const buttonTextures: any[] = [];
  for (let i = 2; i >= 0; i--) {
    const framekey = `button_spritesheet${i}.png`;
    const texture = PIXI.Texture.from(framekey);
    buttonTextures.push(texture);
  }

  const button = new PIXI.AnimatedSprite(buttonTextures);
  button.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  button.anchor.set(0.5);
  button.scale.set(4);
  button.position.set(app.screen.width / 2, cube.y - cube.height / 2 + 40);
  button.interactive = true;
  button.loop = false;
  robotContainer.addChild(button);

  const eyes = new PIXI.Sprite(resources.eyes.texture);
  eyes.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  eyes.anchor.set(0.5);
  eyes.scale.set(4);
  eyes.position.set(app.screen.width / 2, app.screen.height - cube.height / 2 + 50);
  robotContainer.addChild(eyes);

  button.on("mousedown", () => {
    button.animationSpeed = 0.5;
    button.play();
  });

  button.on("mouseup", () => {
    button.animationSpeed = -0.5;
    button.play();
  });

  button.on("click", () => {
    count += 1;
    window.dispatchEvent(new CustomEvent(Events.STAT, { detail: "click" }));
  });

  robotContainer.addChild(bubbleContainer);
  app.stage.addChild(robotContainer);

  app.ticker.add(() => {
    sprite.width = app.screen.width;
    sprite.height = app.screen.height;
    text.text = `You clicked on me ${count} times!`;
    speechBubble.scale.set(4);
    speechBubble.height = (text.height + 40) / 4;
    speechBubble.width = (text.width + 40) / 4;
    bubbleContainer.position.set(cube.position.x - bubbleContainer.width - 60, cube.position.y - 90);

    text.position.set(10, 10);
  });
}
export default app;
