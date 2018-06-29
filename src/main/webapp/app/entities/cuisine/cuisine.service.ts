import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICuisine } from 'app/shared/model/cuisine.model';

type EntityResponseType = HttpResponse<ICuisine>;
type EntityArrayResponseType = HttpResponse<ICuisine[]>;

@Injectable({ providedIn: 'root' })
export class CuisineService {
    private resourceUrl = SERVER_API_URL + 'api/cuisines';

    constructor(private http: HttpClient) {}

    create(cuisine: ICuisine): Observable<EntityResponseType> {
        return this.http.post<ICuisine>(this.resourceUrl, cuisine, { observe: 'response' });
    }

    update(cuisine: ICuisine): Observable<EntityResponseType> {
        return this.http.put<ICuisine>(this.resourceUrl, cuisine, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICuisine>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICuisine[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
