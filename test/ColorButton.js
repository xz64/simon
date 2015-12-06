import test from 'tape';
import ColorButton from '../app/ColorButton';

function CanInstantiateColorButton() {
  test('Can instantiate ColorButton', (assert) => {
    assert.ok(new ColorButton(600, 600, 1));
    assert.end();
  });
}

CanInstantiateColorButton();
