export interface Type<T> extends Function {
    new (...args: any[]): T;
}
export declare const recordToArray: <Key extends string | number | symbol, Value>(record: Record<Key, Value>) => Value[];
export declare const flatify: <T>(array: any[]) => T[];
export declare const xor: (lhs: boolean, rhs: boolean) => boolean;
export declare type Zipped<A, B> = {
    first: A;
    second: B;
}[];
export declare const zip: <A, B>(first: A[], second: B[]) => Zipped<A, B>;
export declare const removeDuplicates: <T>(array: T[]) => T[];
export declare const escapeHtml: (unsafeString: string) => string;
//# sourceMappingURL=Utils.d.ts.map