# koa-spife
Bastardize a [`@npm/spife`](http://github.com/npm/spife)-based application
into [Koa](https://koajs.com/).

## Important note
This module was written as a helper for transitioning from `@npm/spife` to Koa.
As such, it tries to do its best, but with the differences between the frameworks,
no promises can be made as to full compatibility.

Another caveat: this isn't really a wrapper for `spife`, as much as it's a
wrapper for [`reverse`](https://github.com/chrisdickinson/reverse). Why call it
`koa-spife`, then? `reverse` is non-prescriptive when it comes to the signature
of the route method - that's where `spife` comes in. It likes its functions'
signatures to look like this: `function (SpifeRequest, Map) -> Promise<Result>`.
`koa-spife` continues employing this signature to maintain compatibility, except
`SpifeRequest` is actually a `koa.Request`.

Wicked, right? Until I fix it, that is.

## Usage
Take the following `spife` constructor call:

```js
spife('pos-backend', http.createServer(), urls(), [
  require('@npm/spife/middleware/common')(),
  require('@npm/spife/middleware/body-json')(),
])
```

We can migrate this to Koa:

```js
const app = new Koa()
app.use(require('koa-bodyparser')())
app.use(require('koa-spife')(urls()))
```

## Why?
Something about [holes in feet](https://twitter.com/hashtag/npmlayoffs). Or me
being bored on vacation. Or `reverse` being, in my opinion, one of the most
elegant routers out there.
