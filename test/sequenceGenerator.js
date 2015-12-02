import test from 'tape';
import sequenceGenerator from '../app/sequenceGenerator';

function testLength(length) {
  return (assert) => {
    let sequence3 = sequenceGenerator.generateSequence(length);
    assert.equal(sequence3.length, length);
    assert.end();
  };
}

let length_tests = [0,3,15];
let i;

for(i = 0; i < length_tests.length; i++) {
  test('Returned sequence length is correct (length: ' + length_tests[i] + ')',
    testLength(length_tests[i]));
}
