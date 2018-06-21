export interface IStaff {
    id?: number;
    name?: string;
    contactNo?: string;
    address?: string;
    hotelId?: number;
}

export class Staff implements IStaff {
    constructor(public id?: number, public name?: string, public contactNo?: string, public address?: string, public hotelId?: number) {}
}
