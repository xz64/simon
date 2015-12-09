export default class {
  constructor() {
    this.observers = [];
  }

  addObserver(o) {
    this.observers.push();
  }

  removeObserver(o) {
    let index = observers.indexOf(o);

    if(index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObserver(evt) {
    for(let i = 0; i < observers.length; i++) {
      observers[i].onNotify(evt);
    }
  }
}
