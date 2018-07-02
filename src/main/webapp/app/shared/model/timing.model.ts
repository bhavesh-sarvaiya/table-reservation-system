export interface ITiming {
    id?: number;
    startTime?: string;
    endTime?: string;
    rushHour?: boolean;
    timeSlotDay?: string;
    timeSlotId?: number;
}

export class Timing implements ITiming {
    constructor(
        public id?: number,
        public startTime?: string,
        public endTime?: string,
        public rushHour?: boolean,
        public timeSlotDay?: string,
        public timeSlotId?: number
    ) {
        this.rushHour = false;
    }
}
