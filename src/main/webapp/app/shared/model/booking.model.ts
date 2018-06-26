import { Moment } from 'moment';

export interface IBooking {
    id?: number;
    bookDate?: Moment;
    bookTime?: string;
    noOfGuest?: number;
    hotelName?: string;
    hotelId?: number;
    hotelTableTableNumber?: string;
    hotelTableId?: number;
}

export class Booking implements IBooking {
    constructor(
        public id?: number,
        public bookDate?: Moment,
        public bookTime?: string,
        public noOfGuest?: number,
        public hotelName?: string,
        public hotelId?: number,
        public hotelTableTableNumber?: string,
        public hotelTableId?: number
    ) {}
}
