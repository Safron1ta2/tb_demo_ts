import BasePage from "./BasePage";
import {EntityTableHandler} from "../table/EntityTableHandler";
import {Locator, Page} from "playwright";
import {DASHBOARDS_PROFILE_TABLE_HEADERS} from "../constants/tableHeaders";
import {ElementHandle} from "@playwright/test";

export class DashboardsPage extends BasePage {
    private readonly dashboardsTableHandler: EntityTableHandler;

    constructor(page: Page) {
        super(page);
        this.dashboardsTableHandler = new EntityTableHandler(page, DASHBOARDS_PROFILE_TABLE_HEADERS);
    }

    get dashboardsTable(): EntityTableHandler {
        return this.dashboardsTableHandler;
    }

    async goToDashboardPage(rowIndex: number) {
        const rows: ElementHandle[] = await this.dashboardsTable.getAllRows();
        await rows[rowIndex].click()
    }
}

export class DashboardPage extends BasePage {
    get addNewWidgetButton(): Locator {
        return this.page.locator("//*[text()=' Add widget ']/parent::button");
    }

    get htmlWidgetsBundle(): Locator {
        return this.page.locator("//*[@title='HTML widgets']/ancestor::mat-card");
    }

    get htmlCardWidget(): Locator {
        return this.page.locator("//*[@title='HTML Card']/ancestor::mat-card");
    }

    async addHtmlCardWidget(): Promise<void> {
        await this.addNewWidgetButton.click();
        await this.htmlWidgetsBundle.click();
        await this.htmlCardWidget.click();
        await this.widgetDialog.add();
    }

    get widgetDialog(): WidgetDialog {
        return new WidgetDialog(this.page);
    }

}

class WidgetDialog {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get addButton() {
        return this.page.locator("//tb-add-widget-dialog//span[text()=' Add ']/parent::button")
    }

    async add(): Promise<void> {
        await this.addButton.click()
    }

}

export class GridsterItem {
    page: Page;
    selector: string;

    constructor(page: Page, selector: string) {
        this.page = page;
        this.selector = selector;
    }

    get item() {
        return this.page.locator(this.selector);
    }

    get seResizeHandler() {
        return this.item.locator("//div[contains(@class,'handle-se')]")
    }

    async resizeBySeHandler(offsetX: number, offsetY: number): Promise<void> {
        await this.seResizeHandler.hover()
        await this.page.mouse.down();
        await this.page.mouse.move(offsetX, offsetY);
        await this.page.mouse.up();
    }

}