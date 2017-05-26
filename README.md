Facomp Quiz
===========

// TODO: @gabsprates introduzir projeto


Instruções de uso
-----------------

Antes de começar, verifique que seu computador tenha os seguintes _softwares_
instalados:

 * [Git]()
 * [Node.js]()
 * [Yarn]() (Opcional, mas recomendado)

> Yarn é um gerenciador de pacotes do Node.js, que surge como alternativa ao
> NPM, devido ao seu algorítimo diferenciado para identificar as dependências e
> sua performance altamente superior. Caso não queira usá-lo, substitua os
> comandos `yarn` por `npm`.

Para baixar o projeto, recomendamos que clone o repositório do GitHub:

```bash
# Usando Git
git clone https://github.com/gabsprates/facomp-quiz

# Usando Hub
hub clone gabsprates/facomp-quiz
```

Então, instale as dependências com o comando `yarn` (ou `npm install`).

Para executá-lo em ambiente de desenvolvimento, basta executar `yarn run dev`.
Isso irá iniciar um servidor HTTP na porta 3000 que irá fornecer a aplicação.
Este servidor conta com a funcionalidade de _hot reloading_, o que significa que
qualquer alteração nos componentes React serão automaticamente aplicadas no seu
navegador, sem a necessidade de recarregar a página.

Para executá-lo em ambiente de produção, é necessário executar dois passos:

```bash
# 1) Gere as versões finais dos arquivos estáticos
yarn run build
=======
1. Crie seu fork!
2. Crie sua novas funcionalidades: `git checkout -b my-new-feature`
3. Commit suas alterações: `git commit -m 'Add some feature'`
4. Push para a sua branch: `git push origin my-new-feature`
5. Envie um pull request :D
>>>>>>> 1f439ac215ca25e2bd43385599fa66e8929c31c6

# 2) Inície o servidor já configurado para o ambiente de desenvolvimento
yarn start
```

Você pode configurar a porta TCP utilizada pelo servidor com a variável de
ambiente `SERVER_PORT`, e o endereço de IP que ele será associado com a variável
de ambiente `SERVER_ADDR`.
