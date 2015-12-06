import Button from './Button';

export default class extends Button {
  constructor(width, height, quadrant) {
    super(width, height);
    this.smallRadius = this.boardSize / 5;
    this.bigRadius = this.boardSize / 2.5;
  }

  createGraphics() {
    var graphics = new PIXI.Graphics();
    var angles = getAngles(quadrant);
    var connectorLines = getConnectorLines(quadrant);

    graphics.beginFill(color);
    graphics.lineStyle(1, color, 1);
    graphics.arc(0, 0, bigRadius, angles[0], angles[1]);
    graphics.moveTo(connectorLines[0], connectorLines[1]);
    graphics.arc(0, 0, smallRadius, angles[0], angles[1]);
    graphics.lineTo(connectorLines[2], connectorLines[3]);
    graphics.endFill();
    
    return graphics;
  }

  createSprite() {}
  createInteractivity() {}

  static getAngles(quadrant) {
    res = [0, 0];
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
    res = [0,0,0,0];
    switch(quadrant) {
    case 1:
      res = [0, -bigRadius, bigRadius, 0];
      break;
    case 2:
      res = [-bigRadius, 0, 0, -bigRadius];
      break;
    case 3:
      res = [0, bigRadius, -bigRadius, 0];
      break;
    case 4:
      res = [bigRadius, 0, 0, bigRadius];
      break;
    }    
    return res;
  }

  static getHitPolygon(quadrant) {
    res = null;
    switch(quadrant) {
    case 1:
      res = new PIXI.Polygon([
        new PIXI.Point(0,0),
        new PIXI.Point(bigRadius*Math.cos(3*Math.PI/8),
          bigRadius-bigRadius*Math.sin(3*Math.PI/8)),
        new PIXI.Point(bigRadius*Math.cos(2*Math.PI/8),
          bigRadius-bigRadius*Math.sin(2*Math.PI/8)),
        new PIXI.Point(bigRadius*Math.cos(1*Math.PI/8),
          bigRadius-bigRadius*Math.sin(1*Math.PI/8)),
        new PIXI.Point(bigRadius, bigRadius),
        new PIXI.Point(smallRadius, bigRadius),
        new PIXI.Point(smallRadius*Math.cos(Math.PI/4),
          bigRadius-smallRadius*Math.sin(Math.PI/4)),
        new PIXI.Point(0, smallRadius)
      ]);
      break;
    case 2:
      res = new PIXI.Polygon([
        new PIXI.Point(0,bigRadius),
        new PIXI.Point(smallRadius, bigRadius),
        new PIXI.Point(bigRadius-smallRadius*Math.cos(Math.PI/4),
          bigRadius-smallRadius*Math.sin(Math.PI/4)),
        new PIXI.Point(bigRadius, smallRadius),
        new PIXI.Point(bigRadius, 0),
        new PIXI.Point(bigRadius-bigRadius*Math.cos(3*Math.PI/8),
          bigRadius-bigRadius*Math.sin(3*Math.PI/8)),
        new PIXI.Point(bigRadius-bigRadius*Math.cos(2*Math.PI/8),
          bigRadius-bigRadius*Math.sin(2*Math.PI/8)),
        new PIXI.Point(bigRadius-bigRadius*Math.cos(1*Math.PI/8),
          bigRadius-bigRadius*Math.sin(1*Math.PI/8))
      ]);
      break;
    case 3:
      res = new PIXI.Polygon([
        new PIXI.Point(0,0),
        new PIXI.Point(smallRadius, 0),
        new PIXI.Point(bigRadius-smallRadius*Math.cos(Math.PI/4),
          smallRadius*Math.sin(Math.PI/4)),
        new PIXI.Point(bigRadius, smallRadius),
        new PIXI.Point(bigRadius, bigRadius),
        new PIXI.Point(bigRadius-bigRadius*Math.cos(3*Math.PI/8),
          bigRadius*Math.sin(3*Math.PI/8)),
        new PIXI.Point(bigRadius-bigRadius*Math.cos(2*Math.PI/8),
          bigRadius*Math.sin(2*Math.PI/8)),
        new PIXI.Point(bigRadius-bigRadius*Math.cos(1*Math.PI/8),
          bigRadius*Math.sin(1*Math.PI/8))
      ]);
      break;
    case 4:
      res = new PIXI.Polygon([
        new PIXI.Point(0, bigRadius),
        new PIXI.Point(0, smallRadius),
        new PIXI.Point(smallRadius*Math.cos(Math.PI/4),
          smallRadius*Math.sin(Math.PI/4)),
        new PIXI.Point(smallRadius, 0),
        new PIXI.Point(bigRadius, 0),
        new PIXI.Point(bigRadius*Math.cos(1*Math.PI/8),
          bigRadius*Math.sin(1*Math.PI/8)),
        new PIXI.Point(bigRadius*Math.cos(2*Math.PI/8),
          bigRadius*Math.sin(2*Math.PI/8)),
        new PIXI.Point(bigRadius*Math.cos(3*Math.PI/8),
          bigRadius*Math.sin(3*Math.PI/8))
      ]);
      break;
    }
    return res;
  }
}
