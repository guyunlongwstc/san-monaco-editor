/**
* @file Sidebar.ts
* @author guyunlong
*/
import { defineComponent } from 'san';
import { Link } from 'san-router';

import routeConfig from '../routeConfig';
import './sidebar.less';

export default defineComponent({
    template: `
        <nav class="s-nav">
            <h3>san-monaco-editor</h3>
            <section class="s-nav-menu">
                <menu>
                    <li s-for="item in filterData"
                        class="s-navi-menu-item {{toLocaleLowerCase(item.name) === toLocaleLowerCase(activedItem) ?
                            's-nav-menu-item-selected' : ''}}"
                        >
                        <router-link to="{{item.rule}}">{{item.name}}</router-link>
                    </li>
                </menu>
            </section>
        </nav>
    `,
    components: {
        'router-link': Link
    },
    initData() {
        return {
            route: routeConfig,
            activedItem: ''
        };
    },
    computed: {
        filterData() {
            const allComp = this.data.get('route');
            const filter = this.data.get('searchText');

            if (!filter) {
                return allComp;
            }

            const filterData = [];
            for (let i = 0; i < allComp.length; i++) {
                if (~(allComp[i].name.toLowerCase().indexOf(filter.toLowerCase()))) {
                    filterData.push(allComp[i]);
                }
            }
            return filterData;
        }
    },
    toLocaleLowerCase(name) {
        return name.toLocaleLowerCase();
    }
});
