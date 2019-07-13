import { Injectable } from '@angular/core';
import { of as ObservableOf, Observable} from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { CardDeck } from './card.model';

@Injectable()
export class CardService {

    private readonly HS_API_URL = 'https://omgvamp-hearthstone-v1.p.rapidapi.com';
    private readonly API_HOST = 'omgvamp-hearthstone-v1.p.rapidapi.com';
    private readonly API_KEY = 'adaaae7e3amsh90128a566197339p13417ejsn556edef7195d';
    private headers: HttpHeaders = new HttpHeaders();

    constructor(private http: HttpClient) {}

    public getAllCardDecks(): Observable<CardDeck[]> {
        this.headers = this.headers.append('X-RapidAPI-Host', this.API_HOST);
        this.headers = this.headers.append('X-RapidAPI-Key', this.API_KEY);

        return this.http.get<CardDeck[]>(`${this.HS_API_URL}/info`,{headers: this.headers});
    }
}
