/*global PIXI*/
/*global require*/

export default class {
  constructor() {
    this.loader = PIXI.loader;
  }

  ready() {
    return new Promise(this.loadAssets.bind(this));
  }

  loadAssets(resolve) {
    this.loader.add('check_mark', require('../../asset/check_mark.png'));
    this.loader.add('x_mark', require('../../asset/x_mark.png'));
    this.loader.add('win', require('../../asset/win.png'));
    this.loader.load();
    this.loader.once('complete', (loader, resources) => {
      resolve(resources);
    });
  }
}
