import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PeakRowComponent } from './peak-row.component';
import { PeakRowPipe } from './peak-row.pipe';
import { Card } from './card';
import { Game } from './game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  game: Game;

  constructor() {
     this.game = new Game();

     setInterval(() => this.game.tick(), 1000);
  }

  drawFromDeck() : void {
    if(this.game.isDeckEmpty()) {
      return;
    }

    this.game.drawNextActiveCard();
  }

  pickedCard(card: Card) : void {
    this.game.pickCard(card);
  }

  restartGame() : void {
    window.location.reload();
  }

  nextRound() : void {
    this.game.newRound();
  }
}
