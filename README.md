# san-monaco-editor
san-monaco-editor是基于vscode的核心代码编辑器<a href="https://github.com/microsoft/monaco-editor">monaco-editor</a>封装的san组件


# 安装
### npm安装
```
$ npm install san-monaco-editor 
```

### CDN
我们建议使用 CDN 引入的用户在链接地址上锁定版本，以免将来 san-monaco-editor 升级时受到非兼容性更新的影响。锁定版本的方法请查看changelog或者<a href="http://agile.baidu.com/?ciIcafeOnlineUrl=http%3A%2F%2Ficafe.baidu.com%3A8000%2Ficafe%2Ficafeprocess%2FviewProcessInfo.action%3FprocessId%3D&issueBaseUrl=http%3A%2F%2Ficafe.baidu.com%2F&newIcafeBaseUrl=http%3A%2F%2Fnewicafe.baidu.com%2F#/builds/baidu/baiducloud/san-monaco-editor@MasterPipeline@master">agile平台</a>最新版本（目前）。

```
<script src="https://bce.bdstatic.com/lib/san-monaco-editor/${version}/monaco"></script>
<!-- 例如 -->
<script src="https://bce.bdstatic.com/lib/san-monaco-editor/1.0.0.4/monaco"></script>
```

# 使用方式
```
import { Component } from "san";
import { MonacoEditor, MonacoDiffEditor } from "monaco";

const template = `
    <template>
        <s-monaco
            value="{{value}}"
            theme="{{theme}}"
            language="{{language1}}"
            width="{{width}}"
            height="{{height}}"
            options="{{options1}}"
            on-change="onChange"
        />
        <s-diff-monaco
            originalValue="{{original}}"
            modifiedValue="{{modified}}"
            theme="{{theme}}"
            language="{{'text/plain'}}"
            width="{{width}}"
            height="{{height}}"
            options="{{options2}}"
            on-change="onChange"
        />
    </template>
`;

export default class Demo extends Component {
    static template = template;

    static components = {
        "s-monaco": MonacoEditor,
        "s-diff-monaco": MonacoDiffEditor
    };

    initData() {
        return {
            value: 'test'
            original: "This line is removed on the right.\njust some text\nabcd\nefgh\nSome more text",
            modified: "just some text\nabcz\nzzzzefgh\nSome more text.\nThis line is removed on the left.",

            language: 'javascript',

            theme: 'vs',

            width: 800,
            height: 500,
            options1: {
                lineNumbersMinChars: 3,
                lineDecorationsWidth: 1,
            },
            options2: {
                scrollBeyondLastLine: false,
                lineNumbersMinChars: 3,
                lineDecorationsWidth: 1,
                minimap: {
                    enabled: false
                }
            }
        };
    }

    onChange(value: string) {
        console.log(value)
    }
}

```

# webpack打包按需引入
### <a href="https://www.npmjs.com/package/monaco-editor-webpack-plugin" target="_blank">monaco-editor-webpack-plugin</a> 
下面是webpack配置，具体配置规则参考<a href="https://www.npmjs.com/package/monaco-editor-webpack-plugin">monaco-editor-webpack-plugin</a> 
```
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = {
  plugins: [
    new MonacoWebpackPlugin({
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      languages: ['json']
    })
  ]
};
```

# webpack打包css文件冲突
monaco-editor编辑器在内部使用CSS导入，所以如果您在项目中使用CSS模块，那么默认情况下很可能会发生冲突。为了避免这种情况，分别对应用和monaco-editor使用css-loader进行处理：
```
const path = require('path');
const APP_DIR = path.resolve(__dirname, './src');
const MONACO_DIR = path.resolve(__dirname, './node_modules/monaco-editor');
 
{
  test: /\.css$/,
  include: APP_DIR,
  use: [{
    loader: 'style-loader',
  }, {
    loader: 'css-loader',
    options: {
      modules: true,
      namedExport: true,
    },
  }],
}, {
  test: /\.css$/,
  include: MONACO_DIR,
  use: ['style-loader', 'css-loader'],
}
```
