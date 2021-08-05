const{readFile}=require('fs')//file system

//conversão de callback para promise
const {promisify} = require('util')

const readFileAsync = promisify(readFile)

//outra forma de obter dados json
const dadosJson = require('./herois.json')

class DataBase{
    constructor(){
        this.FILENAME  = 'herois.json'
    }
    async obterDadosArquivo(){
        //por estar usando json nao seria necessario o uso o readFile
        const arquivo = await readFileAsync(this.FILENAME);
        //toString converte o tipo buffer para string
        return JSON.parse(arquivo.toString());
    }
    escreverArquivo(){

    }
     async listar(id){
        const dados = await this.obterDadosArquivo()
        //o item passou algum id?, se não passou manda um true e traz a porra toda
        return dados.filter(item=>(id ? item.id == id: true));
    }
}

module.exports = new DataBase()