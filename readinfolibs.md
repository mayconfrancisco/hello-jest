yarn global add @rocketseat/omni //instala cli da rocket para gerar os projetos mobile, web e server no template

omni init modulo11 --only=server //comando para cli da rocket criar o projeto modulo11 apenas gerando o server

yarn add -D jest //lib - praticamente um framework - de testes <br/>
yarn jest --init <br />
sera gerado o jest.config.js, faremos as seguintes alterações <br />
bail: 1 // 1 - para no primeiro error; 0 executa todos os testes e mostra os erros no final <br />
collectCoverage: true, //para coletar dados da cobertura dos testes  <br />
collectCoverageFrom: ['src/app/**/*.js'], //arquivos cobertos pelos testes - todas as pastas e arquivos .js de src/app/ <br />
coverageDirectory: '__tests__/coverage', //gerar o coverage dentro da pasta __tests__ <br/>
coverageReporters: ['text', 'lcov'], //explicar  <br />
testMatch: ['**/__tests__/**/*.test.js'], //para definir em que pasta procurar os testes - todos nossos testes ficarao na pasta \__tests__  <br />

yarn add -D @sucrase/jest-plugin //para poder utilizar import/export tb no jest <br />
Adicionar o transform do jest no jest.config.js: <br/>
"transform": {
  ".(js|jsx|ts|tsx)": "@sucrase/jest-plugin"
},

add um ignore no nodemon.json para ignorar a pasta \__tests__ e nao ficar reiniciando o servidor sempre que alterarmos um teste <br/>
"ignore": [
  "__tests__"
]

yarn add -D @types/jest //add types/typescript para termos o intellisense do JS nos arquivos de testes

yarn add -D sqlite3 <br/>
Utilizamos o banco de dados sqlite para rodar os testes - para não apontar para a base de dados de desenv e poder rodar os testes desacopladamente.<br/>
criamos um arquivo .env.test e adicionamos o dialect=sqlite, ajustamos o arquivo /config/database.js para verificar o dialect e apontar para um arquivo do sqlite(storage) <br/>
ajustar o import/execucao do dotenv no /src/app.js criando o arquivo bootstrap.js para importar os env conforme o ambiente <br/>
ajustar o aquivo /config/database.js para também importar o bootstrap <br/>
para setar o NODE_ENV como testes vá ao package.json e altere o script test para "test": "NODE_ENV=test jest" <br/>
"pretest": "NODE_ENV=test sequelize db:migrate", //para rodar as migrate sempre antes do teste <br/>
"test": "NODE_ENV=test jest", <br/>
"posttest": "NODE_ENV=test sequelize db:migrate:undo:all" //para apagar todas as migrate depois do testes <br/>


yarn add supertest -D //lib que da um suporte melhor a requisicoes http para os testes
