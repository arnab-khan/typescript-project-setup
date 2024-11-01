export interface Cards {
    [key: string]: Card;
}

export interface Card {
    id?: string;
    title?: string;
    description?: string;
    imageLink?: string;
}