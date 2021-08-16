@{%
  const lexer = require('./lexer')
%}

@lexer lexer

program
  ->  exprs 
        {% ([exprs]) => ({
          type: 'program',
          body: exprs
        }) %}

exprs 
  ->  expr 
       {% ([expr]) => [expr] %}
  |   expr %NL # handle files with one expr ending in newlines
       {% ([expr, nl]) => [expr, nl] %}
  |   exprs %NL expr
       {% ([exprs, nl, expr]) => [...exprs, nl, expr] %} 
  |   exprs %NL expr %NL # handle files with exprs ending in newlines
       {% ([exprs, nl, expr, extraNL]) => [...exprs, nl, expr, extraNL]%}

expr
  ->  %comment    {% id %}
  |   import      {% id %}
  |   assignment  {% id %}

import
  ->  %identifier __ "is" __ "from" __ %string 
        {% ([def,,,,,,from]) => ({
          type: 'import',
          default: def,
          from: from
        }) %}

assignment
  ->  %identifier __ "is" _ value
        {% ([lhs,,,,rhs]) => ({
          type: 'assignment',
          lhs,
          rhs
        }) %}

func
  ->  %identifier __ "is" %nl

value
  ->  literal     {% id %}
  |   %identifier {% id %}

literal
  ->  %string {% id %}
  |   %number {% id %}
  |   %bool   {% id %}
  |   object  {% id %}
  |   array   {% id %}

object
  -> %NL %indent properties %dedent
        {% ([,,properties]) => ({
          type: 'object',
          properties: properties
        }) %}

properties
  ->  property
        {% ([prop]) => [prop] %}
  |   properties property
        {% ([props, prop]) => [...props, prop] %}

property
  ->  _ %identifier ":" _ value %NL:?
        {% ([,key,,,value]) => ({
          type: 'property',
          key: key,
          value: value
        }) %}
  |  _ %string ":" _ value %NL:?
        {% ([,key,,,value]) => ({
          type: 'property',
          key: key,
          value: value
        }) %}

array
  ->  %NL %indent array_items %dedent
        {% ([,,elements]) => ({
          type: 'array',
          elements: elements
        }) %}

array_items
  ->  array_item
        {% ([item]) => [item] %}
  |   array_items array_item 
        {% ([items,item]) => [...items, item] %}

array_item 
  ->  _ %arr_sep:? _ value %NL:?
        {% ([,,,item]) => item %}

_   ->  %WS:* 
__  ->  %WS:+ 


