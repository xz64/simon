import test from 'tape';

test('A passing test', (assert) => {
    assert.pass('This test will pass.');
    assert.end();
});

test('Assertions with tape.', (assert) => {
    assert.equal(1, 1,
      'Given two mismatched values, .equal() should produce a nice bug report');
    assert.end();
});
