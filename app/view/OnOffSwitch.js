/*global EventEmitter*/
/*global PIXI*/

export default class {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.emitter = new EventEmitter();
    this.boardSize = ( (width  < height) ? width : height ) - 30;
    this.button = this.createSprite(this.createButton());
    this.graphicsContainer = new PIXI.Container();
    this.graphicsContainer.position.x = this.width*.5;
    this.graphicsContainer.position.y = this.height*.5;
    this.graphicsContainer.addChild(this.createBackground());
    this.graphicsContainer.addChild(this.button);
    this.graphicsContainer.addChild(this.createOnLabel());
    this.graphicsContainer.addChild(this.createOffLabel());
  }

  createBackground() {
    let graphics = new PIXI.Graphics();
    graphics.beginFill(0xEEEEEE);
    graphics.drawRoundedRect(0, 0, 0.06*this.width, 0.03*this.height, 5);
    graphics.endFill();
    return graphics;
  }

  createButton() {
    let graphics = new PIXI.Graphics();
    graphics.beginFill(0x4169e1);
    graphics.drawRoundedRect(0, 0, 0.03*this.width, 0.03*this.height, 5);
    graphics.endFill();
    return graphics;
  }

  createSprite(graphics) {
    let sprite = new PIXI.Sprite(graphics.generateTexture());
    sprite.hitArea = new PIXI.RoundedRectangle(0, 0, 0.03*this.width,
      0.03*this.height, 5);
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.click = this.onClick.bind(this);
    sprite.position.x = 0.03*this.width;
    return sprite;
  }

  onClick() {
    if(this.button.position.x === 0) {
      this.button.position.x = 0.03*this.width;
      this.emitter.emit('off');
    }
    else {
      this.button.position.x = 0;
      this.emitter.emit('on');
    }
  }

  createOnLabel() {
    let text = new PIXI.Text('On', {font: '16px Arial', fill: 'cyan'});
    text.position.x = -0.02*this.width;
    text.position.y = 0.030*this.height;
    return text;
  }

  createOffLabel() {
    let text = new PIXI.Text('Off', {font: '16px Arial', fill: 'cyan'});
    text.position.x = 0.035*this.width;
    text.position.y = 0.030*this.height;
    return text;
  }

  getRenderables() {
    return this.graphicsContainer;
  }
}
