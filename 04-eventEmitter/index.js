const { rejects } = require('assert')
const EventEmmiter = require('events')
class MeuEmissor extends EventEmmiter{}

const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario:click'


/*======================================Exemplo com EventEmitter ===============================================*/
//Observable
meuEmissor.on(nomeEvento,function(click){
    console.log('um usuario clicou',click)
})

//emissor da ação
meuEmissor.emit(nomeEvento,'na barra de rolagem')


//setará uma função que será executada de tempo em tempo
let count = 0
setInterval(function(){
    meuEmissor.emit(nomeEvento,'no ok ' + (count++))
},1000) 




/*======================================Exemplo com promise ===============================================*/
/* Objeto, variavel do proprio node(ver documentação)

Qualquer texto, qualquer evento que ele digitar na pasta será impresso 
-addListener->Responsavel por "ouvir um evento" data
.trim-> retira os espaços 
*/
const stdin = process.openStdin()
function main(){
    return new Promise(function (resolve,reject){
        stdin.addListener('data', function(value){
            //console.log(`Você digitou:${value.toString().trim()}`)
            return resolve(value)
        })
    })
}

main().then(function(resultado){
    console.log('resultado: ',resultado.toString())
})