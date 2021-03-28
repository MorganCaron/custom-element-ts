import { Router, RouterMode } from '../Core/Router';
import { Type } from '../Core/Utils';
interface ComponentRoute {
    path: string;
    component: Type<HTMLElement>;
}
declare class RouterComponent extends HTMLElement {
    router: Router;
    beforePageChanging: (() => void) | null;
    afterPageChanging: (() => void) | null;
    set mode(mode: RouterMode);
    get mode(): RouterMode;
    addRoute(route: ComponentRoute): void;
    removeRoute(path: string): void;
    listen(): void;
    navigate(path?: string): void;
}
export { RouterComponent as Router, ComponentRoute as Route };
//# sourceMappingURL=Router.d.ts.map