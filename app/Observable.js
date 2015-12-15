export default class {
  constructor() {
    this.observers = [];
  }

  addObserver(o) {
    this.observers.push(o);
  }

  removeObserver(o) {
    let index = this.observers.indexOf(o);

    if(index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(evt) {
    for(let i = 0; i < this.observers.length; i++) {
      this.observers[i].onNotify.call(this.observers[i], evt);
    }
  }
}
