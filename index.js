const url = require('url')

module.exports = function (routes) {
  return async function (ctx, next) {
    const parsed = url.parse(ctx.url)
    const match = routes.match(ctx.method, parsed.pathname)
    if (!match) return ctx.throw(404)
    const route = match.controller[match.name]
    ctx.request.body = Promise.resolve(ctx.request.body)
    const result = await route(ctx.request, match.context)
    ctx.body = result
  }
}
