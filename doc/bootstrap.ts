/**
 * demo启动模块
 *
 * @file bootstrap.ts
 * @author guyunlong
 */

import Doc from "./main";
import { router } from 'san-router';
import './index.less';

export const startUp = () => {
    router.add({rule: '/:type/:name', Component: Doc, target: '#app'});

    router.listen(function (e: { path: string; stop: () => void; }) {
        if (e.path === '/') {
            e.stop();
            this.locator.redirect('/markdown/start');
        }
    });

    router.start();
};
