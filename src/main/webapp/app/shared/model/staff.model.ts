export interface IStaff {
    id?: number;
    hotelName?: string;
    name?: string;
    contactNo?: string;
    address?: string;
    hotelId?: number;
}

export class Staff implements IStaff {
    constructor(public id?: number, public hotelName?: string, public name?: string, public contactNo?: string, public address?: string, public hotelId?: number) {}
}
