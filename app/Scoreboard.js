export default class {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.boardSize = ( (width  < height) ? width : height ) - 30;
    this.graphicsContainer = new PIXI.Container();
    this.scoreLabel = this.createScoreLabel();
    this.scoreCounterLabel = this.createScoreCounterLabel();
    this.graphicsContainer.addChild(this.scoreLabel);
    this.graphicsContainer.addChild(this.scoreCounterLabel);
  }

  createScoreLabel() {
    let text = new PIXI.Text("Number of steps:", {font: "16px Arial",
      fill: "red"});

    return text;
  }

  createScoreCounterLabel() {
    let text = new PIXI.Text("1", {font: "16px Arial", fill: "red"});
    text.position.x = 130;
    return text;
  }

  setScore(value) {
    this.scoreCounterLabel.text = value;
  }

  incrementScore() {
    let currentScore = parseInt(this.scoreCounterLabel.text);
    this.scoreCounterLabel.text = (currentScore+1).toString();
  }

  resetScore() {
    this.scoreCounterLabel.text = "1";
  }

  getRenderables() {
    return this.graphicsContainer;
  }
}
