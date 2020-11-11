/**
 * 模块加载器
 *
 * @file monacoLoader.ts
 * @author guyunlong
 */

export class MonacoLoader {
    // monaco加载状态
    static LODER_PENDING = false;

    static async require(srcPath: string) {
        return new Promise((resolve, reject) => {
            // 只加载一次monaco
            if (MonacoLoader.LODER_PENDING) {
                // 监听monacoLoaded事件
                window.addEventListener('monacoLoaded', e => {
                    resolve(window.monaco);
                    return;
                });
            }
            else {
                // 如果存在monaco，说明加载过了，直接返回monaco
                if (window.monaco) {
                    resolve(window.monaco);
                    return;
                }

                // loader.js和esl有冲突，临时解决
                if (window.define) {
                    window.define = undefined;
                }


                // 首次加载monaco，设为pending状态
                MonacoLoader.LODER_PENDING = true;
    
                const loaderPath = srcPath + 'vs/loader.js';
                const loaderScript = document.createElement('script');
                loaderScript.src = loaderPath;
            
                loaderScript.addEventListener('load', () => {
                    window.require.config({
                        paths: {
                            vs: srcPath + 'vs'
                        } 
                    });
            
                    window.require(['vs/editor/editor.main'], () => {
                        const monaco = window.monaco;
    
                        // 派发monacoLoaded事件
                        let e = new Event('monacoLoaded');
                        window.dispatchEvent(e);
                        MonacoLoader.LODER_PENDING = false;
    
                        resolve(monaco);
                        return;
                    })
                });
    
                loaderScript.addEventListener('error', err => {
                    reject(err);
                });
            
                document.body.appendChild(loaderScript);
            }
        })
    }
    
}