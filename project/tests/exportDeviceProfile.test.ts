import {test} from "../base/TestFixture";
import {SideMenu} from "../pages/SideMenu";
import {DeviceProfilePage} from "../pages/DeviceProfilePage";
import {expect} from "playwright/test";
import {parseJsonFromFile} from "../utils/JsonUtil";
import {ElementHandle} from "@playwright/test";

function formatNameForFile(name: string): string {
    return `${
        name.replace(/[^a-zA-Z0-9 ]/g, '')
            .replace(/\s+/g, '_')
            .toLowerCase()
    }.json`
}


test('device profile should exported successfully', async ({page}): Promise<void> => {
    const sideMenu: SideMenu = new SideMenu(page);
    await sideMenu.navigateToDeviceProfilePage();

    const deviceProfilePage: DeviceProfilePage = new DeviceProfilePage(page);
    const rows: ElementHandle[] = await deviceProfilePage.deviceProfileTable.getAllRows();
    const firstRow: ElementHandle = rows[0];
    const spanForNameCell: ElementHandle = await deviceProfilePage.deviceProfileTable.getSpanForNameCell(firstRow);
    const expectedName: string = await spanForNameCell.innerText();

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        deviceProfilePage.exportDeviceProfile(firstRow),
    ]);

    const path: string = await download.path();

    expect(await download.failure()).toBeNull();
    expect(download.suggestedFilename()).toBe(formatNameForFile(expectedName));
    const jsonData = await parseJsonFromFile(path);

    expect(jsonData.name).toBe(expectedName);
});
