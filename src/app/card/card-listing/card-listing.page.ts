import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../shared/card.service';
import { Card } from '../shared/card.model';
import { LoaderService } from '../../shared/service/loader.service';
import { ToastService } from '../../shared/service/toast.service';
import { FavoriteCardStore } from '../shared/card-favorite.store';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-card-listing',
  templateUrl: './card-listing.page.html',
  styleUrls: ['./card-listing.page.scss'],
})
export class CardListingPage {

  cardDeckGroup: string;
  cardDeck: string;
  cards: any[] = [];
  copyOfCards: Card[] = [];
  isLoading = false;

  favoriteCards: any = {};
  favoriteCardSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private cardService: CardService,
              private loaderService: LoaderService,
              private toastService: ToastService,
              private favoriteCardStore: FavoriteCardStore) {
    this.favoriteCardSubscription = this.favoriteCardStore.favoriteCards.subscribe((favoriteCards: any) => {
      this.favoriteCards = favoriteCards;
    });
  }

  ionViewDidLeave() {
    if (this.favoriteCardSubscription && !this.favoriteCardSubscription.closed) {
      this.favoriteCardSubscription.unsubscribe();
    }
  }

  private getCards() {
    this.loaderService.presentLoading('Loading Card List');

    this.cardService.getCardsByDeck(this.cardDeckGroup, this.cardDeck).subscribe(
        (cards: Card[]) => {
          this.cards = cards.map((card: Card) => {
            card.text = this.cardService.replaceCardTextLine(card.text);
            card.favorite = this.isCardFavorite(card.cardId);
            return card;
          });
          this.copyOfCards = Array.from(this.cards);
          this.loaderService.dismissLoading();
        }, () => {
          this.loaderService.dismissLoading();
          this.toastService.presentErrorToast('Cards could not be loaded');
        });
  }

  private isCardFavorite(cardId: string): boolean {
    const card = this.favoriteCards[cardId];

    return card ? true : false;
  }

  ionViewWillEnter() {
    this.cardDeckGroup = this.route.snapshot.paramMap.get('cardDeckGroup');
    this.cardDeck = this.route.snapshot.paramMap.get('cardDeck');

    if (this.cards && this.cards.length === 0 ) {
      this.getCards();
    }
  }

  doRefresh(event) {
    this.getCards();
    event.target.complete();
  }

  handleSearchStart() {
    this.isLoading = true;
  }

  hydrateCards(filteredCards: Card[]) {
    this.cards = filteredCards;
    this.isLoading = false;
  }

  makeFavoriteCard(card: Card) {
    this.favoriteCardStore.toggleCard(card);
  }


}
