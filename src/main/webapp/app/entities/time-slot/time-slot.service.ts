import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITimeSlot } from 'app/shared/model/time-slot.model';

type EntityResponseType = HttpResponse<ITimeSlot>;
type EntityArrayResponseType = HttpResponse<ITimeSlot[]>;

@Injectable({ providedIn: 'root' })
export class TimeSlotService {
    private resourceUrl = SERVER_API_URL + 'api/time-slots';

    constructor(private http: HttpClient) {}

    create(timeSlot: ITimeSlot): Observable<EntityResponseType> {
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
}
