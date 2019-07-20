import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../shared/card.service';
import { Card } from '../shared/card.model';
import { LoaderService } from '../../shared/service/loader.service';

@Component({
    selector: 'app-card-detail',
    templateUrl: './card-detail.page.html',
    styleUrls: ['./card-detail.page.scss']
})

export class CardDetailPage {

    name: string;
    card: Card;

    constructor(private route: ActivatedRoute,
                private service: CardService,
                private loaderService: LoaderService) {}

    ionViewWillEnter() {
        this.name = this.route.snapshot.paramMap.get('name');
        this.loaderService.presentLoading('Loading Card Page');
        this.service.getCardByName(this.name).subscribe(
            (card: Card[]) => {
                this.card = card.map((cardMap: Card) => {
                    cardMap.text = this.service.replaceCardTextLine(cardMap.text);
                    return cardMap;
                })[0];
                this.loaderService.dismissLoading();
            });
    }

    updateImage() {
        this.card.img = 'assets/image/DefaultCard.png';
    }
}

