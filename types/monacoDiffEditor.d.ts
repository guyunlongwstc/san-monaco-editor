import { SanComponent } from 'san';

/** Monaco data */
interface DataI {
    width?: number;
    height?: number;
    originalValue: string;
    modifiedValue: string;
    amd: boolean;
    srcPath?: string;
    language: string;
    theme?: 'vs' | 'hc-black';
    options?: object;
}

/** MonacoDiffEditor Component */
export declare class MonacoDiffEditor extends SanComponent<DataI> {
    constructor(option?: { data?: Partial<DataI> });


    /**
     * MonacoDiffEditor挂载到页面触发
     */
    fire(eventName: 'on-attached'): this;

    /**
     * MonacoDiffEditor从页面卸载触发
     */
    fire(eventName: 'on-detached'): this;

    /**
     * MonacoDiffEditor代码改变时触发
     */
    fire(eventName: 'on-change'): this;
}
