import { Injectable } from '@angular/core';
import { of as ObservableOf, Observable} from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { CardDeck, Card } from './card.model';

@Injectable()
export class CardService {

    private readonly HS_API_URL = 'https://omgvamp-hearthstone-v1.p.rapidapi.com';
    private readonly API_HOST = 'omgvamp-hearthstone-v1.p.rapidapi.com';
    private readonly API_KEY = 'adaaae7e3amsh90128a566197339p13417ejsn556edef7195d';
    private headers: HttpHeaders = new HttpHeaders();

    constructor(private http: HttpClient) {
        this.headers = this.headers.append('X-RapidAPI-Host', this.API_HOST);
        this.headers = this.headers.append('X-RapidAPI-Key', this.API_KEY);
    }

    public replaceCardTextLine(text: string) {
        return text ? text.replace(new RegExp('\\\\n', 'g'), ' ') : 'No Description';
    }

    public getAllCardDecks(): Observable<CardDeck[]> {
        return this.http.get<CardDeck[]>(`${this.HS_API_URL}/info`, {headers: this.headers});
    }

    public getCardsByDeck(cardDeckGroup: string, cardDeck: string): Observable<Card[]> {
        return this.http.get<Card[]>(`${this.HS_API_URL}/cards/${cardDeckGroup}/${cardDeck}`, {headers: this.headers});
    }

    public getCardByName(name: string): Observable<Card[]> {
        return this.http.get<Card[]>(`${this.HS_API_URL}/cards/${name}`, {headers: this.headers});
    }
}
