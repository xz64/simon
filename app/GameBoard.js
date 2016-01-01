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
import OnOffSwitch from './OnOffSwitch';
import StrictButton from './StrictButton';
import RestartButton from './RestartButton';

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
    this.onOffSwitch = new OnOffSwitch(this.width, this.height,
      this.onCallback.bind(this), this.offCallback.bind(this));
    this.strictButton = new StrictButton(this.width, this.height,
      this.strictOnCallback.bind(this), this.strictOffCallback.bind(this));
    this.restartButton = new RestartButton(this.width, this.height,
      this.restartCallback.bind(this));
    this.gameRenderer.addItem.call(this.gameRenderer,
      this.scoreboard.getRenderables.call(this.scoreboard));
    this.gameRenderer.addItem.call(this.gameRenderer,
      this.onOffSwitch.getRenderables.call(this.onOffSwitch));
    this.gameRenderer.addItem.call(this.gameRenderer,
      this.strictButton.getRenderables.call(this.strictButton));
    this.gameRenderer.addItem.call(this.gameRenderer,
      this.restartButton.getRenderables.call(this.restartButton));

    this.gameStateManager.changeState.call(this.gameStateManager, 
      new OffState(this.gameStateManager));
    this.gameEngine.startGame();
  }

  restartCallback() {
    this.sequence = new Sequence(1);
    this.scoreboard.resetScore.call(this.scoreboard);
    this.gameStateManager.changeState.call(this.gameStateManager,
      this.createPlayingPatternState(this.sequence));
  }

  strictOnCallback() {
    this.strict = true;
  }

  strictOffCallback() {
    this.strict = false;
  }

  successInputCallback() {
    this.scoreboard.incrementScore.call(this.scoreboard);
    this.sequence.addItem.call(this.sequence);
    return this.createPlayingPatternState(this.sequence);
  }

  errorInputCallback() {
    if(this.strict) {
      this.sequence = new Sequence(1);
      this.scoreboard.resetScore.call(this.scoreboard);
    }
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

  offCallback() {
    this.gameStateManager.changeState.call(this.gameStateManager,
      new OffState());
  }

  onCallback() {
    this.sequence = new Sequence(1);
    this.scoreboard.resetScore.call(this.scoreboard);
    this.gameStateManager.changeState.call(this.gameStateManager,
      this.createPlayingPatternState(this.sequence));
  }
}
