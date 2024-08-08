## JEST

### O que é o JEST?

O JEST é um framework de testes de JavaScript criado pelo Facebook. Ele é uma ferramenta de testes de código aberta que é mantida pela comunidade e é amplamente utilizada para testar aplicações JavaScript.

### Por que usar o JEST?

O JEST é uma ferramenta de teste de JavaScript que é fácil de usar e que fornece uma série de recursos úteis para testar aplicações JavaScript. Ele é uma ferramenta de teste de JavaScript que é fácil de usar e que fornece uma série de recursos úteis para testar aplicações JavaScript.

### Como usar o JEST?

Para usar o JEST, você precisa instalar o pacote JEST no seu projeto. Você pode fazer isso usando o npm ou o yarn. Depois de instalar o pacote JEST, você pode começar a escrever testes para o seu código JavaScript.

### Exemplo de teste com JEST

Aqui está um exemplo de um teste simples usando o JEST:

```javascript
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Neste exemplo, estamos testando a função `sum` que soma dois números. O teste verifica se a função `sum` retorna o valor correto quando somamos 1 e 2.

### Exemplos com nodejs, Express e JEST

Aqui estão alguns exemplos de como usar o JEST com nodejs e Express:

- Testando uma rota do Express:

```javascript
test('GET /users', async () => {
  const response = await request(app).get('/users');
  expect(response.status).toBe(200);
});
```

- Testando uma função do Express:

```javascript
test('should return 200 OK', async () => {
  const response = await request(app).get('/users');
  expect(response.status).toBe(200);
});
```
