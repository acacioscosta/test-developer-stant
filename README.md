# test-developer-stant

API organização de palestras

## Configurações

#### API

1. Faça um clone da aplicação em sua máquina
   - git clone https://github.com/acacioscosta/test-developer-stant.git

2. Entre no diretório "api/", crie um arquivo config.json e copie os dados de config.example.json;
   - Se estiver no Linux, use o comando `cp config.example.json config.json`
3. Arquivo config.json contém as configurações da aplicação, como conexão com banco de dados, porta para o servidor e migrate
   - Para este caso, não precisa inserir o `database`;
   - Explicando `migrate`
     - Se `true`, aplicação irá criar o banco de dados e suas tabelas
     - Se `false`, aplicação não cria banco de dados
     - Defina `migrate = true` pelo menos a primeira vez em que executar a aplicação, em seguida, altere para `false`
4. Executando aplicação
   - Execute `npm i ou npm install` dentro do diretótio api/ para instalar os pacotes necessários.
   - Modo `dev`, entre no diretório "api/" e execute `npm run dev`
   - Modo `production`, entre no diretório "api/" e execute `npm run start`
5. Endpoints da API
   - `GET /api` => Breve apresentação da API
   - `GET /api/tracks` => Lista todas as tracks salvas no banco de dados
   - `POST /api/upload` => Faz o upload do arquivo, monta a estrutura das tracks e salva-os no banco de dados
   - `GET /api/clear` => Apaga todos os dados de tracks salvas no banco de dados
     - Este endpoint está com tipo `GET` e não `DELETE` pelo fato de excluir todos os dados e não excluir um dado em específico
   
6. Bibliotecas utilizadas
   - `Body-Parser` => Permite entrada de dados de um cliente externo, tipo JSON, XML entre outros.
   - `Consign` => Autoload dos módulos
   - `Express` => Abstração de rotas, middlewares e etc. para uma aplicação NODEJS
   - `Moment` => Manipulação de data/hora
   - `Multer` => Middleware para upload de arquivo
   - `MySQL` => Gerenciador de banco de dados
   - `Nodemon` => Executada apenas em modo `dev`, serve para reiniciar a aplicação em cada alteração de código
   
#### FRONT-END

1. Caso queira executar a aplicação em um navegador web, basta inserir o caminho do arquivo index.html no navegador
   - `~/local_pasta_do_projeto/frontend/index.html`
2. Por padrão, as requisições estão sendo realizadas para o endereço `http://localhost:3000/api`
   - Caso precise alterar o endereço, vá próximo ao final do arquivo index.html e terá uma tag `<script>` contendo uma instância do VUEJS;
   - Nele, procure por data: {} e encontrará o atributo `baseUrl`;
   - Altere esse atributo `baseUrl` inserindo o novo endereço da API;
     - Lembre-se sempre de inserir o `/api` ao final do endereço. Exemplo: `http://novoendereco.com.br/api`
     
## Acessando API de Insomnia ou afins

1. Para o endpoint `POST /api/upload`
   - Inserir no `body` da requisição o tipo `Multipart Form` e nome do arquivo `'file'`
   
## Aplicação hospedada no Google Cloud

1. Para acessar, clique no link abaixo
   - http://34.71.248.255/
