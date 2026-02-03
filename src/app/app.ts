import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Game } from './game/game';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet, Game],
  imports: [Game],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('chris-game');
}
