/**
 * monacoEditor
 *
 * @file monacoEditor.ts
 * @author guyunlong
 */

import { Component, DataTypes } from "san";
import { MonacoLoader } from './monacoLoader';
import { SanComputedProps } from './interface';
import { isNumber } from './util';

const template = `
    <template>
        <div s-ref="monaco" class="s-monaco-editor" style="{{style}}"></div>
    </template>
`;

export default class MonacoDiffEditor extends Component {
    static template = template;
    // static dataTypes = {
    //     width: DataTypes.number || DataTypes.string,
    //     height: DataTypes.number || DataTypes.string,
    //     originalValue: DataTypes.string,
    //     modifiedValue: DataTypes.string,
    //     amd: DataTypes.bool,
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
        const { options, language, theme, originalValue, modifiedValue, readonly } = this.data.get();
        let editor = monaco.editor.createDiffEditor(this.ref('monaco'), {
            ...options,
            readonly,
            theme
        });

        const originalModel = monaco.editor.createModel(originalValue, language);
        const modifiedModel = monaco.editor.createModel(modifiedValue, language);

        editor.setModel({
            original: originalModel,
            modified: modifiedModel
        });

        this.fire('attached', monaco);

        this.data.set('monaco', monaco);
        this.data.set('editor', editor);
        this.bindWatch();
        this.bindListener();
    }

    bindWatch() {
        const editor = this.data.get('editor');
        const monaco = this.data.get('monaco');
        const model = editor.getModel();

        this.watch('originalValue', original => {
            model.original.setValue(original);
        });

        this.watch('modifiedValue', modified => {
            model.modified.setValue(modified);
        });
        
        this.watch('language', language => {
            monaco && monaco.editor.setModelLanguage(model.original, language);
            monaco && monaco.editor.setModelLanguage(model.modified, language);
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
        const editor = this.data.get('editor');
        const model = editor.getModel();

        const changeListener = model.modified.onDidChangeContent((e: Event) => {
            this.fire('change',  model.modified.getValue());
        });

        this.data.set('changeListener', changeListener);
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
            changeListener
        } = this.data.get('');

        let { original, modified } = editor && editor.getModel();

        editor && editor.dispose();

        original && original.dispose();
        modified && modified.dispose();

        changeListener && changeListener.dispose();

        this.fire('detached', editor);
    }
}
