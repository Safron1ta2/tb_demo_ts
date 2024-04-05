import {DevicePage} from "../pages/DevicePage";
import {getRandomAlphanumeric} from "../utils/StringUtil";
import {expect, test} from "../base/TestFixture";
import {SideMenu} from "../pages/SideMenu";
import {ElementHandle} from "@playwright/test";

test('device created successfully', async ({page}): Promise<void> => {
    const sideMenu: SideMenu = new SideMenu(page);
    await sideMenu.navigateToDevicePage();

    const devicePage: DevicePage = new DevicePage(page)
    const deviceName: string = "test_device" + getRandomAlphanumeric(5);
    await devicePage.addNewDevice(deviceName)

    const rows: ElementHandle[] = await devicePage.deviceTable.getAllRows();
    const firstRow: ElementHandle = rows[0];
    const nameSpan: ElementHandle = await devicePage.deviceTable.getSpanForNameCell(firstRow);
    const nameText: string = await nameSpan.innerText();

    expect(nameText).toBe(deviceName);
});


