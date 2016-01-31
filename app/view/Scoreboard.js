/*global PIXI*/
/*global EventEmitter*/

import UIElement from './UIElement';

export default class extends UIElement {
  constructor(width, height) {
    super(width, height);
    this.emitter = new EventEmitter();
    this.backgroundWidth = 110;
    this.backgroundHeight = 24;
    this.graphicsContainer = new PIXI.Container();
    this.sprite = this.createSprite(this.createGraphics());
    this.label= this.createLabel();
    this.score= this.createScore();
    this.scoreValue = this.createScoreValue();
    this.graphicsContainer.addChild(this.sprite);
    this.graphicsContainer.addChild(this.label);
    this.graphicsContainer.addChild(this.score);
    this.graphicsContainer.addChild(this.scoreValue);
    this.graphicsContainer.position.x = this.marginLeft + 0.5*this.boardSize - 
      this.backgroundWidth / 2;
    this.graphicsContainer.position.y = this.marginTop + 0.35*this.boardSize;
  }

  createGraphics() {
    let graphics = new PIXI.Graphics();
    graphics.beginFill(0x778899);
    graphics.drawRoundedRect(0, 0, this.backgroundWidth, this.backgroundHeight,
      10);
    graphics.endFill();
    return graphics;
  }

  createSprite(graphics) {
    let sprite = new PIXI.Sprite(graphics.generateTexture());
    return sprite;
  }

  createText(string) {
    return new PIXI.Text(string, {font: 'bold 20px Arial', align:'center',
      color: '#FF0000'});
  }

  createScore() {
    let text = this.createText('Steps: ');
    text.position.x = 5;
    return text;
  }

  createScoreValue() {
    let text = this.createText('0');
    text.position.x = this.backgroundWidth - 30;
    return text;
  }

  createLabel() {
    return new PIXI.Graphics();
  }

  getRenderables() {
    return this.graphicsContainer;
  }

  setValue(val) {
    this.scoreValue.text = (val+1).toString();
  }
}
