/* 
a-Obter usuario
b-Obter numero de telefone a partir de seu Id 
c-Obter o endereço do usuario a partir do id
*/

/* assinatura */
function obterUsuario(callback){
    setTimeout(function(){
        return callback(null,{
            id:1,
            nome: 'Well',
            dataNascimento: new Date()
        })
    },1000)
}

function obterTelefone(idUsuario,callback){
setTimeout(()=>{
    return callback(null,{
        telefone:' 99999-9999',
        ddd:11
    })
},2000)
}

function obterEndereco(idUsuario,callback){
    setTimeout(()=>{
        return callback(null,{
            rua:'Av.Paulista',
            numero: 21
        })
    },3000)
}
obterUsuario(function resolverUsuario(error,usuario){

    if(error){
        console.log('Deu ruim em usuario',error)
        return ;
    }
    obterTelefone(usuario.id,function resolverTelefone(error1,telefone){
        if(error1){
            console.log('Deu ruim em telefone',error)
            return ;
        }
        obterEndereco(usuario.id,function resolverEndereco(error2,endereco){
            if(error2){
                console.log('Deu ruim em endereco',error)
                return ;
            } 
            console.log(`
            Nome:${usuario.nome},
            Endereco:${endereco.rua},${endereco.numero}
            Telefone: ${telefone.ddd},${telefone.numero}
            `)
        })
    })

})


/* const usuario = obterUsuario()
const telefone = obterTelefone(usuario.id)

console.log('usuario',usuario)
console.log('telefone',telefone) */


/*      Observações:
   
No Js valores: null || "" || 0 === false;
Por padrão o Callback é passado como ultimo parametro
Convesão callback(primeiro parametro é o erro, segundo parametro é sucesso)
*/