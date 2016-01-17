export default class {
  constructor(gameEmitter, notifications) {
    this.gameEmitter = gameEmitter;
    this.notifications = notifications;
    this.gameEmitter.on('notification_on', this.showNotification, this);
    this.gameEmitter.on('notification_off', this.hideNotification, this);
  }

  showNotification(type) {
    console.log("SHOW");
    this.notifications[type].show();
  }

  hideNotification(type) {
    console.log("HIDE");
    this.notifications[type].hide();
  }
}
