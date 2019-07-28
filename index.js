module.exports = function (routes) {
  return async function (ctx, next) {
    const match = routes.match(ctx.method, ctx.url)
    if (!match) return ctx.throw(404)
    const route = match.controller[match.name]
    ctx.request.body = Promise.resolve(ctx.request.body)
    const result = await route(ctx.request, match.context)
    ctx.body = result
  }
}
