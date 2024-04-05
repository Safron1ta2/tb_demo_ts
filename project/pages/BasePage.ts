import {Page} from 'playwright';

export default abstract class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page
    }

}