import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITimeSlot } from 'app/shared/model/time-slot.model';
import { ITiming } from 'app/shared/model/timing.model';
import { Hotel } from 'app/shared/model/hotel.model';

type EntityResponseType = HttpResponse<ITimeSlot>;
type EntityArrayResponseType = HttpResponse<ITimeSlot[]>;

@Injectable({ providedIn: 'root' })
export class TimeSlotService {
    private resourceUrl = SERVER_API_URL + 'api/time-slots';
    private resourceUrl1 = SERVER_API_URL + 'api/time-slots-timing';
    private resourceUrl2 = SERVER_API_URL + 'api/time-slots-hotel-day';
    private resourceUrl3 = SERVER_API_URL + 'api/time-slots-hotel';

    constructor(private http: HttpClient) {}

    create(timeslotDTO: ITimeSlot, timings: ITiming[]): Observable<EntityResponseType> {
        return this.http.post<ITimeSlot>(this.resourceUrl, { timeslotDTO, timings }, { observe: 'response' });
    }
    create1(timeSlot: ITimeSlot): Observable<EntityResponseType> {
        return this.http.post<ITimeSlot>(this.resourceUrl, timeSlot, { observe: 'response' });
    }

    update(timeSlot: ITimeSlot): Observable<EntityResponseType> {
        return this.http.put<ITimeSlot>(this.resourceUrl, timeSlot, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITimeSlot>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITimeSlot[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    updateWithTiming(timeslotDTO: ITimeSlot, timings: ITiming[]): Observable<EntityResponseType> {
        return this.http.put<ITimeSlot>(this.resourceUrl1, { timeslotDTO, timings }, { observe: 'response' });
    }
    findOneByHotelAndDay(hotelId: number, day: string): Observable<EntityResponseType> {
        const options = createRequestOption({ hotelId, day });
        return this.http.get<ITimeSlot>(this.resourceUrl2, { params: options, observe: 'response' });
    }

    findAllByHotel(hotelId: number): Observable<EntityArrayResponseType> {
        const options = createRequestOption({hotelId});
        return this.http.get<ITimeSlot[]>(this.resourceUrl3, { params: options, observe: 'response' });
    }
}
