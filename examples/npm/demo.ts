/**
 * monaco-editor demo
 *
 * @file monacoEditor.ts
 * @author guyunlong
 */

import { Component } from "san";
import { MonacoEditor, MonacoDiffEditor } from "monaco";
import './demo.less';

const template = `
    <template>
        <s-monaco
            amd="{{false}}"
            value="{{value1}}"
            theme="{{theme}}"
            language="{{language1}}"
            width="{{width}}"
            height="{{height}}"
            options="{{options1}}"
            on-change="onChange"
        />
        <s-monaco
            amd="{{false}}"
            value="{{value2}}"
            theme="{{theme}}"
            language="{{language2}}"
            width="{{width}}"
            height="{{height}}"
            options="{{options2}}"
            on-change="onChange"
        />
        <s-diff-monaco
            amd="{{false}}"
            originalValue="{{original}}"
            modifiedValue="{{modified}}"
            theme="{{theme}}"
            language="{{'text/plain'}}"
            width="{{width}}"
            height="{{height}}"
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
            value1: "// jqeuery excerpt:\n//       1         2         3         4\n//34567890123456789012345678901234567890\n\/*!\r\n * Sizzle CSS Selector Engine v2.3.0\r\n * https:\/\/sizzlejs.com\/\r\n *\r\n * Copyright jQuery Foundation and other contributors\r\n * Released under the MIT license\r\n * http:\/\/jquery.org\/license\r\n *\r\n * Date: 2016-01-04\r\n *\/\r\n(function( window ) {\r\n\r\nvar i,\r\n\tsupport,\r\n\tExpr,\r\n\tgetText,\r\n\tisXML,\r\n\ttokenize,\r\n\tcompile,\r\n\tselect,\r\n\toutermostContext,\r\n\tsortInput,\r\n\thasDuplicate,\r\n\r\n\t\/\/ Local document vars\r\n\tsetDocument,\r\n\tdocument,\r\n\tdocElem,\r\n\tdocumentIsHTML,\r\n\trbuggyQSA,\r\n\trbuggyMatches,\r\n\tmatches,\r\n\tcontains,\r\n\r\n\t\/\/ Instance-specific data\r\n\texpando = \"sizzle\" + 1 * new Date(),\r\n\tpreferredDoc = window.document,\r\n\tdirruns = 0,\r\n\tdone = 0,\r\n\tclassCache = createCache(),\r\n\ttokenCache = createCache(),\r\n\tcompilerCache = createCache(),\r\n\tsortOrder = function( a, b ) {\r\n\t\tif ( a === b ) {\r\n\t\t\thasDuplicate = true;\r\n\t\t}\r\n\t\treturn 0;\r\n\t},\r\n\r\n\t\/\/ Instance methods\r\n\thasOwn = ({}).hasOwnProperty,\r\n\tarr = [],\r\n\tpop = arr.pop,\r\n\tpush_native = arr.push,\r\n\tpush = arr.push,\r\n\tslice = arr.slice,\r\n\t\/\/ Use a stripped-down indexOf as it\'s faster than native\r\n\t\/\/ https:\/\/jsperf.com\/thor-indexof-vs-for\/5\r\n\tindexOf = function( list, elem ) {\r\n\t\tvar i = 0,\r\n\t\t\tlen = list.length;\r\n\t\tfor ( ; i < len; i++ ) {\r\n\t\t\tif ( list[i] === elem ) {\r\n\t\t\t\treturn i;\r\n\t\t\t}\r\n\t\t}\r\n\t\treturn -1;\r\n\t},\r\n\r\n\tbooleans = \"checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped\",\r\n\r\n\t\/\/ Regular expressions\r\n\r\n\t\/\/ http:\/\/www.w3.org\/TR\/css3-selectors\/#whitespace\r\n\twhitespace = \"[\\\\x20\\\\t\\\\r\\\\n\\\\f]\",\r\n\r\n\t\/\/ http:\/\/www.w3.org\/TR\/CSS21\/syndata.html#value-def-identifier\r\n\tidentifier = \"(?:\\\\\\\\.|[\\\\w-]|[^\\0-\\\\xa0])+\",\r\n\r\n\t\/\/ Attribute selectors: http:\/\/www.w3.org\/TR\/selectors\/#attribute-selectors\r\n\tattributes = \"\\\\[\" + whitespace + \"*(\" + identifier + \")(?:\" + whitespace +\r\n\t\t\/\/ Operator (capture 2)\r\n\t\t\"*([*^$|!~]?=)\" + whitespace +\r\n\t\t\/\/ \"Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]\"\r\n\t\t\"*(?:\'((?:\\\\\\\\.|[^\\\\\\\\\'])*)\'|\\\"((?:\\\\\\\\.|[^\\\\\\\\\\\"])*)\\\"|(\" + identifier + \"))|)\" + whitespace +\r\n\t\t\"*\\\\]\",\r\n\r\n\tpseudos = \":(\" + identifier + \")(?:\\\\((\" +\r\n\t\t\/\/ To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:\r\n\t\t\/\/ 1. quoted (capture 3; capture 4 or capture 5)\r\n\t\t\"(\'((?:\\\\\\\\.|[^\\\\\\\\\'])*)\'|\\\"((?:\\\\\\\\.|[^\\\\\\\\\\\"])*)\\\")|\" +\r\n\t\t\/\/ 2. simple (capture 6)\r\n\t\t\"((?:\\\\\\\\.|[^\\\\\\\\()[\\\\]]|\" + attributes + \")*)|\" +\r\n\t\t\/\/ 3. anything else (capture 2)\r\n\t\t\".*\" +\r\n\t\t\")\\\\)|)\",\r\n\r\n\t\/\/ Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter\r\n\trwhitespace = new RegExp( whitespace + \"+\", \"g\" ),\r\n\trtrim = new RegExp( \"^\" + whitespace + \"+|((?:^|[^\\\\\\\\])(?:\\\\\\\\.)*)\" + whitespace + \"+$\", \"g\" ),\r\n\r\n\trcomma = new RegExp( \"^\" + whitespace + \"*,\" + whitespace + \"*\" ),\r\n\trcombinators = new RegExp( \"^\" + whitespace + \"*([>+~]|\" + whitespace + \")\" + whitespace + \"*\" ),\r\n\r\n\trattributeQuotes = new RegExp( \"=\" + whitespace + \"*([^\\\\]\'\\\"]*?)\" + whitespace + \"*\\\\]\", \"g\" ),\r\n\r\n\trpseudo = new RegExp( pseudos ),\r\n\tridentifier = new RegExp( \"^\" + identifier + \"$\" ),\r\n\r\n\tmatchExpr = {\r\n\t\t\"ID\": new RegExp( \"^#(\" + identifier + \")\" ),\r\n\t\t\"CLASS\": new RegExp( \"^\\\\.(\" + identifier + \")\" ),\r\n\t\t\"TAG\": new RegExp( \"^(\" + identifier + \"|[*])\" ),\r\n\t\t\"ATTR\": new RegExp( \"^\" + attributes ),\r\n\t\t\"PSEUDO\": new RegExp( \"^\" + pseudos ),\r\n\t\t\"CHILD\": new RegExp( \"^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\\\(\" + whitespace +\r\n\t\t\t\"*(even|odd|(([+-]|)(\\\\d*)n|)\" + whitespace + \"*(?:([+-]|)\" + whitespace +\r\n\t\t\t\"*(\\\\d+)|))\" + whitespace + \"*\\\\)|)\", \"i\" ),\r\n\t\t\"bool\": new RegExp( \"^(?:\" + booleans + \")$\", \"i\" ),\r\n\t\t\/\/ For use in libraries implementing .is()\r\n\t\t\/\/ We use this for POS matching in `select`\r\n\t\t\"needsContext\": new RegExp( \"^\" + whitespace + \"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\\\(\" +\r\n\t\t\twhitespace + \"*((?:-\\\\d)?\\\\d*)\" + whitespace + \"*\\\\)|)(?=[^-]|$)\", \"i\" )\r\n\t},\r\n\r\n\trinputs = \/^(?:input|select|textarea|button)$\/i,\r\n\trheader = \/^h\\d$\/i,\r\n\r\n\trnative = \/^[^{]+\\{\\s*\\[native \\w\/,\r\n\r\n\t\/\/ Easily-parseable\/retrievable ID or TAG or CLASS selectors\r\n\trquickExpr = \/^(?:#([\\w-]+)|(\\w+)|\\.([\\w-]+))$\/,\r\n\r\n\trsibling = \/[+~]\/,\r\n\r\n\t\/\/ CSS escapes\r\n\t\/\/ http:\/\/www.w3.org\/TR\/CSS21\/syndata.html#escaped-characters\r\n\trunescape = new RegExp( \"\\\\\\\\([\\\\da-f]{1,6}\" + whitespace + \"?|(\" + whitespace + \")|.)\", \"ig\" ),\r\n\tfunescape = function( _, escaped, escapedWhitespace ) {\r\n\t\tvar high = \"0x\" + escaped - 0x10000;\r\n\t\t\/\/ NaN means non-codepoint\r\n\t\t\/\/ Support: Firefox<24\r\n\t\t\/\/ Workaround erroneous numeric interpretation of +\"0x\"\r\n\t\treturn high !== high || escapedWhitespace ?\r\n\t\t\tescaped :\r\n\t\t\thigh < 0 ?\r\n\t\t\t\t\/\/ BMP codepoint\r\n\t\t\t\tString.fromCharCode( high + 0x10000 ) :\r\n\t\t\t\t\/\/ Supplemental Plane codepoint (surrogate pair)\r\n\t\t\t\tString.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );\r\n\t},\r\n\r\n\t\/\/ CSS string\/identifier serialization\r\n\t\/\/ https:\/\/drafts.csswg.org\/cssom\/#common-serializing-idioms\r\n\trcssescape = \/([\\0-\\x1f\\x7f]|^-?\\d)|^-$|[^\\x80-\\uFFFF\\w-]\/g,\r\n\tfcssescape = function( ch, asCodePoint ) {\r\n\t\tif ( asCodePoint ) {\r\n\r\n\t\t\t\/\/ U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER\r\n\t\t\tif ( ch === \"\\0\" ) {\r\n\t\t\t\treturn \"\\uFFFD\";\r\n\t\t\t}\r\n\r\n\t\t\t\/\/ Control characters and (dependent upon position) numbers get escaped as code points\r\n\t\t\treturn ch.slice( 0, -1 ) + \"\\\\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + \" \";\r\n\t\t}\r\n\r\n\t\t\/\/ Other potentially-special ASCII characters get backslash-escaped\r\n\t\treturn \"\\\\\" + ch;\r\n\t},\r\n\r\n\t\/\/ Used for iframes\r\n\t\/\/ See setDocument()\r\n\t\/\/ Removing the function wrapper causes a \"Permission Denied\"\r\n\t\/\/ error in IE\r\n\tunloadHandler = function() {\r\n\t\tsetDocument();\r\n\t},\r\n\r\n\tdisabledAncestor = addCombinator(\r\n\t\tfunction( elem ) {\r\n\t\t\treturn elem.disabled === true;\r\n\t\t},\r\n\t\t{ dir: \"parentNode\", next: \"legend\" }\r\n\t);})",
            value2: "// jqeuery excerpt:\n//       1         2         3         4\n//34567890123456789012345678901234567890\n\/*!\r\n * Sizzle CSS Selector Engine v2.3.0\r\n * https:\/\/sizzlejs.com\/\r\n *\r\n * Copyright jQuery Foundation and other contributors\r\n * Released under the MIT license\r\n * http:\/\/jquery.org\/license\r\n *\r\n * Date: 2016-01-04\r\n *\/\r\n(function( window ) {\r\n\r\nvar i,\r\n\tsupport,\r\n\tExpr,\r\n\tgetText,\r\n\tisXML,\r\n\ttokenize,\r\n\tcompile,\r\n\tselect,\r\n\toutermostContext,\r\n\tsortInput,\r\n\thasDuplicate,\r\n\r\n\t\/\/ Local document vars\r\n\tsetDocument,\r\n\tdocument,\r\n\tdocElem,\r\n\tdocumentIsHTML,\r\n\trbuggyQSA,\r\n\trbuggyMatches,\r\n\tmatches,\r\n\tcontains,\r\n\r\n\t\/\/ Instance-specific data\r\n\texpando = \"sizzle\" + 1 * new Date(),\r\n\tpreferredDoc = window.document,\r\n\tdirruns = 0,\r\n\tdone = 0,\r\n\tclassCache = createCache(),\r\n\ttokenCache = createCache(),\r\n\tcompilerCache = createCache(),\r\n\tsortOrder = function( a, b ) {\r\n\t\tif ( a === b ) {\r\n\t\t\thasDuplicate = true;\r\n\t\t}\r\n\t\treturn 0;\r\n\t},\r\n\r\n\t\/\/ Instance methods\r\n\thasOwn = ({}).hasOwnProperty,\r\n\tarr = [],\r\n\tpop = arr.pop,\r\n\tpush_native = arr.push,\r\n\tpush = arr.push,\r\n\tslice = arr.slice,\r\n\t\/\/ Use a stripped-down indexOf as it\'s faster than native\r\n\t\/\/ https:\/\/jsperf.com\/thor-indexof-vs-for\/5\r\n\tindexOf = function( list, elem ) {\r\n\t\tvar i = 0,\r\n\t\t\tlen = list.length;\r\n\t\tfor ( ; i < len; i++ ) {\r\n\t\t\tif ( list[i] === elem ) {\r\n\t\t\t\treturn i;\r\n\t\t\t}\r\n\t\t}\r\n\t\treturn -1;\r\n\t},\r\n\r\n\tbooleans = \"checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped\",\r\n\r\n\t\/\/ Regular expressions\r\n\r\n\t\/\/ http:\/\/www.w3.org\/TR\/css3-selectors\/#whitespace\r\n\twhitespace = \"[\\\\x20\\\\t\\\\r\\\\n\\\\f]\",\r\n\r\n\t\/\/ http:\/\/www.w3.org\/TR\/CSS21\/syndata.html#value-def-identifier\r\n\tidentifier = \"(?:\\\\\\\\.|[\\\\w-]|[^\\0-\\\\xa0])+\",\r\n\r\n\t\/\/ Attribute selectors: http:\/\/www.w3.org\/TR\/selectors\/#attribute-selectors\r\n\tattributes = \"\\\\[\" + whitespace + \"*(\" + identifier + \")(?:\" + whitespace +\r\n\t\t\/\/ Operator (capture 2)\r\n\t\t\"*([*^$|!~]?=)\" + whitespace +\r\n\t\t\/\/ \"Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]\"\r\n\t\t\"*(?:\'((?:\\\\\\\\.|[^\\\\\\\\\'])*)\'|\\\"((?:\\\\\\\\.|[^\\\\\\\\\\\"])*)\\\"|(\" + identifier + \"))|)\" + whitespace +\r\n\t\t\"*\\\\]\",\r\n\r\n\tpseudos = \":(\" + identifier + \")(?:\\\\((\" +\r\n\t\t\/\/ To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:\r\n\t\t\/\/ 1. quoted (capture 3; capture 4 or capture 5)\r\n\t\t\"(\'((?:\\\\\\\\.|[^\\\\\\\\\'])*)\'|\\\"((?:\\\\\\\\.|[^\\\\\\\\\\\"])*)\\\")|\" +\r\n\t\t\/\/ 2. simple (capture 6)\r\n\t\t\"((?:\\\\\\\\.|[^\\\\\\\\()[\\\\]]|\" + attributes + \")*)|\" +\r\n\t\t\/\/ 3. anything else (capture 2)\r\n\t\t\".*\" +\r\n\t\t\")\\\\)|)\",\r\n\r\n\t\/\/ Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter\r\n\trwhitespace = new RegExp( whitespace + \"+\", \"g\" ),\r\n\trtrim = new RegExp( \"^\" + whitespace + \"+|((?:^|[^\\\\\\\\])(?:\\\\\\\\.)*)\" + whitespace + \"+$\", \"g\" ),\r\n\r\n\trcomma = new RegExp( \"^\" + whitespace + \"*,\" + whitespace + \"*\" ),\r\n\trcombinators = new RegExp( \"^\" + whitespace + \"*([>+~]|\" + whitespace + \")\" + whitespace + \"*\" ),\r\n\r\n\trattributeQuotes = new RegExp( \"=\" + whitespace + \"*([^\\\\]\'\\\"]*?)\" + whitespace + \"*\\\\]\", \"g\" ),\r\n\r\n\trpseudo = new RegExp( pseudos ),\r\n\tridentifier = new RegExp( \"^\" + identifier + \"$\" ),\r\n\r\n\tmatchExpr = {\r\n\t\t\"ID\": new RegExp( \"^#(\" + identifier + \")\" ),\r\n\t\t\"CLASS\": new RegExp( \"^\\\\.(\" + identifier + \")\" ),\r\n\t\t\"TAG\": new RegExp( \"^(\" + identifier + \"|[*])\" ),\r\n\t\t\"ATTR\": new RegExp( \"^\" + attributes ),\r\n\t\t\"PSEUDO\": new RegExp( \"^\" + pseudos ),\r\n\t\t\"CHILD\": new RegExp( \"^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\\\(\" + whitespace +\r\n\t\t\t\"*(even|odd|(([+-]|)(\\\\d*)n|)\" + whitespace + \"*(?:([+-]|)\" + whitespace +\r\n\t\t\t\"*(\\\\d+)|))\" + whitespace + \"*\\\\)|)\", \"i\" ),\r\n\t\t\"bool\": new RegExp( \"^(?:\" + booleans + \")$\", \"i\" ),\r\n\t\t\/\/ For use in libraries implementing .is()\r\n\t\t\/\/ We use this for POS matching in `select`\r\n\t\t\"needsContext\": new RegExp( \"^\" + whitespace + \"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\\\(\" +\r\n\t\t\twhitespace + \"*((?:-\\\\d)?\\\\d*)\" + whitespace + \"*\\\\)|)(?=[^-]|$)\", \"i\" )\r\n\t},\r\n\r\n\trinputs = \/^(?:input|select|textarea|button)$\/i,\r\n\trheader = \/^h\\d$\/i,\r\n\r\n\trnative = \/^[^{]+\\{\\s*\\[native \\w\/,\r\n\r\n\t\/\/ Easily-parseable\/retrievable ID or TAG or CLASS selectors\r\n\trquickExpr = \/^(?:#([\\w-]+)|(\\w+)|\\.([\\w-]+))$\/,\r\n\r\n\trsibling = \/[+~]\/,\r\n\r\n\t\/\/ CSS escapes\r\n\t\/\/ http:\/\/www.w3.org\/TR\/CSS21\/syndata.html#escaped-characters\r\n\trunescape = new RegExp( \"\\\\\\\\([\\\\da-f]{1,6}\" + whitespace + \"?|(\" + whitespace + \")|.)\", \"ig\" ),\r\n\tfunescape = function( _, escaped, escapedWhitespace ) {\r\n\t\tvar high = \"0x\" + escaped - 0x10000;\r\n\t\t\/\/ NaN means non-codepoint\r\n\t\t\/\/ Support: Firefox<24\r\n\t\t\/\/ Workaround erroneous numeric interpretation of +\"0x\"\r\n\t\treturn high !== high || escapedWhitespace ?\r\n\t\t\tescaped :\r\n\t\t\thigh < 0 ?\r\n\t\t\t\t\/\/ BMP codepoint\r\n\t\t\t\tString.fromCharCode( high + 0x10000 ) :\r\n\t\t\t\t\/\/ Supplemental Plane codepoint (surrogate pair)\r\n\t\t\t\tString.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );\r\n\t},\r\n\r\n\t\/\/ CSS string\/identifier serialization\r\n\t\/\/ https:\/\/drafts.csswg.org\/cssom\/#common-serializing-idioms\r\n\trcssescape = \/([\\0-\\x1f\\x7f]|^-?\\d)|^-$|[^\\x80-\\uFFFF\\w-]\/g,\r\n\tfcssescape = function( ch, asCodePoint ) {\r\n\t\tif ( asCodePoint ) {\r\n\r\n\t\t\t\/\/ U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER\r\n\t\t\tif ( ch === \"\\0\" ) {\r\n\t\t\t\treturn \"\\uFFFD\";\r\n\t\t\t}\r\n\r\n\t\t\t\/\/ Control characters and (dependent upon position) numbers get escaped as code points\r\n\t\t\treturn ch.slice( 0, -1 ) + \"\\\\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + \" \";\r\n\t\t}\r\n\r\n\t\t\/\/ Other potentially-special ASCII characters get backslash-escaped\r\n\t\treturn \"\\\\\" + ch;\r\n\t},\r\n\r\n\t\/\/ Used for iframes\r\n\t\/\/ See setDocument()\r\n\t\/\/ Removing the function wrapper causes a \"Permission Denied\"\r\n\t\/\/ error in IE\r\n\tunloadHandler = function() {\r\n\t\tsetDocument();\r\n\t},\r\n\r\n\tdisabledAncestor = addCombinator(\r\n\t\tfunction( elem ) {\r\n\t\t\treturn elem.disabled === true;\r\n\t\t},\r\n\t\t{ dir: \"parentNode\", next: \"legend\" }\r\n\t);})",
            original: "This line is removed on the right.\njust some text\nabcd\nefgh\nSome more text",
            modified: "just some text\nabcz\nzzzzefgh\nSome more text.\nThis line is removed on the left.",

            language1: 'javascript',
            language2: 'javascript',

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

    attached() {
        setTimeout(() => {
            // this.data.set('value1', `{"test": "我变了，value1"}`);
            // this.data.set('language1', 'json');
            this.data.set('width', 500);
            this.data.set('height', 500);
        }, 2000)
        setTimeout(() => {
            this.data.set('value2', `{"test": "我变了，value2"}`);
            this.data.set('language2', 'json');
            this.data.set('options2', {
                theme: 'hc-black',
                scrollBeyondLastLine: false,
                lineNumbersMinChars: 3,
                lineDecorationsWidth: 1,
                minimap: {
                    enabled: true
                }
            })
            this.data.set('width', 500);
            this.data.set('height', 500);
        }, 5000)
    }

    onChange(value: string) {
        console.log(value)
    }
}
