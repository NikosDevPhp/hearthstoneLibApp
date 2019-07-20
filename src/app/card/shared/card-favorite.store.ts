import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Card } from './card.model';

@Injectable()
export class FavoriteCardStore {
    private _favoriteCardSubject = new BehaviorSubject({});

    constructor(private storage: Storage) {
        this.loadInitialData();
    }

    get favoriteCards(): Observable<any> {
        return this._favoriteCardSubject.asObservable();
    }

    private loadInitialData() {
        this.storage.get('favoriteCards').then((favoriteCards) => {
            this._favoriteCardSubject.next(favoriteCards || {});
        });
    }

    public toggleCard(card: Card) {
        const favoriteCards = this._favoriteCardSubject.getValue();
        if (card.favorite) {
            card.favorite = false;
            delete favoriteCards[card.cardId];
        } else {
            card.favorite = true;
            favoriteCards[card.cardId] = card;
        }
        this.storage.set('favoriteCards', favoriteCards).then(() => {
            this._favoriteCardSubject.next(favoriteCards);
        });
    }
 }
