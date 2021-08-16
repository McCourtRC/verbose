// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  const lexer = require('./lexer')
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "program", "symbols": ["exprs"], "postprocess":  ([exprs]) => ({
          type: 'program',
          body: exprs
        }) },
    {"name": "exprs", "symbols": ["expr"], "postprocess": ([expr]) => [expr]},
    {"name": "exprs", "symbols": ["expr", (lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": ([expr, nl]) => [expr, nl]},
    {"name": "exprs", "symbols": ["exprs", (lexer.has("NL") ? {type: "NL"} : NL), "expr"], "postprocess": ([exprs, nl, expr]) => [...exprs, nl, expr]},
    {"name": "exprs", "symbols": ["exprs", (lexer.has("NL") ? {type: "NL"} : NL), "expr", (lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": ([exprs, nl, expr, extraNL]) => [...exprs, nl, expr, extraNL]},
    {"name": "expr", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": id},
    {"name": "expr", "symbols": ["import"], "postprocess": id},
    {"name": "expr", "symbols": ["assignment"], "postprocess": id},
    {"name": "import", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "__", {"literal":"is"}, "__", {"literal":"from"}, "__", (lexer.has("string") ? {type: "string"} : string)], "postprocess":  ([def,,,,,,from]) => ({
          type: 'import',
          default: def,
          from: from
        }) },
    {"name": "assignment", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "__", {"literal":"is"}, "_", "value"], "postprocess":  ([lhs,,,,rhs]) => ({
          type: 'assignment',
          lhs,
          rhs
        }) },
    {"name": "func", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "__", {"literal":"is"}, (lexer.has("nl") ? {type: "nl"} : nl)]},
    {"name": "value", "symbols": ["literal"], "postprocess": id},
    {"name": "value", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "literal", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "literal", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "literal", "symbols": [(lexer.has("bool") ? {type: "bool"} : bool)], "postprocess": id},
    {"name": "literal", "symbols": ["object"], "postprocess": id},
    {"name": "literal", "symbols": ["array"], "postprocess": id},
    {"name": "object", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL), (lexer.has("indent") ? {type: "indent"} : indent), "properties", (lexer.has("dedent") ? {type: "dedent"} : dedent)], "postprocess":  ([,,properties]) => ({
          type: 'object',
          properties: properties
        }) },
    {"name": "properties", "symbols": ["property"], "postprocess": ([prop]) => [prop]},
    {"name": "properties", "symbols": ["properties", "property"], "postprocess": ([props, prop]) => [...props, prop]},
    {"name": "property$ebnf$1", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": id},
    {"name": "property$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "property", "symbols": ["_", (lexer.has("identifier") ? {type: "identifier"} : identifier), {"literal":":"}, "_", "value", "property$ebnf$1"], "postprocess":  ([,key,,,value]) => ({
          type: 'property',
          key: key,
          value: value
        }) },
    {"name": "property$ebnf$2", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": id},
    {"name": "property$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "property", "symbols": ["_", (lexer.has("string") ? {type: "string"} : string), {"literal":":"}, "_", "value", "property$ebnf$2"], "postprocess":  ([,key,,,value]) => ({
          type: 'property',
          key: key,
          value: value
        }) },
    {"name": "array", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL), (lexer.has("indent") ? {type: "indent"} : indent), "array_items", (lexer.has("dedent") ? {type: "dedent"} : dedent)], "postprocess":  ([,,elements]) => ({
          type: 'array',
          elements: elements
        }) },
    {"name": "array_items", "symbols": ["array_item"], "postprocess": ([item]) => [item]},
    {"name": "array_items", "symbols": ["array_items", "array_item"], "postprocess": ([items,item]) => [...items, item]},
    {"name": "array_item$ebnf$1", "symbols": [(lexer.has("arr_sep") ? {type: "arr_sep"} : arr_sep)], "postprocess": id},
    {"name": "array_item$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "array_item$ebnf$2", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": id},
    {"name": "array_item$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "array_item", "symbols": ["_", "array_item$ebnf$1", "_", "value", "array_item$ebnf$2"], "postprocess": ([,,,item]) => item},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
