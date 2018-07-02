import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { HotelComponentsPage, HotelUpdatePage } from './hotel.page-object';
import * as path from 'path';

describe('Hotel e2e test', () => {
    let navBarPage: NavBarPage;
    let hotelUpdatePage: HotelUpdatePage;
    let hotelComponentsPage: HotelComponentsPage;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Hotels', () => {
        navBarPage.goToEntity('hotel');
        hotelComponentsPage = new HotelComponentsPage();
        expect(hotelComponentsPage.getTitle()).toMatch(/Hotels/);
    });

    it('should load create Hotel page', () => {
        hotelComponentsPage.clickOnCreateButton();
        hotelUpdatePage = new HotelUpdatePage();
        expect(hotelUpdatePage.getPageTitle()).toMatch(/Create or edit a Hotel/);
        hotelUpdatePage.cancel();
    });

    it('should create and save Hotels', () => {
        hotelComponentsPage.clickOnCreateButton();
        hotelUpdatePage.setImageInput(absolutePath);
        hotelUpdatePage.setNameInput('name');
        expect(hotelUpdatePage.getNameInput()).toMatch('name');
        hotelUpdatePage.setTypeInput('type');
        expect(hotelUpdatePage.getTypeInput()).toMatch('type');
        hotelUpdatePage.setOpenTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(hotelUpdatePage.getOpenTimeInput()).toContain('2001-01-01T02:30');
        hotelUpdatePage.setCloseTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(hotelUpdatePage.getCloseTimeInput()).toContain('2001-01-01T02:30');
        hotelUpdatePage.setCityInput('city');
        expect(hotelUpdatePage.getCityInput()).toMatch('city');
        hotelUpdatePage.setAddressInput('address');
        expect(hotelUpdatePage.getAddressInput()).toMatch('address');
        hotelUpdatePage.setPincodeInput('pincode');
        expect(hotelUpdatePage.getPincodeInput()).toMatch('pincode');
        hotelUpdatePage.setDescriptionInput('description');
        expect(hotelUpdatePage.getDescriptionInput()).toMatch('description');
        hotelUpdatePage.setStaffInRushHourInput('5');
        expect(hotelUpdatePage.getStaffInRushHourInput()).toMatch('5');
        hotelUpdatePage.setStaffInNormalInput('5');
        expect(hotelUpdatePage.getStaffInNormalInput()).toMatch('5');
        hotelUpdatePage.save();
        expect(hotelUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
