

export interface  CardDeck {
    name: string;
    types: string[];
}

export interface Card {
    cardId: string;
    cardSet: string;
    dbfId: number;
    health: number;
    img: string;
    imgGold: string;
    locale: string;
    name: string;
    playerClass: string;
    text: string;
    type: string;
    cost: number;
    attack: number;
    rarity: string;
    title: string;
    favorite: boolean;
}
