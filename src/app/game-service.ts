import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public score = signal(5);

  increment() {
    this.score.update((score) => score + 1);
  }

  decrement() {
    this.score.update((score) => score - 1);
  }

  resetScore() {
    this.score.set(5);
  }
}
