import { Card } from './card';

export class Game {
    suits: string[] = ["♠", "♥", "♦", "♣"];
    deck: Card[] = [];
    peaks: [Card[]] = [[]];
    activeCard: Card;
    round: number;
    timer: number;
    score: number;
    chain: number;
    roundComplete: boolean;
    timerInterval: any;

    constructor() {
        this.score = 0;
        this.round = 0;
        this.newRound();
    }

    public newRound() : void {
        this.deck = this.createDeck();
        this.shuffleDeck(this.deck);
        this.peaks = this.createPeaks(this.deck);
        this.drawNextActiveCard();
        this.timer = 60 * 3;
        this.chain = 0;
        this.round++;
    }

    public tick() : void {
        this.timer -= 1;
        if(this.timer < 0) {
            this.timer = 0;
        }
    }

    public isDeckEmpty() : boolean {
        return this.deck.length <= 0;
    }

    public drawNextActiveCard() : Card {
        if(this.isDeckEmpty()) {
            return;
        }
        this.chain = 0;
        this.activeCard = this.deck.pop();
        this.activeCard.flip();
        return this.activeCard;
    }

    public isPickedCardValid(card: Card) : boolean {
        if(this.activeCard.value == 1) {
            return card.value == 13 || card.value == 2;
        } else if(this.activeCard.value == 13) {
            return card.value == 12 || card.value == 1;
        } else {
            return card.value == (this.activeCard.value + 1) || card.value == (this.activeCard.value - 1);
        }
    }

    public pickCard(card: Card) : void {
        if(!this.isPickedCardValid(card)) {
            return;
        }

        let clone = new Card(card.value, card.suit, true);
        card.setRemoved(true);
        this.activeCard = clone;
        this.checkForNewlyDiscoveredCards();
        this.chain++;
        this.score += this.chain * 50;
        this.roundComplete = this.peaks.every(p => p.every(c => c.removed));
    }

    private checkForNewlyDiscoveredCards() : void {
        /*
                0              10                 18
              1   2         11    12           19    20
            3   4   5    13    14    15     21    22    23
         6    7   8    9    16     17    24    25    26    27
        */

        let leftParent: number = 0;
        let rightParent: number = 1;

        for(let i = 0; i < this.peaks.length; i++) {
            let peak: Card[] = this.peaks[i];

            for(let j = 0; j < peak.length; j++) {
                let card: Card = peak[j];

                if(card.getRemoved() || card.getParents() == null || card.faceUp) {
                    continue;
                }

                if(card.getParents()[leftParent].getRemoved() && card.getParents()[rightParent].getRemoved()) {
                    card.flip();
                }
                
            }
        }
    }

    private isCardLeftEdgeInPeak(peakIndex: number) : boolean {
        return [1, 3, 6].indexOf(peakIndex) != -1;
    }

    private isCardRightEdgeInPeak(peak: number, peakIndex: number) : boolean {
        let rightEdges: [number] = peak == 1 ? [2, 5, 7] : [2, 5, 9];
        return rightEdges.indexOf(peakIndex) != -1;
    }

    private getRowForCardIndex(index: number) : number {
        switch(index) {
            case 0: return 1;
            case 1:
            case 2:
                return 2;
            case 3:
            case 4:
            case 5:
                return 3;
            case 6:
            case 7:
            case 8:
            case 9:
                return 4;
            default: 
                throw new RangeError("index out of range");
        }
    }

    private createPeaks(deck: Card[]) : [Card[]] {
        let numberOfPeaks: number = 3;
        let numberOfParents: number = 2;
        let leftParent: number = 0;
        let rightParent: number = 1;
        let numberOfRowsInPeak: number = 4;
        let peaks:[Card[]] = [[],[],[]];

        for(let i = 0; i < numberOfPeaks; i++) {
            peaks[i] = this.createPeak(deck, (i+1) % 2 == 0);
        }

        for(let i = 0; i < numberOfPeaks; i++) {
            for(let j = 0; j < peaks[i].length; j++) {
                let parents: [Card] = [null, null];
                let card: Card = peaks[i][j];

                switch(card.row) {
                    case 1:
                        parents[leftParent] = peaks[i][1];
                        parents[rightParent] = peaks[i][2];
                        break;
                    case 2:
                        parents[leftParent] = peaks[i][j+2];
                        parents[rightParent] = peaks[i][j+3];
                        break;
                    case 3:
                        if(i == 1) {
                            if(this.isCardLeftEdgeInPeak(j)) {
                                parents[leftParent] = peaks[i-1][j+6];
                            } else {
                                parents[leftParent] = peaks[i][j+2];
                            }
                            
                            if(this.isCardRightEdgeInPeak(i, j)) {
                                parents[rightParent] = peaks[i+1][j+1];
                            } else {
                                parents[rightParent] = peaks[i][j+3];
                            }
                        } else {
                            parents[leftParent] = peaks[i][j+3];
                            parents[rightParent] = peaks[i][j+4];
                        }
                        break;
                }
                
                card.setParents(parents);
            }
        }

        return peaks;
    }

    private createPeak(deck: Card[], middle: boolean) : Card[] {
        let cardsInPeak: number = middle ? 8 : 10;
        let peakCards: Card[] = [];

        for(let i = 0; i < cardsInPeak; i++) {
            let card = deck.pop();
            card.setRow(this.getRowForCardIndex(i));
            card.setPeakIndex(i);
            card.setRemoved(false);

            if(i > 5) {
                card.flip();
            }

            peakCards.push(card);
        }

        return peakCards;
    }

    private createDeck() : Card[] {
        let deck: Card[] = [];
        for(let suit of this.suits) {
            for(let i = 1; i <= 13; i++) {
                deck.push(new Card(i, suit, false));
            }
        }
        return deck;
    }

    private shuffleDeck(deck: Card[]) : void {
        let j: number;
        let x: Card;

        for (let i = deck.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = deck[i - 1];
            deck[i - 1] = deck[j];
            deck[j] = x;
        }
    }
}