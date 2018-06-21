import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { HotelTableComponentsPage, HotelTableUpdatePage } from './hotel-table.page-object';

describe('HotelTable e2e test', () => {
    let navBarPage: NavBarPage;
    let hotelTableUpdatePage: HotelTableUpdatePage;
    let hotelTableComponentsPage: HotelTableComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load HotelTables', () => {
        navBarPage.goToEntity('hotel-table');
        hotelTableComponentsPage = new HotelTableComponentsPage();
        expect(hotelTableComponentsPage.getTitle()).toMatch(/Hotel Tables/);
    });

    it('should load create HotelTable page', () => {
        hotelTableComponentsPage.clickOnCreateButton();
        hotelTableUpdatePage = new HotelTableUpdatePage();
        expect(hotelTableUpdatePage.getPageTitle()).toMatch(/Create or edit a Hotel Table/);
        hotelTableUpdatePage.cancel();
    });

    /* it('should create and save HotelTables', () => {
        hotelTableComponentsPage.clickOnCreateButton();
        hotelTableUpdatePage.setTableNumberInput('tableNumber');
        expect(hotelTableUpdatePage.getTableNumberInput()).toMatch('tableNumber');
        hotelTableUpdatePage.setNoOfCustomerInput('5');
        expect(hotelTableUpdatePage.getNoOfCustomerInput()).toMatch('5');
        hotelTableUpdatePage.hotelSelectLastOption();
        hotelTableUpdatePage.save();
        expect(hotelTableUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
