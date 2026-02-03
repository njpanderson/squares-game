import { Component, signal, computed } from '@angular/core';
import { Button } from "./button/button";
import { Score } from "./score/score";
import { GameService } from '../game-service';

@Component({
  selector: 'app-game',
  imports: [Button, Score],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game {
  constructor(public game: GameService) {}

  state = signal<'intro' | 'run' | 'score'>('intro');
  interval = signal<null | number>(null);
  phase = signal<null | 'increment' | 'decrement'>(null);
  x = signal<number>(0);
  y = signal<number>(0);
  canvasClass = signal('');

  private dimensions: [[number, number], [number, number]] = [[0, 450], [0, 420]];

  public running = computed(() => (this.state() === 'run'));
  public ingame = computed(() => (this.state() === 'run' || this.state() === 'score'));

  private timer = signal<number | undefined>(undefined);

  start() {
    this.state.set('run');
    this.game.resetScore();
    this.createShape();
  }

  stop() {
    if (!this.running()) return;
    if (this.timer()) clearTimeout(this.timer());

    this.phase.set(null);
    this.state.set('score');
  }

  createShape() {
    if (!this.running()) return;
    if (this.timer()) clearTimeout(this.timer());

    this.canvasClass.set('');

    // Choose increment or decrement
    if (Math.random() * 10 > 5) {
      this.phase.set('increment');
    } else {
      this.phase.set('decrement');
    }

    // Choose position
    this.x.set(this.getRandomCoordinate(this.dimensions[0]));
    this.y.set(this.getRandomCoordinate(this.dimensions[1]));

    this.timer.set(setTimeout(() => { this.removeShape(); }, (800 + Math.random() * 1000)));
  }

  buttonClicked() {
    this.removeShape(true);
  }

  removeShape(clicked = false) {
    if (!this.running()) return;
    if (this.timer()) clearTimeout(this.timer());

    if (this.phase() === 'decrement') {
      // Decrement phase
      if (clicked) {
        this.game.decrement();
        this.canvasClass.set('decremented');
      }
    } else if (this.phase() === 'increment') {
      if (!clicked) {
        this.game.decrement();
        this.canvasClass.set('decremented');
      } else {
        this.game.increment();
        this.canvasClass.set('incremented');
      }
    }

    if (this.game.score() >= 10 || this.game.score() <= 0) {
      this.stop();
    }

    this.phase.set(null);

    this.timer.set(setTimeout(this.createShape.bind(this), (1000 + Math.random() * 3000)));
  }

  private getRandomCoordinate(bounds: [number, number]): number {
    return bounds[0] + Math.random() * bounds[1];
  }
}
