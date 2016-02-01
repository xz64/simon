/*global EventEmitter*/
/*global Promise*/

import PIXIRenderer from './PIXIRenderer';
import QuadrantButton from './QuadrantButton';
import OnOffSwitch from './OnOffSwitch';
import NotificationIcon from './NotificationIcon';
import WinnerIcon from './WinnerIcon';
import Scoreboard from './Scoreboard';
import StrictButton from './StrictButton';
import AssetManager from './AssetManager';

export default class {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.gameRenderer = new PIXIRenderer(this.width, this.height);
    this.quadrantButtons = [];
    this.onOffSwitch = new OnOffSwitch(this.width, this.height);
    this.onOffSwitch.emitter.on('on', this.turnOn, this);
    this.onOffSwitch.emitter.on('off', this.turnOff, this);
    this.strictButton = new StrictButton(this.width, this.height);
    this.emitter = new EventEmitter();
    this.assetManager = new AssetManager();
    for(let i = 0; i < 4; i++) {
      this.quadrantButtons.push(new QuadrantButton(this.width, this.height,
        i+1));
    }
    this.scoreboard = new Scoreboard(this.width, this.height);

    this.loadAssets = this.assetManager.ready.call(this.assetManager);
    this.ready = this.loadAssets.then(this.onAssetsLoaded.bind(this));
  }

  getAsset(item) {
    return this.assetManager.getURL.call(this.assetManager, item);
  }

  onAssetsLoaded() {
    this.notifications = {
      success: new NotificationIcon(this.width, this.height,
        this.getAsset('check_mark')),
      failure: new NotificationIcon(this.width, this.height,
        this.getAsset('x_mark')),
      win: new WinnerIcon(this.width, this.height,
        this.getAsset('win'))
    };
    this.addAllRenderables();
    return Promise.resolve();
  }

  turnOn() {
    this.emitter.emit('on');
  }

  turnOff() {
    this.emitter.emit('off');
  }

  addAllRenderables() {
    this.addRenderable(this.strictButton.getRenderables.call(
      this.strictButton));
    this.addRenderable(this.onOffSwitch.getRenderables.call(this.onOffSwitch));

    for(let i = 0; i < 4; i++) {
      this.addRenderable(this.quadrantButtons[i].getRenderables.call(
        this.quadrantButtons[i]));
    }

    this.addRenderable(this.scoreboard.getRenderables.call(this.scoreboard));

    for(var msg in this.notifications) {
      if(!this.notifications.hasOwnProperty(msg)) {
        continue;
      }
      this.addRenderable(this.notifications[msg].getRenderables.call(
        this.notifications[msg]));
    }
  }

  addRenderable(item) {
    this.gameRenderer.addItem.call(this.gameRenderer, item);
  }

  render() {
    this.gameRenderer.render.call(this.gameRenderer);
  }
}
