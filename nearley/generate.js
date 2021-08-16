const { fromPairs, prop } = require('ramda');

const generate = (node) => {
  console.log(node.type);
  switch (node.type) {
    // generate code for each node in 'body' and join with newline
    case 'program':
      return node.body.map(generate).join('');
    case 'comment':
      return node.value;
    case 'import':
      return `import ${node.default.value} from ${node.from.value};`;
    case 'assignment':
      return `const ${node.lhs.value} = ${generate(node.rhs)};`;
    case 'array':
      return `[${node.elements.map(generate).join(', ')}]`;
    case 'property':
      const key = generate(node.key);
      const value = generate(node.value);
      return [key, value];
    case 'object':
      const properties = node.properties.map(generate);
      const props = properties
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      return `{ ${props} }`;
    // case 'call':
    //   return `${node.name}(${node.args.map(generate).join(', ')});`;
    case 'number':
      return Number(node.value);
    case 'bool':
    case 'identifier':
    case 'string':
    case 'NL':
      return node.value;
    default:
      throw new Error(`node type ${node.type} cannot be generated`);
  }
};

module.exports = generate;
