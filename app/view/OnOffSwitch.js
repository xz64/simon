/*global EventEmitter*/
/*global PIXI*/

import UIElement from './UIElement';

export default class extends UIElement {
  constructor(width, height) {
    super(width, height);
    this.emitter = new EventEmitter();
    this.buttonWidth = 40;
    this.buttonHeight = 15;
    this.button = this.createSprite(this.createButton());
    this.graphicsContainer.position.x = this.marginLeft + 0.6*this.boardSize;
    this.graphicsContainer.position.y = this.marginTop + 0.5*this.boardSize;
    this.graphicsContainer.addChild(this.createBackground());
    this.graphicsContainer.addChild(this.button);
    this.graphicsContainer.addChild(this.createOnLabel());
    this.graphicsContainer.addChild(this.createOffLabel());
  }

  createBackground() {
    let graphics = new PIXI.Graphics();
    graphics.beginFill(0xEEEEEE);
    graphics.drawRoundedRect(0, 0, this.buttonWidth, this.buttonHeight, 5);
    graphics.endFill();
    return graphics;
  }

  createButton() {
    let graphics = new PIXI.Graphics();
    graphics.beginFill(0x4169e1);
    graphics.drawRoundedRect(0, 0, (this.buttonWidth / 2) + 5,
      this.buttonHeight, 5);
    graphics.endFill();
    return graphics;
  }

  createSprite(graphics) {
    let sprite = new PIXI.Sprite(graphics.generateTexture());
    sprite.hitArea = new PIXI.RoundedRectangle(0, 0, this.buttonHeight,
      this.buttonHeight, 5);
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.click = sprite.tap = this.onClick.bind(this);
    sprite.position.x = this.buttonWidth / 2;
    return sprite;
  }

  onClick() {
    if(this.button.position.x === 0) {
      this.button.position.x = this.buttonWidth / 2;
      this.emitter.emit('off');
    }
    else {
      this.button.position.x = 0;
      this.emitter.emit('on');
    }
  }

  createText(string) {
    return new PIXI.Text(string, {font: '16px Arial', fill: 'cyan'});
  }

  createOnLabel() {
    let text = this.createText('On');
    text.position.x = -10;
    text.position.y = this.buttonHeight;
    return text;
  }

  createOffLabel() {
    let text = this.createText('Off');
    text.position.x = this.buttonWidth * 0.6;
    text.position.y = this.buttonHeight;
    return text;
  }
}
