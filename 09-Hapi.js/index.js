/* Modulo http */
const http = require('http')

http.createServer((request,response)=>{
    response.end('Hello word!')
    })
    .listen(5000,()=>console.log('Servidor rodando'))