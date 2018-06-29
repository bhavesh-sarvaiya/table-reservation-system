import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITiming } from 'app/shared/model/timing.model';

type EntityResponseType = HttpResponse<ITiming>;
type EntityArrayResponseType = HttpResponse<ITiming[]>;

@Injectable({ providedIn: 'root' })
export class TimingService {
    private resourceUrl = SERVER_API_URL + 'api/timings';

    constructor(private http: HttpClient) {}

    create(timing: ITiming): Observable<EntityResponseType> {
        return this.http.post<ITiming>(this.resourceUrl, timing, { observe: 'response' });
    }

    update(timing: ITiming): Observable<EntityResponseType> {
        return this.http.put<ITiming>(this.resourceUrl, timing, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITiming>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITiming[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
