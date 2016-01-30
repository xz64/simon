/*global require*/
/*global EventEmitter*/

import PIXIRenderer from './PIXIRenderer';
import QuadrantButton from './QuadrantButton';
import OnOffSwitch from './OnOffSwitch';
import NotificationIcon from './NotificationIcon';
import WinnerIcon from './WinnerIcon';
import Scoreboard from './Scoreboard';
import StrictButton from './StrictButton';

export default class {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.gameRenderer = new PIXIRenderer(this.width, this.height);
    this.quadrantButtons = [];
    this.onOffSwitch = new OnOffSwitch(this.width, this.height);
    this.onOffSwitch.emitter.on('on', this.turnOn, this);
    this.onOffSwitch.emitter.on('off', this.turnOff, this);
    this.notifications = {
      success: new NotificationIcon(this.width, this.height,
        require('../../asset/check_mark.png')),
      failure: new NotificationIcon(this.width, this.height,
        require('../../asset/x_mark.png')),
      win: new WinnerIcon(this.width, this.height,
        require('../../asset/win.png'))
    };

    this.strictButton = new StrictButton(this.width, this.height);
    this.addRenderable(this.strictButton.getRenderables.call(
      this.strictButton));

    this.addRenderable(this.onOffSwitch.getRenderables.call(this.onOffSwitch));
    this.emitter = new EventEmitter();
    // TODO: put all renderables in an array and call addRenderable that way

    for(let i = 0; i < 4; i++) {
      this.quadrantButtons.push(new QuadrantButton(this.width, this.height,
        i+1));
      this.addRenderable(this.quadrantButtons[i].getRenderables.call(
        this.quadrantButtons[i]));
    }

    for(var msg in this.notifications) {
      if(!this.notifications.hasOwnProperty(msg)) {
        continue;
      }

      this.addRenderable(this.notifications[msg].getRenderables.call(
        this.notifications[msg]));
    }

    this.scoreboard = new Scoreboard(this.width, this.height);
    this.addRenderable(this.scoreboard.getRenderables.call(this.scoreboard));
  }

  turnOn() {
    this.emitter.emit('on');
  }

  turnOff() {
    this.emitter.emit('off');
  }

  addRenderable(item) {
    this.gameRenderer.addItem.call(this.gameRenderer, item);
  }

  render() {
    this.gameRenderer.render.call(this.gameRenderer);
  }
}
