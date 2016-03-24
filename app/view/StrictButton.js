/*global EventEmitter*/
/*global PIXI*/

import UIElement from './UIElement';

export default class extends UIElement {
  constructor(width, height) {
    super(width, height);
    this.buttonRadius = 20;
    this.indicatorRadius = 5;
    this.value = false;
    this.emitter = new EventEmitter();
    this.sprite = this.createSprite(this.createGraphics());
    this.indicatorSprite = this.createIndicatorSprite(
      this.createIndicatorGraphics());
    this.graphicsContainer.addChild(this.sprite);
    this.graphicsContainer.addChild(this.indicatorSprite);
    this.graphicsContainer.addChild(this.createLabel());
    this.graphicsContainer.position.x = this.marginLeft + 0.35*this.boardSize;
    this.graphicsContainer.position.y = this.marginTop + 0.5*this.boardSize;
  }

  createGraphics() {
    let graphics = new PIXI.Graphics();
    graphics.beginFill(0x333333);
    graphics.drawCircle(0, 0, this.buttonRadius);
    graphics.endFill();
    graphics.beginFill(0xFFFF00);
    graphics.drawCircle(0, 0, this.buttonRadius - 5);
    graphics.endFill();
    return graphics;
  }

  createIndicatorGraphics() {
    let graphics = new PIXI.Graphics();
    graphics.beginFill(0xFF0000);
    graphics.drawCircle(0, 0, this.indicatorRadius);
    graphics.endFill();
    return graphics;
  }

  createLabel() {
    let text = new PIXI.Text('Strict Mode', {font: '16px Arial', fill: 'cyan'});
    text.position.x = -this.buttonRadius;
    text.position.y = 2*this.buttonRadius;
    return text;
  }

  createIndicatorSprite(graphics) {
    let sprite = new PIXI.Sprite(graphics.generateTexture());
    sprite.position.x = this.buttonRadius / 2 + this.indicatorRadius;
    sprite.position.y = -this.buttonRadius / 2 - this.indicatorRadius;
    sprite.tint = 0x777777;
    return sprite;
  }

  createSprite(graphics) {
    let sprite = new PIXI.Sprite(graphics.generateTexture());
    sprite.buttonMode = true;
    sprite.interactive = true;
    sprite.click = sprite.tap = this.onClick.bind(this);
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

  turnOn() {
    this.value = true;
    this.indicatorSprite.tint = 0xFFFFFF;
  }

  turnOff() {
    this.value = false;
    this.indicatorSprite.tint = 0x777777;
  }
}
