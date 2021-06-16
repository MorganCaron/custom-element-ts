export declare const TemplateInformations: {
    openSymbol: string;
    closeSymbol: string;
};
export interface TemplateMatch {
    key: string;
    sample: string;
}
export declare const TemplateGetMatchs: (str: string) => TemplateMatch[];
export declare const TemplateGetKeys: (str: string) => string[];
export interface NodeContainingVariables {
    node: Node;
    attributeName?: string;
    template: string;
}
export declare const findVariablesInHTMLElement: (component: HTMLElement) => Record<string, NodeContainingVariables[]>;
export declare const setVariablesInNodes: (component: HTMLElement, nodesContainingVariables?: NodeContainingVariables[] | undefined) => void;
//# sourceMappingURL=Template.d.ts.map