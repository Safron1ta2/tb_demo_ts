export  const defaultProperties = {
    baseUrl: "https://demo.thingsboard.io",
    email: "elsafronitaz@gmail.com",
    password: "18092001",
};

export class PropertiesService {
    static get baseUrl(): string {
        return process.env.BASE_URL || defaultProperties.baseUrl;
    }

    static get email(): string {
        return process.env.EMAIL || defaultProperties.email;
    }

    static get password(): string {
        return process.env.PASSWORD || defaultProperties.password;
    }

}