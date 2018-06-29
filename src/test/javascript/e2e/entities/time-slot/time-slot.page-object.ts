import { element, by, promise, ElementFinder } from 'protractor';

export class TimeSlotComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-time-slot div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class TimeSlotUpdatePage {
    pageTitle = element(by.id('jhi-time-slot-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    daySelect = element(by.id('field_day'));
    statusInput = element(by.id('field_status'));
    hotelSelect = element(by.id('field_hotel'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setDaySelect(day): promise.Promise<void> {
        return this.daySelect.sendKeys(day);
    }

    getDaySelect() {
        return this.daySelect.element(by.css('option:checked')).getText();
    }

    daySelectLastOption(): promise.Promise<void> {
        return this.daySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    getStatusInput() {
        return this.statusInput;
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
