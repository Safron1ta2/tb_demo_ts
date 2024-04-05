import {expect, test} from "../base/TestFixture";
import {HomePage} from "../pages/HomePage";

test.describe('check links', (): void => {

    test('should redirect to getting started #link', async ({browserContext, page}): Promise<void> => {
        const homePage: HomePage = new HomePage(page);

        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
            homePage.goToGettingStartedPage()
        ]);

        await newPage.waitForLoadState();

        expect(browserContext.pages().length).toBe(2);
        expect(newPage.url()).toBe('https://thingsboard.io/docs/getting-started-guides/helloworld/');
    });

    test('broken test', async ({browserContext}): Promise<void> => {
        expect(browserContext.pages().length).toBe(2);
    });

});
