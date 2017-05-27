# Facomp Quiz :computer: :game_die:

Projeto realizado para apresentação no evento Carreiras em Curso, do [Prominas MOC](http://www.prominasmoc.com.br/). O objetivo é mostrar um pouco do que é possível realizar com os conhecimentos de computação e informática, adquiridos ao longo dos cursos de tecnologia da instituição.

Este projeto foi desenvolvido a partir do [English Quiz](https://github.com/gabsprates/english-quiz), utilizando a interface construída com [React](https://facebook.github.io/react/). Foi adaptado para se comunicar com Arduino, através de [Websockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) com [Socket.IO](https://socket.io/), e para ser independente de servidor backend, tendo as perguntas armazenadas em `src/js/Perguntas.js` e os estados em [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

---

## Instruções para utilização

Antes de começar, certifique que o seu computador tenha os seguintes _softwares_ instalados:

* [Git](https://git-scm.com)
* [Node.js](https://nodejs.org)

---

### Download e Instalação

Para fazer o **download** do projeto, faça o clone do repositório no GitHub:

> $ git clone https://github.com/gabsprates/facomp-quiz.git

E **instale as dependências** utilizando o NPM:

> $ npm install

---

### Perguntas

As perguntas serão compiladas (processo de _build_) junto com os demais arquivos `.js`. Elas estão armazenadas no arquivo `src/js/Perguntas.js`. Cada pergunta deve ser um objeto do array e deve ter o seguinte formato:

```js
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
}
```

---

### Configurações

As configurações de URL do servidor Websocket e o tempo para resposta das perguntas devem estar armazenadas no arquivo `config/config.js` com o seguinte conteúdo:

```js
export default {
  "websocket": "http://localhost:9990" // endereço do servidor websocket
  "timer": 15 // tempos para resposta
}
```

---

### Execução
  * `npm start`: executa o servidor de desenvolvimento em `localhost:8080`
  * `npm build`: executa o _build_ do código JS para o arquivo em produção `dist/js/app.js`

---

## Contributing

1. Crie seu fork!
2. Crie sua novas funcionalidades: `git checkout -b my-new-feature`
3. Commit suas alterações: `git commit -m 'Add some feature'`
4. Push para a sua branch: `git push origin my-new-feature`
5. Envie um pull request :D

## License

MIT © [Gabriel Prates](http://gabrielprates.com)
