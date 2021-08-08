const fs = require('fs');
const { toString } = require('ramda');

const contents = fs.readFileSync('src/input.txt', 'utf8');
console.log(contents);

const reservedMap = {
  true: { type: 'LITERAL', value: true },
  true: { type: 'LITERAL', value: true },
  false: { type: 'LITERAL', value: false },
  is: { type: 'ASSIGNMENT', value: '=' },
  log: { type: 'CALL', value: 'console.log' },
};

// const tokenize = pipe(split(' '), map(trim));
const tokenize = (input) => {
  // current character index
  let current = 0;
  const tokens = [];

  // read character by character
  while (current < input.length) {
    let char = input[current];

    // skip spaces
    if (char === ' ') {
      current++;
      continue;
    }

    // strings
    const SINGLE_QUOTE = /^'$/;
    if (SINGLE_QUOTE.test(char)) {
      // skip quotation mark
      char = input[++current];

      // build string
      let value = '';

      while (!SINGLE_QUOTE.test(char)) {
        // add escaped characters
        const ESCAPE_CHAR = /^\\$/;
        if (ESCAPE_CHAR.test(char)) {
          // add next character
          char = input[++current];
        }

        value += char;
        char = input[++current];
      }

      tokens.push({ type: 'LITERAL', value });

      // skip quotation mark
      char = input[++current];
      continue;
    }
    const DOUBLE_QUOTES = /^"$/;
    if (DOUBLE_QUOTES.test(char)) {
      // skip quotation mark
      char = input[++current];

      // build string
      let value = '';

      while (!DOUBLE_QUOTES.test(char)) {
        // add escaped characters
        const ESCAPE_CHAR = /^\\$/;
        if (ESCAPE_CHAR.test(char)) {
          // add next character
          char = input[++current];
        }

        value += char;
        char = input[++current];
      }

      tokens.push({ type: 'LITERAL', value });

      // skip quotation mark
      char = input[++current];
      continue;
    }

    // starts with number
    const NUMBER = /^\d$/;
    if (NUMBER.test(char)) {
      // build number
      let value = '';

      while (NUMBER.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: 'LITERAL', value: Number(value) });
      continue;
    }

    // starts with alphanumeric and underscore
    // starts with number is handled above so abc123 is a valid identifier, but 123abc is not
    // NOTE: undefined char at end of file can evaluate to true without limiting to one character with /^$/
    const IDENTIFIER = /^\w$/;
    if (IDENTIFIER.test(char)) {
      // build identifier
      let value = '';

      while (IDENTIFIER.test(char)) {
        value += char;
        char = input[++current];
      }

      const reserved = reservedMap[value];
      if (reserved) {
        tokens.push(reserved);
        continue;
      }

      tokens.push({ type: 'IDENTIFIER', value });
      continue;
    }

    throw new Error(`token ${input[current]} cannot be tokenized`);
  }

  return tokens;
};

// Create Abstract Syntax Tree
const parse = (tokens) => {
  // current token index
  let current = 0;

  const walk = () => {
    const token = tokens[current];

    switch (token.type) {
      case 'IDENTIFIER': {
        const node = {
          type: 'IDENTIFIER',
          name: token.value,
          body: [],
        };
        current++;

        // TMP skip assignment
        current++;

        // walk to end of statement
        while (current < tokens.length) {
          node.body.push(walk());
        }
        return node;
      }
      case 'ASSIGNMENT':
      case 'LITERAL': {
        // go to next token
        current++;

        return token;
      }
      default:
        throw new Error(`token type ${token.type} cannot be parsed`);
    }
  };

  const ast = {
    type: 'PROGRAM',
    body: [],
  };

  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
};

// {
//   type: 'IDENTIFIER',
//   name: 'foo',
//   body: [
//     {type: 'LITERAL', value: 123}
//   ]
// }

// EXPECTED
// const ast = {
//   type: 'PROGRAM',
//   body: [
//     {
//       IDENTIFIER: {
//         name: 'foo'
//         values: ['ASSIGNMENT', 'LITERAL'],
//       },
//     },
//   ],
// };

const transpile = (node) => {
  switch (node.type) {
    // generate code for each node in 'body' and join with newline
    case 'PROGRAM':
      return node.body.map(transpile).join('\n');
    case 'IDENTIFIER': {
      // IDENTIFIER has an expression in the body
      if (node.body.length) {
        return `const ${node.name} = ${node.body.map(transpile).join(' ')};`;
      }

      // IDENTIFIER is just a variable name
      return node.name;
    }
    case 'LITERAL':
      // toString will add quotes around a string
      return toString(node.value);
    default:
      throw new Error(`node type ${node.type} cannot be transpiled`);
  }
};

const tokens = tokenize(contents);
console.log('TOKENS', tokens);
console.log('\n');

const ast = parse(tokens);
console.log('AST', JSON.stringify(ast, null, ' '));
console.log('\n');

const transpiled = transpile(ast);
console.log('TRANSPILED', transpiled);

fs.writeFileSync('src/output.js', transpiled);
