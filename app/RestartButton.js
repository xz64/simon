export default class {
  constructor(width, height, resetCallback) {
    this.width = width;
    this.height = height;
    this.resetCallback = resetCallback;
    this.boardSize = ( (width  < height) ? width : height ) - 30;
    this.button = this.createSprite(this.createButton());
    this.graphicsContainer = new PIXI.Container();
    this.graphicsContainer.position.x = 0.45*this.width;
    this.graphicsContainer.position.y = 0.3*this.height;
    this.graphicsContainer.addChild(this.button);
    //this.graphicsContainer.addChild(this.createRestartLabel());
  }

  createButton() {
    let graphics = new PIXI.Graphics();
    graphics.beginFill(0x444444);
    graphics.drawRoundedRect(0, 0, 0.12*this.boardSize, 0.04*this.boardSize, 2);
    graphics.endFill();
    return graphics;
  }

  createRestartLabel() {
    let text = new PIXI.Text("Restart", {font: "16px Arial", fill: "#00FF00"});
    return text;
  }

  createSprite(graphics) {
    let sprite = new PIXI.Sprite(graphics.generateTexture());
    sprite.blendMode = PIXI.BLEND_MODES.ADD;
    sprite.addChild(this.createRestartLabel());
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.click = this.onClick.bind(this);
    return sprite;
  }

  onClick() {
    this.resetCallback();
  }

  getRenderables() {
    return this.graphicsContainer;
  }
}
