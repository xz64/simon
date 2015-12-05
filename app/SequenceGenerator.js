export default class {
  static generateSequence(length) {
    let i;
    let sequence = [];

    for(i = 0; i < length; i++) {
      sequence.push(Math.floor(Math.random()*4));
    }

    return sequence;
  }
}
