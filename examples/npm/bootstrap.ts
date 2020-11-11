/**
 * demo启动模块
 *
 * @file bootstrap.ts
 * @author guyunlong
 */

import Demo from "./demo";

export const startUp = () => {
    const monacoEditor = new Demo();

    monacoEditor.attach(document.getElementById("app") as HTMLElement);
};
