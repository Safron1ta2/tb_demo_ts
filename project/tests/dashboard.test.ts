import {expect, test} from "../base/TestFixture";
import {SideMenu} from "../pages/SideMenu";
import {DashboardPage, DashboardsPage, GridsterItem} from "../pages/DashboardPage";

test("all buttons displayed after widget resizing", async ({page}): Promise<void> => {
    const sideMenu: SideMenu = new SideMenu(page);
    await sideMenu.navigateToDashboardPage();

    const dashboardsPage: DashboardsPage = new DashboardsPage(page);
    await dashboardsPage.goToDashboardPage(0);
    const dashboardPage: DashboardPage = new DashboardPage(page);
    await dashboardPage.addHtmlCardWidget();

    const gridsterItem: GridsterItem = new GridsterItem(page, "//gridster-item");
    const boundingBoxBefore = await gridsterItem.item.boundingBox();

    await gridsterItem.resizeBySeHandler(100, 200);
    const boundingBoxAfter = await gridsterItem.item.boundingBox();

    expect(boundingBoxBefore?.height).not.toEqual(boundingBoxAfter?.width);
    expect(boundingBoxBefore?.height).not.toEqual(boundingBoxAfter?.height);
});
