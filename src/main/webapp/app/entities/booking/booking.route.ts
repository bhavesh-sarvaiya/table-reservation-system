import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Booking } from 'app/shared/model/booking.model';
import { BookingService } from './booking.service';
import { BookingComponent } from './booking.component';
import { BookingDetailComponent } from './booking-detail.component';
import { BookingUpdateComponent } from './booking-update.component';
import { BookingDeletePopupComponent } from './booking-delete-dialog.component';
import { IBooking } from 'app/shared/model/booking.model';

@Injectable({ providedIn: 'root' })
export class BookingResolve implements Resolve<IBooking> {
    constructor(private service: BookingService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((booking: HttpResponse<Booking>) => booking.body);
        }
        return Observable.of(new Booking());
    }
}

export const bookingRoute: Routes = [
    {
        path: 'booking',
        component: BookingComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bookings'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'booking/:id/view',
        component: BookingDetailComponent,
        resolve: {
            booking: BookingResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Bookings'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'booking/new',
        component: BookingUpdateComponent,
        resolve: {
            booking: BookingResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Bookings'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'booking/:id/edit',
        component: BookingUpdateComponent,
        resolve: {
            booking: BookingResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Bookings'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bookingPopupRoute: Routes = [
    {
        path: 'booking/:id/delete',
        component: BookingDeletePopupComponent,
        resolve: {
            booking: BookingResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Bookings'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
