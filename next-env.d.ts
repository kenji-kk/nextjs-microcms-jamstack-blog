/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_API_KEY: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}
