export declare type WagnerFischerOptions = {
    replace: boolean;
};
export declare enum EWagnerFischerEdition {
    NoChange = 0,
    Insertion = 1,
    Substitution = 2,
    Deletion = 3
}
export declare type WagnerFischerResult = {
    distance: number;
    editions: EWagnerFischerEdition[];
};
export declare const wagnerFischer: (str0: string, str1: string, options: WagnerFischerOptions) => WagnerFischerResult;
export declare type WriterOptions = {
    duration?: number;
    interval?: number;
    replace: boolean;
    update: (newString: string) => void;
};
export declare class Writer {
    static write(oldString: string, newString: string, options: WriterOptions, callback?: (newString: string) => void): void;
}
//# sourceMappingURL=Writer.d.ts.map