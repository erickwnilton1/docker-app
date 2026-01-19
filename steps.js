/**
* * Steps necessários para criar uma imagem nova dessa aplicação.
* * Dockerfile: Script que serve como receita contendo instruções para construir uma imagem Docker.
* ! Empacota o código, suas dependências, configurações em um formato padronizado e portátil.
* * Facilita a criação de contêineres que funcionam de forma consistente em qualquer ambiente.

* TODO: Definir uma imagem base (criada ou pronta)
* TODO: Passar o diretório de trabalho
* TODO: Copiar para dentro do contêiner todo o arquivo de package.json que temos no local
* TODO: Rodar o NPM install
* TODO: Copiar todos os arquivos que estão dentro da pasta para dentro do contêiner
* TODO: Mapear qual porta o contêiner irá Rodar
* TODO: Rodar um comando

* * Estrutura:

* * FROM __
* * WORKDIR __
* * COPY __
* * RUN __
* * COPY __
* * EXPOSE __
* * CMD ["__", "__"]


* ! Realizar um build com o comando: docker build -t next-hello-world .
* ! -t : dar um nome
* ! . : pegar do diretorio local onde estou

* * Para executar essa imagem: docker run next-hello-world
* * Mapear a porta: 3000:3000 (A porta local é diferente da aplicação)

*/