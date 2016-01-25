export default class {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.emitter = new EventEmitter();
    this.graphicsContainer = new PIXI.Container();
    this.sprite = this.createSprite(this.createGraphics());
    this.label= this.createLabel();
    this.score= this.createScore();
    this.scoreValue = this.createScoreValue();
    this.graphicsContainer.addChild(this.sprite);
    this.graphicsContainer.addChild(this.label);
    this.graphicsContainer.addChild(this.score);
    this.graphicsContainer.addChild(this.scoreValue);
  }

  createGraphics() {
    let graphics = new PIXI.Graphics();
    graphics.beginFill(0x778899);
    graphics.drawRoundedRect(0, 0, 110, 24, 5);
    graphics.endFill();
    return graphics;
  }

  createSprite(graphics) {
    let sprite = new PIXI.Sprite(graphics.generateTexture());
    sprite.position.x = this.width*0.05;
    sprite.position.y = this.height*0.05;
    return sprite;
  }

  createScore() {
    let text = new PIXI.Text('Steps: ', {font: 'bold 20px Arial',
      align:'center'});
    text.position.x = this.width*0.05;
    text.position.y = this.height*0.05;
    return text;
  }

  createScoreValue() {
    let text = new PIXI.Text('0', {font: 'bold 20px Arial',
      align:'center'});
    text.position.x = this.width*0.05 + 80;
    text.position.y = this.height*0.05;
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
