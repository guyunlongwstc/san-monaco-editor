interface Data {
    get(expr: string): any;
    push(expr: string, item: any, option?: object): any;
    removeAt(expr: string, index: number, option?: object): any;
    set(expr: string, value: any, option?: object): void;
    splice(expr: string, spliceArgs: Array<any>): any;
}

export interface SanComputedProps<T = Data> {
    [x: string]: (this: { data: T }) => any;
}

declare global {
    interface Require {
        (lib: Array<string>, callback: Function): void
        config: Function
    }
    interface Window {
        define: Function | undefined;
        require: Require | undefined;
        monaco: any;
        __LODER_PENDING__: boolean

    }
}
