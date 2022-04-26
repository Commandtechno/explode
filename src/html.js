const { load } = require("cheerio");

module.exports = (ctx, input) => {
  const html = load(input);
  html("*").each((i, el) => {
    let classList = el.attribs.class;
    if (classList) {
      el.attribs.class = classList
        .split(" ")
        .map(className => className.toLowerCase())
        .map(className => {
          if (!ctx.classMap.has(className)) ctx.classMap.set(className, ctx.next());
          return ctx.classMap.get(className);
        })
        .join(" ");
    }
  });

  const output = html.html();
  return output;
};