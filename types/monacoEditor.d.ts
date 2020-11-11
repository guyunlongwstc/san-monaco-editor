import { SanComponent } from 'san';

/** Monaco data */
interface DataI {
    width?: number;
    height?: number;
    value: object | string;
    amd: boolean;
    srcPath?: string;
    language: string;
    theme?: 'vs' | 'hc-black';
    options?: object;
}

/** MonacoEditor Component */
export declare class MonacoEditor extends SanComponent<DataI> {
    constructor(option?: { data?: Partial<DataI> });


    /**
     * MonacoEditor挂载到页面触发
     */
    fire(eventName: 'on-attached'): this;

    /**
     * MonacoEditor从页面卸载触发
     */
    fire(eventName: 'on-detached'): this;

    /**
     * MonacoEditor代码改变时触发
     */
    fire(eventName: 'on-change'): this;
}
