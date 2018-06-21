import { Moment } from 'moment';

export interface IHotel {
    id?: number;
    imageContentType?: string;
    image?: any;
    name?: string;
    type?: string;
    openTime?: Moment;
    closeTime?: Moment;
    city?: string;
    address?: string;
    pincode?: string;
    description?: string;
}

export class Hotel implements IHotel {
    constructor(
        public id?: number,
        public imageContentType?: string,
        public image?: any,
        public name?: string,
        public type?: string,
        public openTime?: Moment,
        public closeTime?: Moment,
        public city?: string,
        public address?: string,
        public pincode?: string,
        public description?: string
    ) {}
}
