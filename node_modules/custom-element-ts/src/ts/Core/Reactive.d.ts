export declare class Reactive<T> {
    private dependencies;
    private __value;
    private __updateFunction;
    constructor(value?: T);
    depend(dependency: Reactive<any>): void;
    subscribe(func: () => void): void;
    update(): void;
    set value(val: T | undefined);
    get value(): T | undefined;
}
//# sourceMappingURL=Reactive.d.ts.map