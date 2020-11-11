/**
* @file scripts/loaders/demo-loader.js
* @author guyunlong
*/

exports = module.exports = function (source) {
    const blockReg = new RegExp('####([\\s\\S]+?)```\\n');
    let matchBlockResult = blockReg.exec(source);

    while (matchBlockResult) {
        const tmp = matchBlockResult[0].replace('####', '<!--h4-->');
        const block = `<div class="s-doc-demo">\n${tmp}</div>\n\n`;
        source = source.replace(blockReg, block);
        matchBlockResult = blockReg.exec(source);
    }

    source = source.replace(new RegExp('<!--h4-->', 'g'), '\n####');

    const codeReg = new RegExp('```js([\\s\\S]+?)```');
    let codes = [];
    let matchResult = codeReg.exec(source);

    while (matchResult) {
        const component = '```san\n' + matchResult[1] + '```\n';
        const viwerDom = `<div class="code-viewer" id="code-viewer-${codes.length}"></div>`;
        const replacedStr = component + viwerDom;
        source = source.replace(codeReg, replacedStr);
        codes.push(matchResult[1]);
        matchResult = codeReg.exec(source);
    }

    return source;
};
