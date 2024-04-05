import {Browser, BrowserContext, Page} from 'playwright';
import {createBrowserInstance} from "./BrowserFactory";
import axios, {AxiosResponse} from 'axios';
import {PropertiesService} from "../properties.service";

export class TestEnvironment {
    private browser!: Browser;
    private context!: BrowserContext;
    private page!: Page;
    private token: string = '';
    private refreshToken: string = '';

    async init() {
        await this.login(PropertiesService.email, PropertiesService.password);
        this.browser = await createBrowserInstance(process.env.BROWSER || 'chromium');
        this.context = await this.browser.newContext();
        await this.setupLocalStorage();
        this.page = await this.context.newPage();
    }

    async login(username: string, password: string): Promise<void> {
        const url: string = PropertiesService.baseUrl + '/api/auth/login';
        const data: {} = {username, password};


        const response: AxiosResponse<any> = await axios.post(url, data);
        this.token = response.data.token;
        this.refreshToken = response.data.refreshToken;
    }

    get tokenExpirationDate() {
        return Date.now() + 24 * 60 * 60 * 1000;
    }

    async close(): Promise<void> {
        await this.browser.close();
    }

    private async setupLocalStorage(): Promise<void> {
        await this.context.addInitScript(`
        localStorage.setItem('jwt_token', '${this.token}');
        localStorage.setItem('refresh_token', '${this.refreshToken}');
        localStorage.setItem('jwt_token_expiration', '${this.tokenExpirationDate}');
        localStorage.setItem('refresh_token_expiration', '${this.tokenExpirationDate}');
        localStorage.setItem('TB-SETTINGS', JSON.stringify({"userLang": null}));
    `);
    }

    get getPage() {
        return this.page
    }

    get getContext() {
        return this.context;
    }
}
