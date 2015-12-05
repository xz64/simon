import test from 'tape';
import SequenceGenerator from '../app/SequenceGenerator';

/* Test length of returned sequence */
function SequenceIsCorrectLength(length) {
  return (assert) => {
    let sequence = SequenceGenerator.generateSequence(length);
    assert.equal(sequence.length, length, 'Sequence length is correct');
    assert.end();
  };
}

let length_tests = [0,3,15];
let i;

for(i = 0; i < length_tests.length; i++) {
  test('Returned sequence length is correct (sequence length: ' +
    length_tests[i] + ')', SequenceIsCorrectLength(length_tests[i]));
}

/* Test validity of items in each sequence */
function inRange(x) {
  return x >= 0 && x <= 3;
}

function SequenceItemsAreInRange(length) {
  return (assert) => {
    let sequence = SequenceGenerator.generateSequence(length);
    let i;
    for(i = 0; i < sequence.length; i++) {
      if(!inRange(sequence[i])) {
        assert.fail('Sequence item out of range, found: ' + sequence[i]);
        assert.end();
        break;
      }
    }
    assert.pass('All items within range');
    assert.end();
  };
}

for(i = 0; i < length_tests.length; i++) {
  test('Items within expected range (sequence length: ' + length_tests[i] + ')',
    SequenceItemsAreInRange(length_tests[i]));
}
