/**
* @file CodeViewr.js
* @author guyunlong
*/

import { defineComponent } from 'san';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';

import './codeviewer.less';
hljs.registerLanguage('javascript', javascript);

export default defineComponent({
    template: /* html */`
        <template>
            <header class="toolbox">
                <div on-click="viewCode">{{open ? '关闭代码' : '显示代码'}}</div>
            </header>
            <pre s-if="open"><code class="hljs html xml">{{code | highlight | raw}}</code></pre>
            <footer class="open"><i class="iconfont icon-arrow-down"></i></footer>
        </template>
    `,

    filters: {
        highlight(code) {
            return hljs.highlight('javascript', code.trim()).value;
        }
    },

    initData() {
        return {
            code: ''
        };
    },

    viewCode() {
        this.data.set('open', !this.data.get('open'));
    }
});
