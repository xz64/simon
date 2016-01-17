
export default class {
  constructor(width, height, imageURL) {
    this.width = width;
    this.height = height;
    this.emitter = new EventEmitter();
    this.graphicsContainer = new PIXI.Container();
    this.imageURL = imageURL;
    this.img = new Image();
    this.img.src = this.imageURL;
    this.sprite = this.createSprite(this.imageURL);
    this.graphicsContainer.addChild(this.sprite);
    this.hide();
  }

  createSprite(filename) {
    let sprite = new PIXI.Sprite.fromImage(filename);
    /* TODO use asset preloader to avoid magic numbers */
    sprite.position.x = this.width/2 - 64;
    sprite.position.y = this.height/2 - 64;
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
