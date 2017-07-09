import { Component, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Card } from './card';

@Component({
  selector: 'peak-row',
  templateUrl: './peak-row.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PeakRowComponent {
    @Input() peak: Card[];
    @Input() peakIndex: number;
    @Input() row: number;
    @Output() onPickedCard = new EventEmitter<any>();

    constructor() {

    }

    pickCard(card: Card) : void {
        this.onPickedCard.emit(card);
    }
}
