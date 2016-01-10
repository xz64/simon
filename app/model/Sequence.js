export default class {
  constructor(length) {
    this.sequence = [];

    if(!length) {
      length = 1;
    }

    for(let i = 0; i < length; i++) {
      this.addItem();
    }
  }

  addItem() {
    this.sequence.push(Math.floor(Math.random()*4)+1);
  }

  equal(array) {
    if(array.length !== this.sequence.length) {
      return false;
    }

    for(let i = 0; i < array.length; i++) {
      if(array[i] !== this.sequence[i]) {
        return false;
      }
    }

    return true;
  }

  equalSoFar(array) {
    for(let i = 0; i < array.length; i++) {
      if(array[i] !== this.sequence[i]) {
        return false;
      }
    }

    return true;
  }

}
