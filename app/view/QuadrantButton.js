/*global PIXI*/
/*global Audio*/
/*global EventEmitter*/

import UIElement from './UIElement';

export default class QuadrantButton extends UIElement {
  constructor(width, height, quadrant, audio) {
    super(width, height);
    this.smallRadius = this.boardSize / 5;
    this.bigRadius = this.boardSize / 2.5;
    this.buttonSpacing = this.boardSize / 20;
    this.quadrant = quadrant;
    this.graphics = this.createGraphics();
    this.sprite = this.createSprite();
    this.registerEventHandlers();
    this.dim();
    this.audio = new Audio(audio);
    this.pressed = false;
    this.emitter = new EventEmitter();
    this.graphicsContainer.addChild(this.sprite);
  }

  createGraphics() {
    var graphics = new PIXI.Graphics();
    var angles = QuadrantButton.getAngles(this.quadrant);
    var connectorLines = QuadrantButton.getConnectorLines.call(this,
      this.quadrant);
    var color = QuadrantButton.getColor(this.quadrant);

    graphics.beginFill(color);
    graphics.lineStyle(1, color, 1);
    graphics.arc(0, 0, this.bigRadius, angles[0], angles[1]);
    graphics.moveTo(connectorLines[0], connectorLines[1]);
    graphics.arc(0, 0, this.smallRadius, angles[0], angles[1]);
    graphics.lineTo(connectorLines[2], connectorLines[3]);
    graphics.endFill();
    
    return graphics;
  }

  createSprite() {
    let mySprite = new PIXI.Sprite(this.graphics.generateTexture());
    let coords = QuadrantButton.getXY.call(this, this.quadrant);

    mySprite.x = coords.x;
    mySprite.y = coords.y;
    mySprite.hitArea = QuadrantButton.getHitPolygon.call(this, this.quadrant);
    mySprite.tint = 0x777777;

    return mySprite;
  }

  registerEventHandlers() {
    this.sprite.interactive = false;
    this.sprite.buttonMode = true;
    this.sprite.mousedown = this.onMouseDown.bind(this);
    this.sprite.mouseup = this.onMouseUp.bind(this);
    this.sprite.mouseout = this.onMouseUp.bind(this);
  }

  disableInput() {
    this.sprite.interactive = false;
  }

  enableInput() {
    this.sprite.interactive = true;
  }

  dim() {
    this.sprite.tint = 0x777777;
  }

  light() {
    this.sprite.tint = 0xFFFFFF;
  }

  playAudio() {
    this.audio.currentTime = 0;
    this.audio.play();
  }

  turnOn() {
    this.light();
    this.playAudio();
  }

  turnOff() {
    this.dim();
  }

  onMouseDown() {
    this.pressed = true;
    this.light();
    this.playAudio();
  }

  onMouseUp() {
    if(this.pressed) {
      this.dim();
      this.pressed = false;
      this.emitter.emit('pressed');
    }
  }

  static getAngles(quadrant) {
    let res = [0, 0];
    switch(quadrant) {
    case 1:
      res = [-Math.PI/2, 0];
      break;
    case 2:
      res = [-Math.PI, -Math.PI/2];
      break;
    case 3:
      res = [Math.PI/2, Math.PI];
      break;
    case 4:
      res = [0, Math.PI/2];
      break;
    }
    return res;
  }

  static getConnectorLines(quadrant) {
    let res = [0,0,0,0];
    switch(quadrant) {
    case 1:
      res = [0, -this.bigRadius, this.bigRadius, 0];
      break;
    case 2:
      res = [-this.bigRadius, 0, 0, -this.bigRadius];
      break;
    case 3:
      res = [0, this.bigRadius, -this.bigRadius, 0];
      break;
    case 4:
      res = [this.bigRadius, 0, 0, this.bigRadius];
      break;
    }    
    return res;
  }

  static getHitPolygon(quadrant) {
    let res = null;
    switch(quadrant) {
    case 1:
      res = new PIXI.Polygon([
        new PIXI.Point(0,0),
        new PIXI.Point(this.bigRadius*Math.cos(3*Math.PI/8),
          this.bigRadius-this.bigRadius*Math.sin(3*Math.PI/8)),
        new PIXI.Point(this.bigRadius*Math.cos(2*Math.PI/8),
          this.bigRadius-this.bigRadius*Math.sin(2*Math.PI/8)),
        new PIXI.Point(this.bigRadius*Math.cos(1*Math.PI/8),
          this.bigRadius-this.bigRadius*Math.sin(1*Math.PI/8)),
        new PIXI.Point(this.bigRadius, this.bigRadius),
        new PIXI.Point(this.smallRadius, this.bigRadius),
        new PIXI.Point(this.smallRadius*Math.cos(Math.PI/4),
          this.bigRadius-this.smallRadius*Math.sin(Math.PI/4)),
        new PIXI.Point(0, this.smallRadius)
      ]);
      break;
    case 2:
      res = new PIXI.Polygon([
        new PIXI.Point(0,this.bigRadius),
        new PIXI.Point(this.smallRadius, this.bigRadius),
        new PIXI.Point(this.bigRadius-this.smallRadius*Math.cos(Math.PI/4),
          this.bigRadius-this.smallRadius*Math.sin(Math.PI/4)),
        new PIXI.Point(this.bigRadius, this.smallRadius),
        new PIXI.Point(this.bigRadius, 0),
        new PIXI.Point(this.bigRadius-this.bigRadius*Math.cos(3*Math.PI/8),
          this.bigRadius-this.bigRadius*Math.sin(3*Math.PI/8)),
        new PIXI.Point(this.bigRadius-this.bigRadius*Math.cos(2*Math.PI/8),
          this.bigRadius-this.bigRadius*Math.sin(2*Math.PI/8)),
        new PIXI.Point(this.bigRadius-this.bigRadius*Math.cos(1*Math.PI/8),
          this.bigRadius-this.bigRadius*Math.sin(1*Math.PI/8))
      ]);
      break;
    case 3:
      res = new PIXI.Polygon([
        new PIXI.Point(0,0),
        new PIXI.Point(this.smallRadius, 0),
        new PIXI.Point(this.bigRadius-this.smallRadius*Math.cos(Math.PI/4),
          this.smallRadius*Math.sin(Math.PI/4)),
        new PIXI.Point(this.bigRadius, this.smallRadius),
        new PIXI.Point(this.bigRadius, this.bigRadius),
        new PIXI.Point(this.bigRadius-this.bigRadius*Math.cos(3*Math.PI/8),
          this.bigRadius*Math.sin(3*Math.PI/8)),
        new PIXI.Point(this.bigRadius-this.bigRadius*Math.cos(2*Math.PI/8),
          this.bigRadius*Math.sin(2*Math.PI/8)),
        new PIXI.Point(this.bigRadius-this.bigRadius*Math.cos(1*Math.PI/8),
          this.bigRadius*Math.sin(1*Math.PI/8))
      ]);
      break;
    case 4:
      res = new PIXI.Polygon([
        new PIXI.Point(0, this.bigRadius),
        new PIXI.Point(0, this.smallRadius),
        new PIXI.Point(this.smallRadius*Math.cos(Math.PI/4),
          this.smallRadius*Math.sin(Math.PI/4)),
        new PIXI.Point(this.smallRadius, 0),
        new PIXI.Point(this.bigRadius, 0),
        new PIXI.Point(this.bigRadius*Math.cos(1*Math.PI/8),
          this.bigRadius*Math.sin(1*Math.PI/8)),
        new PIXI.Point(this.bigRadius*Math.cos(2*Math.PI/8),
          this.bigRadius*Math.sin(2*Math.PI/8)),
        new PIXI.Point(this.bigRadius*Math.cos(3*Math.PI/8),
          this.bigRadius*Math.sin(3*Math.PI/8))
      ]);
      break;
    }
    return res;
  }

  static getXY(quadrant) {
    let res = null;
    switch(quadrant) {
    case 1:
      res = {x: this.width/2 + this.buttonSpacing,
        y: this.height/2 - this.bigRadius - this.buttonSpacing};
      break;
    case 2:
      res = {x: this.width/2 - this.bigRadius - this.buttonSpacing,
        y: this.height/2 - this.bigRadius - this.buttonSpacing};
      break;
    case 3:
      res = {x: this.width/2 - this.bigRadius - this.buttonSpacing,
        y: this.height/2 + this.buttonSpacing};
      break;
    case 4:
      res = {x: this.width/2 + this.buttonSpacing,
        y: this.height/2 + this.buttonSpacing};
      break;
    }
    return res;
  }

  static getColor(quadrant) {
    let res = 0xFFFFFF;
    switch(quadrant) {
    case 1:
      res = 0xFF0000;
      break;
    case 2:
      res = 0x00CC00;
      break;
    case 3:
      res = 0xFFFF00;
      break;
    case 4:
      res = 0x06AEFF;
      break;
    }
    return res;
  }
}
