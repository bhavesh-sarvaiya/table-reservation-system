import { Moment } from 'moment';

export interface IBooking {
    id?: number;
    bookDate?: Moment;
    bookTime?: string;
    noOfGuest?: number;
    active?: boolean;
    hotelName?: string;
    hotelId?: number;
    hotelTableTableNumber?: string;
    hotelTableId?: number;
    userLogin?: string;
    userId?: number;
}

export class Booking implements IBooking {
    constructor(
        public id?: number,
        public bookDate?: Moment,
        public bookTime?: string,
        public noOfGuest?: number,
        public active?: boolean,
        public hotelName?: string,
        public hotelId?: number,
        public hotelTableTableNumber?: string,
        public hotelTableId?: number,
        public userLogin?: string,
        public userId?: number
    ) {
        this.active = false;
    }
}
