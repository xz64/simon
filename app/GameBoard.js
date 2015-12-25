import GameEngine from './GameEngine';
import GameStateManager from './GameStateManager';
import GameRenderer from './GameRenderer';
import ColorButton from './ColorButton';
import Scoreboard from './Scoreboard';
import Audio from './Audio';
import InputState from './InputState';
import PlayingPatternState from './PlayingPatternState';
import OffState from './OffState';

export default class {
  constructor(width, height) {
    this.width = width;
    this.height = height;
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

    this.istate = new InputState(
      this.gameStateManager, 
      this.colorButtons,
      [1,2],
      this.successInputCallback.bind(this),
      this.errorInputCallback.bind(this)
    );
    this.istate.addObserver.call(this.istate, this);
    this.gameStateManager.changeState(this.istate);
    this.gameEngine.startGame();
  }

  successInputCallback() {
    this.scoreboard.incrementScore.call(this.scoreboard);
    return new PlayingPatternState(this.gameStateManager, this.colorButtons, 
      [1,2,3], this.playingDoneCallback.bind(this));
  }

  errorInputCallback() {
    this.scoreboard.resetScore();
    return new PlayingPatternState(this.gameStateManager, this.colorButtons,
     [1,2], this.playingDoneCallback.bind(this));
  }

  playingDoneCallback() {
    return new InputState(this.gameStateManager, this.colorButtons, [1],
      this.successInputCallback.bind(this), this.errorInputCallback.bind(this));
  }
}
