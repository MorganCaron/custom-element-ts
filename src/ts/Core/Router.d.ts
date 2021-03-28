export declare type RouterMode = 'history' | 'hash';
export interface Route {
    path: string;
    controller: (...args: any[]) => void;
}
export interface RouterParameters {
    mode?: RouterMode;
    routes?: Route[];
}
export declare class Router {
    routes: Route[];
    root: string;
    _mode: RouterMode;
    currentFragment: string | null;
    constructor(config: RouterParameters);
    set mode(mode: RouterMode);
    get mode(): RouterMode;
    clearSlashes(path: string): string;
    getFragment(): string;
    openFragment(fragment: string): void;
    addRoute(route: Route): void;
    removeRoute(path: string): void;
    check(path: string): boolean;
    listen(): void;
    navigate(path: string): void;
}
//# sourceMappingURL=Router.d.ts.map