import test from 'tape';
import sequenceGenerator from '../app/sequenceGenerator';

/* Test length of returned sequence */
function testLength(length) {
  return (assert) => {
    let sequence = sequenceGenerator.generateSequence(length);
    assert.equal(sequence.length, length);
    assert.end();
  };
}

let length_tests = [0,3,15];
let i;

for(i = 0; i < length_tests.length; i++) {
  test('Returned sequence length is correct (length: ' + length_tests[i] + ')',
    testLength(length_tests[i]));
}

/* Test validity of items in each sequence */
function inRange(x) {
  return x >= 0 && x <= 3;
}

function testItems(length) {
  return (assert) => {
    let sequence = sequenceGenerator.generateSequence(length);
    let i;
    for(i = 0; i < sequence.length; i++) {
      assert.assert(inRange(sequence[i]));
    }
    assert.end();
  };
}

for(i = 0; i < length_tests.length; i++) {
  test('Items between 0 & 3 (length: ' + length_tests[i] + ')',
    testItems(length_tests[i]));
}
