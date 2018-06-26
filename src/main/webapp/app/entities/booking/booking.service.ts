import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBooking } from 'app/shared/model/booking.model';

type EntityResponseType = HttpResponse<IBooking>;
type EntityArrayResponseType = HttpResponse<IBooking[]>;

@Injectable({ providedIn: 'root' })
export class BookingService {
    private resourceUrl = SERVER_API_URL + 'api/bookings';

    constructor(private http: HttpClient) {}

    create(booking: IBooking): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(booking);
        return this.http
            .post<IBooking>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(booking: IBooking): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(booking);
        return this.http
            .put<IBooking>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IBooking>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBooking[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(booking: IBooking): IBooking {
        const copy: IBooking = Object.assign({}, booking, {
            bookDate: booking.bookDate != null && booking.bookDate.isValid() ? booking.bookDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.bookDate = res.body.bookDate != null ? moment(res.body.bookDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((booking: IBooking) => {
            booking.bookDate = booking.bookDate != null ? moment(booking.bookDate) : null;
        });
        return res;
    }
}
