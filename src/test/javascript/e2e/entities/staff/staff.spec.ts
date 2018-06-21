import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { StaffComponentsPage, StaffUpdatePage } from './staff.page-object';

describe('Staff e2e test', () => {
    let navBarPage: NavBarPage;
    let staffUpdatePage: StaffUpdatePage;
    let staffComponentsPage: StaffComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Staff', () => {
        navBarPage.goToEntity('staff');
        staffComponentsPage = new StaffComponentsPage();
        expect(staffComponentsPage.getTitle()).toMatch(/Staff/);
    });

    it('should load create Staff page', () => {
        staffComponentsPage.clickOnCreateButton();
        staffUpdatePage = new StaffUpdatePage();
        expect(staffUpdatePage.getPageTitle()).toMatch(/Create or edit a Staff/);
        staffUpdatePage.cancel();
    });

    /* it('should create and save Staff', () => {
        staffComponentsPage.clickOnCreateButton();
        staffUpdatePage.setNameInput('name');
        expect(staffUpdatePage.getNameInput()).toMatch('name');
        staffUpdatePage.setContactNoInput('contactNo');
        expect(staffUpdatePage.getContactNoInput()).toMatch('contactNo');
        staffUpdatePage.setAddressInput('address');
        expect(staffUpdatePage.getAddressInput()).toMatch('address');
        staffUpdatePage.hotelSelectLastOption();
        staffUpdatePage.save();
        expect(staffUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
