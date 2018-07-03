import { element, by, promise, ElementFinder } from 'protractor';

export class CuisineComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-cuisine div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class CuisineUpdatePage {
    pageTitle = element(by.id('jhi-cuisine-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    typeSelect = element(by.id('field_type'));
    foodImageInput = element(by.id('file_foodImage'));
    hotelSelect = element(by.id('field_hotel'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setTypeSelect(type): promise.Promise<void> {
        return this.typeSelect.sendKeys(type);
    }

    getTypeSelect() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    }

    typeSelectLastOption(): promise.Promise<void> {
        return this.typeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    setFoodImageInput(foodImage): promise.Promise<void> {
        return this.foodImageInput.sendKeys(foodImage);
    }

    getFoodImageInput() {
        return this.foodImageInput.getAttribute('value');
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
