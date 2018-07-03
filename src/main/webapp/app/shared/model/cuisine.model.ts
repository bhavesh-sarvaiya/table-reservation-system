export const enum FoodType {
    GUJARATI = 'GUJARATI',
    PUNJABI = 'PUNJABI',
    SOUTHINDIAN = 'SOUTHINDIAN',
    CHINESE = 'CHINESE',
    RAJASTHANI = 'RAJASTHANI',
    ITALIAN = 'ITALIAN',
    FRENCH = 'FRENCH',
    AMERICAN = 'AMERICAN',
    MEXICAN = 'MEXICAN'
}

export interface ICuisine {
    id?: number;
    type?: FoodType;
    foodImageContentType?: string;
    foodImage?: any;
    hotelName?: string;
    hotelId?: number;
}

export class Cuisine implements ICuisine {
    constructor(
        public id?: number,
        public type?: FoodType,
        public foodImageContentType?: string,
        public foodImage?: any,
        public hotelName?: string,
        public hotelId?: number
    ) {}
}
