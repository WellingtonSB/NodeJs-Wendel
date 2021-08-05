const { writeFile, readFile } = require("fs"); //file system
const { promisify } = require("util"); //conversão de callback para promise
const [writeFileAsync, readFileAsync] = [
  promisify(writeFile),
  promisify(readFile),
];

//outra forma de obter dados json
const dadosJson = require("./heroes.json");

class Database {
  constructor() {
    this.FILENAME = "heroes.json";
  }

  async obterArquivo() {
    const arquivo = await readFileAsync(this.FILENAME); //por estar usando json nao seria necessario o uso o readFile
    return JSON.parse(arquivo.toString()); //toString converte o tipo buffer para string
  }

  async escreverArquivo(dados) {
    await writeFileAsync(this.FILENAME, JSON.stringify(dados)); //stringify transforma os dados em String
    return true;
  }

  async cadastrar(heroi) {
    const dados = await this.obterArquivo();
    const id = heroi.id <= 2 ? heroi.id : Date.now(); //workaround para simular um id
    const heroiComId = {...heroi,id,};//concatena os dados

    return await this.escreverArquivo([...dados, heroiComId]);
  }

  async listar(id) {
    const dados = await this.obterArquivo();
    return dados.filter((item) => (id ? item.id == id : true)); //o item passou algum id?, se não passou manda um true e traz a porra toda
  }

  async atualizar(id, atualizacoes) {
    const dados = await this.obterArquivo();
    const indice = dados.findIndex((item) => item.id === parseInt(id));
    if (indice === -1) {
      throw Error("heroi não existe!");
    }

    const atual = dados[indice];
    dados.splice(indice, 1);

    //workaround para remover valores undefined do objeto
    const objAtualizado = JSON.parse(JSON.stringify(atualizacoes));
    const dadoAtualizado = Object.assign({}, atual, objAtualizado);

    return await this.escreverArquivo([...dados, dadoAtualizado]);
  }

  async remover(id) {
    if (!id) {
      await this.escreverArquivo([]);
      return true;
    }

    const dados = await this.obterArquivo();

    const indice = dados.findIndex((item) => item.id === parseInt(id));
    if (indice === -1) {
      throw Error("heroi não existe!");
    }
    const atual = dados[indice];
    dados.splice(indice, 1);
    await this.escreverArquivo(dados);
    return true;
  }
}

module.exports = new Database();
