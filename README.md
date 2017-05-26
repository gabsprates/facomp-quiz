<<<<<<< HEAD
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
=======
# Facomp Quiz :computer: :game_die:

Projeto realizado para apresentação no evento Carreiras em Curso, do [Prominas MOC](http://www.prominasmoc.com.br/). O objetivo é mostrar um pouco do que é possível realizar com os conhecimentos de computação e informática, adquiridos ao longo dos cursos de tecnologia da instituição.

Este projeto foi desenvolvido a partir do [English Quiz](https://github.com/gabsprates/english-quiz), utilizando a interface construída com [React](https://facebook.github.io/react/). Foi adaptado para se comunicar com Arduino, através de [Websockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) com [Socket.IO](https://socket.io/), e para ser independente de servidor backend, tendo as perguntas armazenadas em `src/js/Perguntas.js` e os estados em [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

## Como funciona

A aplicação deve ser construída (_build_) já com as perguntas, arquivo `src/js/Perguntas.js`. Cada pergunta deve ser um objeto no array e devem ter o seguinte formato:

```
[
  {
    "_id": "o ID da questão, deve ser string, não pode ser nulo e dever ser único",
    "question": "Texto da pergunta",
    "options": [
      "Alternativa 1",
      "Alternativa 2"
      // ou quantas você precisar
    ],
    "answer": 3, // inteiro que representa a chave de `options` que é a resposta
    "answered": false // se a questão já foi respondida ou não
  },
  { ... }
]
```

No arquivo `config/config.js`, você precisa configurar a URL do servidor Websocket e o tempo para resposta das perguntas:

```
// e.g.
export default {
  "websocket": {
    addr: "http://localhost:9990"
  },
  "timer": 15
}
```

### Execução
  * `npm start`: executa o servidor de desenvolvimento em `localhost:8080`
  * `npm build`: constrói o código JS para produção em `dist/js/app.js`

>>>>>>> 1f439ac215ca25e2bd43385599fa66e8929c31c6

Para executá-lo em ambiente de produção, é necessário executar dois passos:

<<<<<<< HEAD
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
