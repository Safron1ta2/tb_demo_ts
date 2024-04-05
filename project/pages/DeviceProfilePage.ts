import BasePage from "./BasePage";
import {Page} from "playwright";
import {EntityTableHandler} from "../table/EntityTableHandler";
import {DEVICE_PROFILE_TABLE_HEADERS} from "../constants/tableHeaders";
import {ElementHandle} from "@playwright/test";

export class DeviceProfilePage extends BasePage {
    private readonly deviceProfileTableHandler: EntityTableHandler;

    constructor(page: Page) {
        super(page);
        this.deviceProfileTableHandler = new EntityTableHandler(page, DEVICE_PROFILE_TABLE_HEADERS);
    }

    get deviceProfileTable(): EntityTableHandler {
        return this.deviceProfileTableHandler;
    }

    async exportButton(row: ElementHandle): Promise<ElementHandle> {
        const nameCell: ElementHandle = await this.deviceProfileTable.getButtonsCell(row);
        return nameCell.waitForSelector("//*[text()='file_download']/parent::button");
    }

    async exportDeviceProfile(row: ElementHandle): Promise<void> {
        const elementHandle: ElementHandle = await this.exportButton(row);
        await elementHandle.click();
    }
}