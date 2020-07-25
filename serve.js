const port = 8032

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

console.error(pathname);



    response.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
    response.write('Hi, Hello World!')
    response.end()
    // pathname = pathname === '' ? 'index' : pathname

  //   const dirs = pathname.split('/')
  //   const file = dirs.pop()

  //   params.gets = getGET(params.gets)

  //   try { params.json = JSON.parse(params.raw) }
  //   catch (e) { params.json = null }

  //   const api = Path.api + (dirs.length ? dirs.join(Path.sep) + Path.sep : '') + method + '-' + file + '.js'
  //   const notFound = Path.api + this.notFound + '.js'

  //   return FileSystem.promises.access(api, FileSystem.constants.R_OK)
  //     .then(_ => {
  //       if (Config.val.env != 'Production')
  //         delete require.cache[api]
  //       require(api)(request, response, params, pathname)
  //     })
  //     .catch(e => FileSystem.promises.access(notFound, FileSystem.constants.R_OK)
  //       .then(_ => {
  //         if (Config.val.env != 'Production')
  //           delete require.cache[notFound]
  //         require(notFound)(request, response, params, pathname, e.message)
  //       })
  //       .catch(_ => this.error(request, response, params, pathname, e.message)))
  // }
}
