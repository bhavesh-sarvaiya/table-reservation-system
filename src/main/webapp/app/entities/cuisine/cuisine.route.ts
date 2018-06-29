import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Cuisine } from 'app/shared/model/cuisine.model';
import { CuisineService } from './cuisine.service';
import { CuisineComponent } from './cuisine.component';
import { CuisineDetailComponent } from './cuisine-detail.component';
import { CuisineUpdateComponent } from './cuisine-update.component';
import { CuisineDeletePopupComponent } from './cuisine-delete-dialog.component';
import { ICuisine } from 'app/shared/model/cuisine.model';

@Injectable({ providedIn: 'root' })
export class CuisineResolve implements Resolve<ICuisine> {
    constructor(private service: CuisineService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((cuisine: HttpResponse<Cuisine>) => cuisine.body);
        }
        return Observable.of(new Cuisine());
    }
}

export const cuisineRoute: Routes = [
    {
        path: 'cuisine',
        component: CuisineComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cuisines'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cuisine/:id/view',
        component: CuisineDetailComponent,
        resolve: {
            cuisine: CuisineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cuisines'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cuisine/new',
        component: CuisineUpdateComponent,
        resolve: {
            cuisine: CuisineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cuisines'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cuisine/:id/edit',
        component: CuisineUpdateComponent,
        resolve: {
            cuisine: CuisineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cuisines'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cuisinePopupRoute: Routes = [
    {
        path: 'cuisine/:id/delete',
        component: CuisineDeletePopupComponent,
        resolve: {
            cuisine: CuisineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cuisines'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
