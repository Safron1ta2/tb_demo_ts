import BasePage from "./BasePage";
import {Locator} from "playwright";

export class HomePage extends BasePage {
    get gettingStartedLink() : Locator {
        return this.page.locator("//a[text()='getting started']");
    }

    async goToGettingStartedPage() : Promise<void> {
        await this.gettingStartedLink.click();
    }
}
