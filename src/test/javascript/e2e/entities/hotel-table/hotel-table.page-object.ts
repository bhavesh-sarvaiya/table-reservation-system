import { element, by, promise, ElementFinder } from 'protractor';

export class HotelTableComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-hotel-table div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class HotelTableUpdatePage {
    pageTitle = element(by.id('jhi-hotel-table-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    tableNumberInput = element(by.id('field_tableNumber'));
    noOfCustomerInput = element(by.id('field_noOfCustomer'));
    statusInput = element(by.id('field_status'));
    hotelSelect = element(by.id('field_hotel'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setTableNumberInput(tableNumber): promise.Promise<void> {
        return this.tableNumberInput.sendKeys(tableNumber);
    }

    getTableNumberInput() {
        return this.tableNumberInput.getAttribute('value');
    }

    setNoOfCustomerInput(noOfCustomer): promise.Promise<void> {
        return this.noOfCustomerInput.sendKeys(noOfCustomer);
    }

    getNoOfCustomerInput() {
        return this.noOfCustomerInput.getAttribute('value');
    }

    setStatusInput(status): promise.Promise<void> {
        return this.statusInput.sendKeys(status);
    }

    getStatusInput() {
        return this.statusInput.getAttribute('value');
    }

    hotelSelectLastOption(): promise.Promise<void> {
        return this.hotelSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    hotelSelectOption(option): promise.Promise<void> {
        return this.hotelSelect.sendKeys(option);
    }

    getHotelSelect(): ElementFinder {
        return this.hotelSelect;
    }

    getHotelSelectedOption() {
        return this.hotelSelect.element(by.css('option:checked')).getText();
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
