
export default class {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.emitter = new EventEmitter();
    this.graphicsContainer = new PIXI.Container();
    this.imageURL = require('../../asset/check_mark.png');
    this.img = new Image();
    this.img.src = this.imageURL;
    this.base = new PIXI.BaseTexture(this.img);
    this.texture = new PIXI.Texture(this.base);
    this.sprite = this.createSprite(this.texture);
    this.graphicsContainer.addChild(this.sprite);
    this.hide();
  }

  createSprite(texture) {
    let sprite = new PIXI.Sprite(texture);
    sprite.interactive = true;
    sprite.buttonMode = true;
    return sprite;
  }

  getRenderables() {
    return this.graphicsContainer;
  }

  show() {
    this.graphicsContainer.visible = true;
  }

  hide() {
    this.graphicsContainer.visible = false;
  }
}
