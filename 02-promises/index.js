/* Refatorar o codigo da aula 01-nodeJs, retirando os callbacks */

//modulo interno node.js
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


const usarioPromise = obterUsuario()
//para manipular com sucesso usar função .then
// para manipular erro, usar .catch
//usuario -> telefone-> telefone (pipe, so vai passando para frente)

usarioPromise
    .then(function(resultado){
        return obterTelefone(resultado.id)
        .then(function resolverTelefone(result){
            return{
                usuario:{
                    nome: resultado.nome,
                    id: resultado.id
                },
                telefone: result
            }
        })
    })
    .then(function(resultado1){
        const endereco = obterEnderecoAsync(resultado1.usuario.id)
        return endereco.then(function resolverEndereco(result){
            return {
                //busca as informações da função acima (resultado)
                usuario: resultado1.usuario,
                telefone: resultado1.telefone,
                endereco: result
            }
        })
    })
    .then(function(resultado2){
        console.log(`
        Nome: ${resultado2.usuario.nome}
        Endereco: ${resultado2.endereco.rua},${resultado2.endereco.numero}
        Telefone: (${resultado2.telefone.ddd})${resultado2.telefone.telefone}`)
    })
    .catch(function(error){
    console.error('Deu ruim',error)
    })