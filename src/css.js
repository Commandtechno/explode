const { walk, parse, generate } = require("css-tree");

module.exports = (ctx, input) => {
  const css = parse(input);
  walk(css, node => {
    if (node.type === "ClassSelector") {
      node.name = ctx.classMap.get(node.name.toLowerCase());
    }
  });

  const output = generate(css);
  return output;
};