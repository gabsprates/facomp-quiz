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


## Contributing

1. Crie seu fork!
2. Crie sua novas funcionalidades: `git checkout -b my-new-feature`
3. Commit suas alterações: `git commit -m 'Add some feature'`
4. Push para a sua branch: `git push origin my-new-feature`
5. Envie um pull request :D

## License

MIT © [Gabriel Prates](http://gabrielprates.com)
