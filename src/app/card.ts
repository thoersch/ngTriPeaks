export class Card {
    value: number;
    suit: string;
    faceUp: boolean;
    row: number;
    peakIndex: number;
    removed: boolean;
    parents: [Card];

    constructor(value: number, suit: string, faceUp: boolean) {
        this.value = value;
        this.suit = suit;
        this.faceUp = faceUp;
    }

    flip() : void {
        this.faceUp = !this.faceUp;
    }

    isBlackSuit() {
        return this.suit == "♠" || this.suit == "♣";
    }

    isRedSuit() {
        return this.suit == "♥" || this.suit == "♦";
    }

    setRow(row: number) : void {
        this.row = row;
    }

    getRow() : number {
        return this.row;
    }

    setPeakIndex(peakIndex: number) : void {
        this.peakIndex = peakIndex;
    }

    getPeakIndex() : number {
        return this.peakIndex;
    }

    setRemoved(removed: boolean) : void {
        this.removed = removed;
    }

    getRemoved() : boolean {
        return this.removed;
    }

    setParents(parents: [Card]) : void {
        this.parents = parents;
    }

    getParents() : [Card] {
        return this.parents;
    }
 }