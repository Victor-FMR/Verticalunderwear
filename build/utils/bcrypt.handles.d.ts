export declare const hashpassword: (pass: string) => Promise<string | undefined>;
export declare const compare: (check: string, hashpassword: string) => Promise<boolean | undefined>;
