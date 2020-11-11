/**
 * monacoEditor
 *
 * @file monacoEditor.ts
 * @author guyunlong
 */

import { Component, DataTypes } from "san";
import { MonacoLoader } from './monacoLoader';
import { SanComputedProps } from './interface';
import { IKeyboardEvent } from 'monaco-editor';
import { isNumber } from './util';

const template = `
    <template>
        <div s-ref="monaco" class="s-monaco-editor" style="{{style}}"></div>
    </template>
`;

export default class MonacoEditor extends Component {
    static template = template;
    // static dataTypes = {
    //     width: DataTypes.number || DataTypes.string,
    //     height: DataTypes.number || DataTypes.string,
    //     value: DataTypes.string,
    //     amd: DataTypes.bool,
    //     diffEditor: DataTypes.bool,
    //     srcPath: DataTypes.string,
    //     language: DataTypes.string,
    //     theme: DataTypes.string, // vs, hc-black
    //     options: DataTypes.object,
    // };

    initData() {
        return {
            width: '100%',
            height: '100%',
            amd: true, // 默认通过amd加载
            diffEditor: false,
            srcPath: 'https://code.bdstatic.com/npm/monaco-editor@0.21.2/min/', // 默认通过cdn拉资源
            language: 'javascript',
            theme: 'vs'
        };
    }

    attached() {
        this.initMonaco();
    }

    static computed: SanComputedProps = {
        style() {
            let width = this.data.get('width');
            let height = this.data.get('height');

            let style = {
                width: isNumber(width) ? `${width}px` : width,
                height: isNumber(height) ? `${height}px` : height
            };

            return style;
        }
    }

    async initMonaco() {
        const {amd, srcPath} = this.data.get();
        let monaco;

        try {
            if (amd) {
                monaco = await MonacoLoader.require(srcPath);
            } else {
                monaco = await import('monaco-editor/esm/vs/editor/editor.api');
            }
        } catch(e) {
            throw (e);
        }

        monaco && this.initEditor(monaco);
    }

    initEditor(monaco: any) {
        const { options, language, theme, value, readonly} = this.data.get();

        let editor = monaco.editor.create(this.ref('monaco'), {
            ...options,
            value,
            language,
            readOnly: readonly,
            theme
        });

        this.data.set('monaco', monaco);
        this.data.set('editor', editor);
        this.fire('attached', monaco);
        this.bindWatch();
        this.bindListener();
    }

    bindWatch() {
        let editor = this.data.get('editor');
        let monaco = this.data.get('monaco');

        this.watch('value', value => {
            editor && editor.getModel().setValue(value);
        });
        
        this.watch('language', language => {
            monaco && monaco.editor.setModelLanguage(editor.getModel(), language);
        });

        this.watch('theme', theme => {
            monaco && monaco.editor.setTheme(theme);
        });

        // todo 不生效
        this.watch('width', () => {
            editor.layout();
        });
        this.watch('height', () => {
            editor.layout();
        });

        this.watch('options', options => {
            editor.updateOptions(options)
        });
    }

    bindListener() {
        let editor = this.data.get('editor');

        const changeListener = editor.onDidChangeModelContent((e: Event) => {
            this.fire('change', editor.getValue());
        });

        const keyDowmListener = editor.onKeyDown((e: IKeyboardEvent) => {
            this.fire('keydown', e);
        });

        const keyUpListener = editor.onKeyUp((e: IKeyboardEvent) => {
            this.fire('keyup', e);
        });

        this.data.set('changeListener', changeListener);
        this.data.set('keyDowmListener', keyDowmListener);
        this.data.set('keyUpListener', keyUpListener);
    }

    getEditor() {
        return this.data.get('editor');
    }

    getMonaco() {
        return this.data.get('monaco');
    }

    detached() {
        let {
            editor,
            changeListener,
            keyDowmListener,
            keyUpListener
        } = this.data.get('');

        let model = editor && editor.getModel();

        editor && editor.dispose();
        model && model.dispose();
        changeListener && changeListener.dispose();
        keyDowmListener && keyDowmListener.dispose();
        keyUpListener && keyUpListener.dispose();

        this.fire('detached', editor);
    }
}
