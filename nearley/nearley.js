const fs = require('fs');
const nearley = require('nearley');
const grammar = require('./grammar');
const lexer = require('./lexer');
const generate = require('./generate');

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

const input = fs.readFileSync('nearley/input.verb', 'utf8');
console.log('INPUT\n', input);

// view tokens
console.log('TOKENS');
lexer.reset(input);
for (let token of lexer) {
  console.log(token);
}

// parse
parser.feed(input);
if (parser.results.length > 1) throw new Error('Ambiguous grammar');

const parsed = parser.results[0];
console.log('PARSED\n', JSON.stringify(parsed, null, '  '));

// transpile
const transpiled = generate(parsed);
fs.writeFileSync('nearley/output.js', transpiled);
