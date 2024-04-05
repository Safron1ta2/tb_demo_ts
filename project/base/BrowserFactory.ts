import {Browser, chromium, firefox, webkit} from '@playwright/test';

async function createBrowserInstance(browserName: string): Promise<Browser> {
    switch (browserName.toLowerCase()) {
        case 'firefox':
            return await firefox.launch();
        case 'webkit':
            return await webkit.launch();
        case 'chromium':
        default:
            return await chromium.launch();
    }
}

export { createBrowserInstance };