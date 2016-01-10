import GameRenderer from './GameRenderer';

export default class extends GameRenderer {
  constructor(width, height) {
    super(width, height);
    this.renderer = PIXI.autoDetectRenderer(width, height,
      {antialiasing: true});
    this.renderer.autoResize = true;
    this.renderer.view.style.position = 'absolute';
    this.renderer.view.style.display = 'block';
    this.renderer.resize(width, height);
    this.stage = new PIXI.Container();
    this.stage.interactive = true;
    this.renderer.render(this.stage);
    document.body.appendChild(this.renderer.view);    
  }
  
  addItem(item) {
    this.stage.addChild(item);
  }

  render() {
    this.renderer.render(this.stage);
  }
}
