const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)//converte callback em promise auto.


function obterUsuario() {
  //quandoder algum problema -> reject(ERRO)
  // quando sucess -> RESOLV
  return new Promise(function resovelPromise(resolve, reject) {
    setTimeout(function () {
      return resolve ({
        id: 1,
        nome: "Well",
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
    return new Promise(function resolverPromise(resolve,reject){
        setTimeout(() => {
            return resolve({
              telefone: " 99999-9999",
              ddd: 11,
            });
          }, 2000);
    })
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "Av.Paulista",
      numero: 21,
    });
  }, 3000);
}

main()
async function main(){
    try{
        console.time('medida-promise')
        const usuario = await obterUsuario()
        /* const telefone = await obterTelefone(usuario.id)
        const endereco = await obterEnderecoAsync(usuario.id) */

        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])

        const endereco = resultado[1]
        const telefone = resultado[0]
        
        console.log(`
        Nome:${usuario.nome},
        Telefone:(${telefone.ddd}) ${telefone.telefone},
        Endereço:${endereco.rua}, ${endereco.numero}`)
        console.timeEnd('medida-promise')//forma para capturar o tempo de execução de uma função
    }catch(error){
        console.error('Erro:',error)
    }
}