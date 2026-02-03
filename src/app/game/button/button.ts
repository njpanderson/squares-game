import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  click = output<Event>();

  public type = input<'increment' | 'decrement'>('increment');
}
