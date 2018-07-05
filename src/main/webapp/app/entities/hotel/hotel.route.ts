import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Hotel } from 'app/shared/model/hotel.model';
import { HotelService } from './hotel.service';
import { HotelComponent } from './hotel.component';
import { HotelDetailComponent } from './hotel-detail.component';
import { HotelUpdateComponent } from './hotel-update.component';
import { HotelDeletePopupComponent } from './hotel-delete-dialog.component';
import { IHotel } from 'app/shared/model/hotel.model';
import { TableBookComponent } from 'app/entities/hotel/table-book.component';

@Injectable({ providedIn: 'root' })
export class HotelResolve implements Resolve<IHotel> {
    constructor(private service: HotelService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((hotel: HttpResponse<Hotel>) => hotel.body);
        }
        return Observable.of(new Hotel());
    }
}

export const hotelRoute: Routes = [
    {
        path: 'hotel',
        component: HotelComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            defaultSort: 'id,asc',
            pageTitle: 'Hotels'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hotel/:id/view',
        component: HotelDetailComponent,
        resolve: {
            hotel: HotelResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Hotels'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hotel/:id/table-book',
        component: TableBookComponent,
        resolve: {
            hotel: HotelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Table Book'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hotel/new',
        component: HotelUpdateComponent,
        resolve: {
            hotel: HotelResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Hotels'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hotel/:id/edit',
        component: HotelUpdateComponent,
        resolve: {
            hotel: HotelResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Hotels'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hotelPopupRoute: Routes = [
    {
        path: 'hotel/:id/delete',
        component: HotelDeletePopupComponent,
        resolve: {
            hotel: HotelResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Hotels'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
