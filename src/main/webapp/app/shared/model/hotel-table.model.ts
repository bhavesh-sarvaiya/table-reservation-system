export interface IHotelTable {
    id?: number;
    tableNumber?: string;
    noOfCustomer?: number;
    hotelId?: number;
}

export class HotelTable implements IHotelTable {
    constructor(public id?: number, public tableNumber?: string, public noOfCustomer?: number, public hotelId?: number) {}
}
