/*global PIXI*/
/*global require*/
/*global Promise*///

export default class {
  constructor() {
    this.loader = PIXI.loader;
  }

  ready() {
    return new Promise(this.loadAssets.bind(this)).then((resources) => {
      this.resources = resources;
      Promise.resolve(resources);
    });
  }

  getURL(item) {
    return this.resources[item].url;
  }

  loadAssets(resolve) {
    this.loader.add('check_mark', require('../../asset/check_mark.png'));
    this.loader.add('x_mark', require('../../asset/x_mark.png'));
    this.loader.add('win', require('../../asset/win.png'));
    this.loader.add('sound1', require('../../asset/simonSound1.mp3'));
    this.loader.add('sound2', require('../../asset/simonSound2.mp3'));
    this.loader.add('sound3', require('../../asset/simonSound3.mp3'));
    this.loader.add('sound4', require('../../asset/simonSound4.mp3'));
    this.loader.load();
    this.loader.once('complete', (loader, resources) => {
      resolve(resources);
    });
  }
}
