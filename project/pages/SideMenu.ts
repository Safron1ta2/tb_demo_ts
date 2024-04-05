import BasePage from "./BasePage";
import {Locator} from "playwright";

export class SideMenu extends BasePage {

    get entityToggle(): Locator {
        return this.page.locator("//span[text()='Entities']/ancestor::span[contains(@class,'button')]");
    }

    get deviceNavigationButton(): Locator {
        return this.page.locator("//span[text()='Devices']/ancestor::span[contains(@class,'button')]");
    }

    get profileToggle(): Locator {
        return this.page.locator("//span[text()='Profiles']/ancestor::span[contains(@class,'button')]")
    }

    get deviceProfileNavigationButton(): Locator {
        return this.page.locator("//span[text()='Device profiles']/ancestor::span[contains(@class,'button')]")
    }

    get dashboardNavigationButton(): Locator {
        return this.page.locator("//span[text()='Dashboards']/ancestor::span[contains(@class,'button')]")
    }

    async navigateToDevicePage(): Promise<void> {
        await this.entityToggle.click();
        await this.deviceNavigationButton.click()
    }

    async navigateToDeviceProfilePage(): Promise<void> {
        await this.profileToggle.click();
        await this.deviceProfileNavigationButton.click();
    }

    async navigateToDashboardPage() : Promise<void> {
        await this.dashboardNavigationButton.click();
    }
}
