const moo = require('moo');
const IndentationLexer = require('moo-indentation-lexer');

const mooLexer = moo.compile({
  WS: /[ \t]+/,
  comment: /(?:\/\/.*?$|\/\*(?:.|\n|\r)*?\*\/)/,
  string: /(?:'.*?'|".*?"|`.*?`)/,
  number: /0|-?[1-9]\d*(?:\.\d+)?/,
  assign: 'is',
  bool: ['true', 'false'],
  identifier: /[a-zA-Z_][a-zA-Z_0-9]*/,
  obj_sep: ':',
  arr_sep: '-',
  // operator: /(?:\+|-|\*|\/)/,
  NL: { match: /\n+/, lineBreaks: true },
});

const lexer = new IndentationLexer({
  lexer: mooLexer,
  indentationType: 'WS',
  newlineType: 'NL',
  commentType: 'comment',
  indentName: 'indent',
  dedentName: 'dedent',
});

module.exports = lexer;
