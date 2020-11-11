/**
 * 文档右侧目录
 *
 * @file Toc.ts
 * @author guyunlong
 */
import { defineComponent } from 'san';

import './toc.less';

export default defineComponent({
    template: `
        <ul>
            <li
                s-for="item, index in datasource"
                class="s-doc-toc-item {{index === activedIndex ? 's-doc-toc-item-selected' : ''}}"
            >
                <a href="#{{item}}">{{item}}</a>
            </li>
        </ul>
    `,

    initData() {
        return {
            activedIndex: -1
        };
    },

    attached() {
        const anchors = Array.from(document.querySelectorAll('h4'));
        const datasource = anchors.map(item => item.getAttribute('id'));
        this.data.set('datasource', datasource);

        window.addEventListener('scroll', () => {
            const scroll = document.body.scrollTop || document.documentElement.scrollTop;

            for (let i = 0; i < anchors.length; i++) {
                if (i === anchors.length - 1) {
                    if (scroll - anchors[i].offsetTop >= 0) {
                        this.data.set('activedIndex', i);
                        continue;
                    }
                }
                else if (scroll - anchors[i].offsetTop >= 0 && scroll - anchors[i + 1].offsetTop <= 0) {
                    this.data.set('activedIndex', i);
                    continue;
                }

                if (scroll - anchors[0].offsetTop < 0) {
                    this.data.set('activedIndex', -1);
                }
            }
        });
    }
});
