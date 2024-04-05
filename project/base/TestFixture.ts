import {Page, test as base, TestType} from '@playwright/test';
import {TestEnvironment} from "./TestEnvironment";
import {PropertiesService} from "../properties.service";
import {BrowserContext} from "playwright";

type TestFixtures = {
    testEnvironment: TestEnvironment;
    page: Page;
    browserContext: BrowserContext;
};

export const test: TestType<TestFixtures, any> = base.extend<TestFixtures>({
    testEnvironment: async ({}, use): Promise<void> => {
        const testEnvironment: TestEnvironment = new TestEnvironment();
        await testEnvironment.init();
        await use(testEnvironment);
        await testEnvironment.close();
    },

    page: async ({testEnvironment}, use): Promise<void> => {
        await testEnvironment.getPage.goto(PropertiesService.baseUrl + '/home');
        await use(testEnvironment.getPage);
    },

    browserContext: async ({testEnvironment}, use) => {
        const context : BrowserContext = testEnvironment.getContext;
        await use(context);
    },
});

export {expect} from '@playwright/test';
