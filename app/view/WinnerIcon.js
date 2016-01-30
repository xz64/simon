/*global PIXI*/

import NotificationIcon from './NotificationIcon';

export default class extends NotificationIcon {
  constructor(width, height, imageURL) {
    super(width, height, imageURL);
    this.text = this.createText();
    this.graphicsContainer.addChild(this.text);
    this.hide();
  }

  createText() {
    let text = new PIXI.Text('You win!', {font: '72px Arial', fill: 'lime'});
    text.position.x = this.width * 0.5 - text.width / 2;
    text.position.y = this.height * 0.20;
    return text;
  }
}
