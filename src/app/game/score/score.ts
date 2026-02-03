import { Component } from '@angular/core';
import { GameService } from '../../game-service';

@Component({
  selector: 'app-score',
  imports: [],
  templateUrl: './score.html',
  styleUrl: './score.scss',
})
export class Score {
  constructor(public game: GameService) { }
}
