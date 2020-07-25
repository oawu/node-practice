const port = 8032

const http = require('http').Server()
http.on('error', error => console.error('錯誤', error))
http.listen(port, _ => {
  console.error('機器開好了，網址是：http://127.0.0.1:' + port + '/');
})
http.on('request', (request, response) => {
    const URL = require('url')
    const url = URL.parse(request.url)
    console.error(url.pathname)
    // const pathname = url.pathname.replace(/\/+/gm, '/').replace(/\/$|^\//gm, '')

  response.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
  response.write('Hi, Hello World!')
  response.end()
})


