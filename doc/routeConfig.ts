/**
 * route
 *
 * @file route
 * @author guyunlong
 */
export default [
    {
        name: '快速开始',
        rule: '/markdown/start',
        Component: () => import(/* webpackChunkName: "start" */ './markdown/start.md')
    },
    {
        name: 'MonacoEditor',
        rule: '/markdown/monacoEditor',
        Component: () => import(/* webpackChunkName: "monacoEditor" */ './markdown/monacoEditor.md')
    },
    {
        name: 'MonacoDiffEditor',
        rule: '/markdown/monacoDiffEditor',
        Component: () => import(/* webpackChunkName: "monacoDiffEditor" */ './markdown/monacoDiffEditor.md')
    }
];
