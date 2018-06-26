export interface IHotelTable {
    id?: number;
    tableNumber?: string;
    noOfCustomer?: number;
    hotelId?: number;
    hotelName?: string;
}

export class HotelTable implements IHotelTable {
    constructor(
        public id?: number,
        public hotelName?: string,
        public tableNumber?: string,
        public noOfCustomer?: number,
        public hotelId?: number) {}
}