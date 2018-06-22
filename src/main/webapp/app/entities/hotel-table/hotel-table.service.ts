import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHotelTable } from 'app/shared/model/hotel-table.model';

type EntityResponseType = HttpResponse<IHotelTable>;
type EntityArrayResponseType = HttpResponse<IHotelTable[]>;

@Injectable({ providedIn: 'root' })
export class HotelTableService {
    private resourceUrl = SERVER_API_URL + 'api/hotel-tables';
    private resourceUrl1 = SERVER_API_URL + 'api/hotel-tables-hotel';

    constructor(private http: HttpClient) {}

    create(hotelTable: IHotelTable): Observable<EntityResponseType> {
        return this.http.post<IHotelTable>(this.resourceUrl, hotelTable, { observe: 'response' });
    }

    update(hotelTable: IHotelTable): Observable<EntityResponseType> {
        return this.http.put<IHotelTable>(this.resourceUrl, hotelTable, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IHotelTable>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHotelTable[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    // Custom method

    getTablesByHotel(id?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption({id});
        return this.http.get<IHotelTable[]>(this.resourceUrl1, { params: options, observe: 'response' });
    }
}
