import BasePage from "./BasePage";
import {Locator, Page} from "playwright";
import {DEVICE_TABLE_HEADERS} from "../constants/tableHeaders";
import {EntityTableHandler} from "../table/EntityTableHandler";

export class DevicePage extends BasePage {

    private readonly deviceTableHandler: EntityTableHandler;
    private deviceConnectivityDialog: DeviceConnectivityDialog

    constructor(page: Page) {
        super(page);
        this.deviceTableHandler = new EntityTableHandler(page, DEVICE_TABLE_HEADERS);
        this.deviceConnectivityDialog = new DeviceConnectivityDialog(page);
    }

    get deviceTable(): EntityTableHandler {
        return this.deviceTableHandler;
    }

    get plusButton(): Locator {
        return this.page.locator("//*[text()='add']/parent::button");
    }

    get addNewEntityButton(): Locator {
        return this.page.locator("//*[contains(text(),'Add new')]/ancestor::button");
    }

    get nameInput(): Locator {
        return this.page.locator("//mat-dialog-container//input[@formcontrolname='name']");
    }

    get addButton(): Locator {
        return this.page.locator("//span[text()='Add']/parent::button");
    }

    async waitForProcessingComplete(): Promise<void> {
        const progressBar: Locator = this.page.locator('//mat-progress-bar');
        await progressBar.waitFor({state: 'attached'});
        await progressBar.waitFor({state: 'detached'});
    }

    async addNewDevice(deviceName: string): Promise<void> {
        await this.plusButton.click();
        await this.addNewEntityButton.click();
        await this.nameInput.fill(deviceName);
        await this.addButton.click();
        await this.deviceConnectivityDialog.close()
        await this.waitForProcessingComplete();
    }

}

class DeviceConnectivityDialog {
    private page: Page

    constructor(page: Page) {
        this.page = page
    }

    get closeButton(): Locator {
        return this.page.locator("//tb-device-check-connectivity-dialog//span[text()='Close']/parent::button");
    }

    async close(): Promise<void> {
        await this.closeButton.click();
    }

}
