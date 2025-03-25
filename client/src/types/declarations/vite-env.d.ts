/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly NODE_ENV?: 'development' | 'production';
    readonly HOST?: string;
    readonly PORT?: string;

    readonly VITE_API_URL?: string;
}

interface ImportMeta {
    readonly dirname: string;
    readonly env: ImportMetaEnv;
    readonly filename: string;
}
