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
setTimeout(function(){
    return{
        telefone:' 99999-9999',
        ddd:'11'
    }
},2000)
}

function obterEndereco(idUsuario){

}
obterUsuario(function resolverUsuario(error,usuario){

    if(error){
        console.log('Deu ruim em usuario',error)
        return ;
    }
})
const usuario = obterUsuario()
const telefone = obterTelefone(usuario.id)

console.log('usuario',usuario)
console.log('telefone',telefone)


/*      Observações:
   
No Js valores: null || "" || 0 === false;
Por padrão o Callback é passado como ultimo parametro
    
*/