export default class {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.value = false;
    this.emitter = new EventEmitter();
    this.graphicsContainer = new PIXI.Container();
    this.sprite = this.createSprite(this.createGraphics());
    this.indicatorSprite = this.createIndicatorSprite(
      this.createIndicatorGraphics());
    this.graphicsContainer.addChild(this.sprite);
    this.graphicsContainer.addChild(this.indicatorSprite);
    this.graphicsContainer.addChild(this.createLabel());
  }

  createGraphics() {
    let graphics = new PIXI.Graphics();
    graphics.beginFill(0x222222);
    graphics.drawCircle(0, 0, 20);
    graphics.endFill();
    graphics.beginFill(0xFFFF00);
    graphics.drawCircle(0, 0, 15);
    graphics.endFill();
    return graphics;
  }

  createIndicatorGraphics() {
    let graphics = new PIXI.Graphics();
    graphics.beginFill(0xFF0000);
    graphics.drawCircle(0, 0, 5);
    graphics.endFill();
    return graphics;
  }

  createLabel() {
    let text = new PIXI.Text("Strict Mode", {font: "16px Arial", fill: "cyan"});
    text.position.x = this.width*0.35 - 20;
    text.position.y = this.height*0.45 + 40;
    return text;
  }

  createIndicatorSprite(graphics) {
    let sprite = new PIXI.Sprite(graphics.generateTexture());
    sprite.position.x = this.width*0.35 + 15;
    sprite.position.y = this.height*0.45 - 15;
    sprite.tint = 0x777777;
    return sprite;
  }

  createSprite(graphics) {
    let sprite = new PIXI.Sprite(graphics.generateTexture());
    sprite.position.x = this.width*0.35;
    sprite.position.y = this.height*0.45;
    sprite.buttonMode = true;
    sprite.interactive = true;
    sprite.click = this.onClick.bind(this);
    return sprite;
  }

  onClick() {
    if(this.value === true) {
      this.turnOff();
      this.emitter.emit('off');
    }
    else {
      this.turnOn();
      this.emitter.emit('on');
    }
  }

  getRenderables() {
    return this.graphicsContainer;
  }

  turnOn() {
    this.value = true;
    this.indicatorSprite.tint = 0xFFFFFF;
  }

  turnOff() {
    this.value = false;
    this.indicatorSprite.tint = 0x777777;
  }
}
