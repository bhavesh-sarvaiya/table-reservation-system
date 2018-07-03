import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { CuisineComponentsPage, CuisineUpdatePage } from './cuisine.page-object';
import * as path from 'path';

describe('Cuisine e2e test', () => {
    let navBarPage: NavBarPage;
    let cuisineUpdatePage: CuisineUpdatePage;
    let cuisineComponentsPage: CuisineComponentsPage;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Cuisines', () => {
        navBarPage.goToEntity('cuisine');
        cuisineComponentsPage = new CuisineComponentsPage();
        expect(cuisineComponentsPage.getTitle()).toMatch(/Cuisines/);
    });

    it('should load create Cuisine page', () => {
        cuisineComponentsPage.clickOnCreateButton();
        cuisineUpdatePage = new CuisineUpdatePage();
        expect(cuisineUpdatePage.getPageTitle()).toMatch(/Create or edit a Cuisine/);
        cuisineUpdatePage.cancel();
    });

    /* it('should create and save Cuisines', () => {
        cuisineComponentsPage.clickOnCreateButton();
        cuisineUpdatePage.typeSelectLastOption();
        cuisineUpdatePage.setFoodImageInput(absolutePath);
        cuisineUpdatePage.hotelSelectLastOption();
        cuisineUpdatePage.save();
        expect(cuisineUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
