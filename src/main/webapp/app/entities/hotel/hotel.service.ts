import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHotel } from 'app/shared/model/hotel.model';

type EntityResponseType = HttpResponse<IHotel>;
type EntityArrayResponseType = HttpResponse<IHotel[]>;

@Injectable({ providedIn: 'root' })
export class HotelService {
    private resourceUrl = SERVER_API_URL + 'api/hotels';

    constructor(private http: HttpClient) {}

    create(hotel: IHotel): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(hotel);
        return this.http
            .post<IHotel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(hotel: IHotel): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(hotel);
        return this.http
            .put<IHotel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IHotel>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IHotel[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(hotel: IHotel): IHotel {
        const copy: IHotel = Object.assign({}, hotel, {
            openTime: hotel.openTime != null && hotel.openTime.isValid() ? hotel.openTime.toJSON() : null,
            closeTime: hotel.closeTime != null && hotel.closeTime.isValid() ? hotel.closeTime.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.openTime = res.body.openTime != null ? moment(res.body.openTime) : null;
        res.body.closeTime = res.body.closeTime != null ? moment(res.body.closeTime) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((hotel: IHotel) => {
            hotel.openTime = hotel.openTime != null ? moment(hotel.openTime) : null;
            hotel.closeTime = hotel.closeTime != null ? moment(hotel.closeTime) : null;
        });
        return res;
    }
}
