/**
* @file main
* @author guyunlong
*/

import {Component} from 'san';
import _ from 'lodash';

import Sidebar from './components/Sidebar';
import CodeViewer from './components/CodeViewer';
import Toc from './components/Toc';
import routeConfig from './routeConfig';

import './main.less';

export default class Doc extends Component {
    static template = /* html */`
        <div class="main-content">
            <ui-sidebar actived-item="{{route.query.name}}" />
            <div class="doc-content">
                <div id="doc-container" s-ref="container" class="component-container markdown-body" />
            </div>
            <div id="s-toc" class="s-toc" s-ref="toc-container" />
        </div>
    `;

    static components = {
        'ui-sidebar': Sidebar
    };

    docComponent: any;

    attached() {
        const route = this.data.get('route');
        const current = _.find(routeConfig, item => {
            return item.name.toLocaleLowerCase() === route.query.name
        });
        this.init(current, route.query);
    }

    initCodeViewer() {
        const codes = this.docComponent.rawChildren;
        codes.forEach((item, index) => {
            const comp = new CodeViewer({data: {code: item}});
            comp.attach(document.getElementById(`code-viewer-${index}`));
        });
    }

    initToc() {
        new Toc().attach(this.ref('toc-container'));
    }

    // init操作写在一起
    async init(component, query) {
        const {type = 'components', name} = query;
        const {default: Factory} = await import(`./${type}/${name}.md`);
        this.docComponent = new Factory();
        this.docComponent.attach(this.ref('container'));

        this.initCodeViewer();
        this.initToc();
    }

    dispose() {
        if (this.docComponent) {
            this.docComponent.dispose();
        }
    }

    // 监听路由的钩子
    route() {
        const route = this.data.get('route');
        // 下一跳的组件
        const component = _.find(routeConfig, item => {
            return item.name.toLocaleLowerCase() === _.get(route, 'query.name')
        });
        this.reRender(component, route.query);
    }

    // 动态路由组件是复用的，并不会重新触发生命周期
    reRender(component, query) {
        if (this.docComponent) {
            // 清空dom内容，重新渲染一份新的
            document.getElementById('doc-container').innerHTML = '';
            document.getElementById('s-toc').innerHTML = '';
            this.init(component, query);
        }
    }
}