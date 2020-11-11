# 代码编辑器（MonacoEditor）
代码编辑器
本文档只演示常用功能，更多的高级功能请参考<a href='https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html'>monaco-editor官方文档</a>和<a href='https://microsoft.github.io/monaco-editor/playground.html'>monaco-editor官方示例</a>

## 代码演示
#### 基本用法

```js
import {defineComponent} from 'san';
import {MonacoDiffEditor} from 'monaco';

export default defineComponent({
    template: `
    <template>
        <s-diff-monaco
            originalValue="{{original}}"
            modifiedValue="{{modified}}"
            language="{{'text/plain'}}"
            height="{{height}}"
        />
    </template>
    `,

    components: {
        "s-diff-monaco": MonacoDiffEditor
    },

    initData() {
        return {
            original: "This line is removed on the right.\njust some text\nabcd\nefgh\nSome more text",
            modified: "just some text\nabcz\nzzzzefgh\nSome more text.\nThis line is removed on the left.",
            theme: 'vs',
            height: 300
        };
    }
});

```

#### 内联diff代码编辑器

```js
import {defineComponent} from 'san';
import {MonacoDiffEditor} from 'monaco';

export default defineComponent({
    template: `
    <template>
        <s-diff-monaco
            originalValue="{{original}}"
            modifiedValue="{{modified}}"
            language="{{'text/plain'}}"
            height="{{height}}"
            options="{{options}}"
        />
    </template>
    `,

    components: {
        "s-diff-monaco": MonacoDiffEditor
    },

    initData() {
        return {
            original: "This line is removed on the right.\njust some text\nabcd\nefgh\nSome more text",
            modified: "just some text\nabcz\nzzzzefgh\nSome more text.\nThis line is removed on the left.",
            theme: 'vs',
            height: 300,
            options: {
                lineNumbersMinChars: 3,
                lineDecorationsWidth: 1,
                // You can optionally disable the resizing
                enableSplitViewResizing: false,

                // Render the diff inline
                renderSideBySide: false
            }
        };
    }
});

```






## 属性、事件和Slot
#### Props
输入框的属性说明如下：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| originalValue | 初始代码 | string | 空 |
| modifiedValue | 对比代码 | string | 空 |
| readonly | 只读 | bool | false |
| width | 宽度 | string、number | '100%' |
| height | 高度 | string、number | '100%' |
| amd | 依赖的所有语言包通过amd方式加载| bool | true |
| srcPath | 静态资源路径，当amd为true时生效，默认路径为cdn地址 | string | https://code.bdstatic.com/npm/monaco-editor@0.21.2/min/ |
| language | 编辑器语言 | string | javascript |
| theme | 编辑器主题 | string | vs |
| options | 编辑器选项 | object | {} |


#### 事件
输入框对外暴露的事件如下：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| on-change | 改变时触发 | event: Event |
| on-attached | 编辑器挂载到dom节点时触发 | event: Event |
| on-detached | 编辑器从页面卸载时触发 | event: Event |


