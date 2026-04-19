declare enum Environment {
    Development = "development",
    Production = "production",
    Test = "test"
}
export declare class EnvironmentVariables {
    NODE_ENV: Environment;
    PORT: number;
    DATABASE_HOST: string;
    DATABASE_PORT: number;
    DATABASE_USER: string;
    DATABASE_PASSWORD: string;
    DATABASE_NAME: string;
    REDIS_HOST?: string;
    REDIS_PORT?: number;
}
export declare function validate(config: Record<string, unknown>): EnvironmentVariables;
export {};
