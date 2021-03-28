interface HTMLElementRect {
    node: HTMLElement;
    rect: DOMRect;
}
export interface FlipOptions {
    enableX: boolean;
    enableY: boolean;
    enableWidth: boolean;
    enableHeight: boolean;
}
export declare class Flip {
    elements: HTMLElementRect[];
    constructor();
    save(element: HTMLElement): void;
    play(keyframeOptions: KeyframeAnimationOptions, flipOptions?: FlipOptions): void;
}
export {};
//# sourceMappingURL=Flip.d.ts.map