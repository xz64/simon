import GameEngine from './GameEngine';
import GameStateManager from './GameStateManager';
import GameRenderer from './GameRenderer';
import ColorButton from './ColorButton';
import Scoreboard from './Scoreboard';
import Audio from './Audio';
import InputState from './InputState';
import PlayingPatternState from './PlayingPatternState';
import OffState from './OffState';
import Sequence from './Sequence';

export default class {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.strict = false;
    this.gameStateManager = new GameStateManager(this);
    this.updateCallback = this.gameStateManager.update.bind(
      this.gameStateManager);
    //this.renderCallback = this.gameStateManager.render.bind(
    this.gameRenderer = new GameRenderer(this.width, this.height);
    this.renderCallback = this.gameRenderer.render.bind(
      this.gameRenderer);
    this.gameEngine = new GameEngine(this.updateCallback, this.renderCallback);
    this.colorButtons = [];

    for(let i = 0; i < 4; i++) {
      this.colorButtons.push(new ColorButton(this.width, this.height, i+1, 
        new Audio()));
      this.gameRenderer.addItem.call(this.gameRenderer,
        this.colorButtons[i].sprite);
    }

    this.scoreboard = new Scoreboard(this.width, this.height);
    this.gameRenderer.addItem.call(this.gameRenderer,
      this.scoreboard.getRenderables.call(this.scoreboard));
    this.sequence = new Sequence(1);

    this.gameStateManager.changeState.call(this.gameStateManager,
      this.createPlayingPatternState(this.sequence));
    this.gameEngine.startGame();
  }

  successInputCallback() {
    this.scoreboard.incrementScore.call(this.scoreboard);
    this.sequence.addItem.call(this.sequence);
    return this.createPlayingPatternState(this.sequence);
  }

  errorInputCallback() {
    return this.createPlayingPatternState(this.sequence);
  }

  errorInputCallbackStrict() {
    this.scoreboard.resetScore.call(this.scoreboard);
    this.sequence = new Sequence(1);
    return this.errorInputCallback();
  }

  playingDoneCallback() {
    return this.createInputState(this.sequence);
  }

  createPlayingPatternState(pattern) {
    return new PlayingPatternState(this.gameStateManager, this.colorButtons,
      pattern, this.playingDoneCallback.bind(this));
  }

  createInputState(pattern) {
    let errorCallback = this.strict ? this.errorInputCallbackStrict.bind(this) :
      this.errorInputCallback.bind(this);
    return new InputState(this.gameStateManager, this.colorButtons,
      this.sequence, this.successInputCallback.bind(this), errorCallback);
  }
}
