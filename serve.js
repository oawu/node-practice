const port = 8032

const Path = require('path')
const rootPath = Path.resolve(__dirname, ('..' + Path.sep).repeat(0)) + Path.sep
const apiPath = rootPath + 'api' + Path.sep

const FileSystem = require('fs')

const http = require('http').Server()
http.on('error', error => console.error('錯誤', error))

// const sockets = []
const sockets = new Map()
let items = [
  { id: 2, title: 'oa 2' },
  { id: 1, title: 'oa 1' },
  { id: 3, title: 'oa 3' },
  { id: 4, title: 'oa 4' },
]
// const items = new Map()
// items.set(2, { id: 2, title: 'oa 2' })
// items.set(1, { id: 1, title: 'oa 1' })
// items.set(3, { id: 3, title: 'oa 3' })
// items.set(4, { id: 4, title: 'oa 4' })

// const tran = items => {
//   const news = []
//   items.forEach(item => news.push(item))
//   return news
// }

http.listen(port, _ => {
  console.error('機器開好了，網址是：http://127.0.0.1:' + port + '/');
  
  SocketIO = require('socket.io').listen(http)
  
  SocketIO.sockets.on('connection', socket => {
    sockets.set(socket, 'socket')
    // sockets.push(socket)
    // console.error('建立連線：' + socket.id);

    socket.on('disconnect', _ => {
      // console.error('斷掉連線：' + socket.id);
      // sockets.indexOf(socket)
      sockets.delete(socket)
      SocketIO.sockets.emit('online', sockets.size)
    })

    socket.on('deleteItem', id => {
      items = items.filter(item => item.id != id)
      // items.delete(id)
      SocketIO.sockets.emit('deleteItem', id)
    })

    SocketIO.sockets.emit('online', sockets.size)


    socket.emit('getItems', items)

    // sockets.forEach(socket => socket.emit('online', sockets.length))
  })


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
      .catch(e => {
        // console.error(e);
        require(apiPath + (dirs.length ? dirs.join(Path.sep) + Path.sep : '') + '404.js')({ request, response, message: e.message })
      })
  }
}

