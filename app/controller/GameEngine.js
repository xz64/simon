export default class {
  constructor(updateCallback, renderCallback) {
    this.updateCallback = updateCallback;
    this.renderCallback = renderCallback;
    this.currentTime = null;
    this.previousTime = null;
    this.timeElapsed = null;
    this.MS_PER_UPDATE = 1000/30;
    this.gameLoop = this.gameLoop.bind(this);
    this.lag = null; 
  }

  gameLoop() {
    this.currentTime = performance.now();
    this.timeElapsed = this.currentTime - this.previousTime;
    this.previousTime = this.currentTime;
    this.lag += this.timeElapsed;
    
    while(this.lag >= this.MS_PER_UPDATE) {
      this.updateCallback(this.lag / this.MS_PER_UPDATE);
      this.lag -= this.MS_PER_UPDATE;
    }

    this.renderCallback();
    requestAnimationFrame(this.gameLoop);
  }

  startGame() {
    this.renderCallback();
    this.previousTime = performance.now();
    this.gameLoop();
  }
}
