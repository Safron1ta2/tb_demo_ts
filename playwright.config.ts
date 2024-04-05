import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    use: {
        headless: true,
        locale: 'en-US',
        viewport: { width: 1680, height: 1050 },
        screenshot: 'only-on-failure',
    },
};

export default config;
