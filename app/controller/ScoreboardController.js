export default class {
  constructor(scoreEmitter, scoreView) {
    this.scoreEmitter = scoreEmitter;
    this.scoreView = scoreView;
    this.scoreEmitter.on('score', this.updateScoreView, this);
  }

  updateScoreView(score) {
    this.scoreView.setValue.call(this.scoreView, score);
  }
}
