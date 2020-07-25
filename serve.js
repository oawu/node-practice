const port = 8032

const Path = require('path')
const rootPath = Path.resolve(__dirname, ('..' + Path.sep).repeat(0)) + Path.sep
const apiPath = rootPath + 'api' + Path.sep

const FileSystem = require('fs')

const http = require('http').Server()
http.on('error', error => console.error('錯誤', error))
http.listen(port, _ => {
  console.error('機器開好了，網址是：http://127.0.0.1:' + port + '/');
})
http.on('request', (request, response) => {
  const URL = require('url')
  
  const url = URL.parse(request.url)
  const method = request.method.toUpperCase()
  const pathname = url.pathname.replace(/\/+/gm, '/').replace(/\/$|^\//gm, '')

  // 比對 Router
  Router.mapping({ method, pathname, request, response })
})

const Router = {
  mapping ({ method, pathname, request, response }) {
    pathname = pathname === '' ? 'index' : pathname

    const dirs = pathname.split('/')
    const file = dirs.pop()
    const api = apiPath + (dirs.length ? dirs.join(Path.sep) + Path.sep : '') + method + '-' + file + '.js'

    FileSystem.promises.access(api, FileSystem.constants.R_OK)
      .then(_ => {
        delete require.cache[api]
        require(api)({ request, response })
      })
      .catch(e => require(apiPath + (dirs.length ? dirs.join(Path.sep) + Path.sep : '') + '404.js')({ request, response, message: e.message }))
  }
}

