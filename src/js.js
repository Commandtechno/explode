const { parse } = require("@babel/parser");
const generate = require("@babel/generator").default;
const traverse = require("@babel/traverse").default;

module.exports = (ctx, input) => {
  const js = parse(input);
  traverse(js, {
    CallExpression({ node }) {
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.object.type === "Identifier" &&
        node.callee.object.name === "document" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "getElementById"
      ) {
        const [arg] = node.arguments;
        if (arg.type === "StringLiteral") arg.value = ctx.classMap.get(arg.value.toLowerCase());
      }
    }
  });

  const output = generate(js).code;
  return output;
};