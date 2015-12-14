export default class {
  constructor(width, height) {
    this.renderer = new PIXI.WebGLRenderer(width, height,
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
