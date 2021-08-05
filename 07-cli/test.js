const { deepEqual, ok } = require("assert");
const DataBase = require("./db.js");

const DEFAULT_ITEM_CADASTRAR = {
  name: "Flash",
  power: "Speed",
  id: 1,
};

describe("Suite de manipulacao de  Herois", () => {
  it("deve pesquisar um heroi usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const resultado = await DataBase.listar(expected.id);
    ok(resultado, expected);
  });
  /*     it('deve cadastrar um heroi, usando arquivos', async()=>{
        const expected = DEFAULT_ITEM_CADASTRAR
        ok(null,expected)
    }) */
});
