export const enum DayName {
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THRUSDAY = 'THRUSDAY',
    FRIDAY = 'FRIDAY',
    SATURDAY = 'SATURDAY',
    SUNDAY = 'SUNDAY'
}

export interface ITimeSlot {
    id?: number;
    day?: DayName;
    status?: boolean;
    hotelName?: string;
    hotelId?: number;
}

export class TimeSlot implements ITimeSlot {
    constructor(public id?: number, public day?: DayName, public status?: boolean, public hotelName?: string, public hotelId?: number) {
        this.status = false;
    }
}
