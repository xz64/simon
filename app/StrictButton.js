export default class {
  constructor(width, height, onCallback, offCallback) {
    this.width = width;
    this.height = height;
    this.onCallback= onCallback;
    this.offCallback= offCallback;
    this.strict = false;
    this.boardSize = ( (width  < height) ? width : height ) - 30;
    this.button = this.createSprite(this.createButton());
    this.indicator = this.createIndicator();
    this.graphicsContainer = new PIXI.Container();
    this.graphicsContainer.position.x = 0.35*this.width;
    this.graphicsContainer.position.y = 0.5*this.height;
    this.graphicsContainer.addChild(this.button);
    this.graphicsContainer.addChild(this.indicator);
    this.graphicsContainer.addChild(this.createStrictLabel());
  }

  createButton() {
    let graphics = new PIXI.Graphics();
    graphics.beginFill(0x444444);
    graphics.drawCircle(0, 0.03*this.height, 0.04*this.boardSize);
    graphics.endFill();
    graphics.beginFill(0xFFFF20);
    graphics.drawCircle(0, 0.03*this.height, 0.03*this.boardSize);
    graphics.endFill();
    return graphics;
  }

  createIndicator() {
    let graphics = new PIXI.Graphics();
    let sprite;

    graphics.beginFill(0xFF0000);
    graphics.drawCircle(0, 0, 0.01*this.boardSize);
    graphics.endFill();

    sprite = new PIXI.Sprite(graphics.generateTexture());
    sprite.tint = 0x777777;
    sprite.position.x = 0.07*this.boardSize;
    sprite.position.y = -0.032*this.boardSize;

    return sprite;
  }

  lightIndicator() {
    this.indicator.tint = 0xFFFFFF;
  }

  dimIndicator() {
    this.indicator.tint = 0x777777;
  }

  createSprite(graphics) {
    let sprite = new PIXI.Sprite(graphics.generateTexture());
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.click = this.onClick.bind(this);
    sprite.position.x = 0.03*this.width;
    return sprite;
  }

  onClick() {
    if(this.strict) {
      this.strict = false;
      this.dimIndicator();
      this.offCallback();
    }
    else {
      this.strict = true;
      this.lightIndicator();
      this.onCallback();
    }
  }

  createStrictLabel() {
    let text = new PIXI.Text("Strict", {font: "16px Arial", fill: "#00FF00"});
    text.position.x = 0.03*this.boardSize;
    text.position.y = 2*0.04*this.boardSize;
    return text;
  }

  getRenderables() {
    return this.graphicsContainer;
  }
}
