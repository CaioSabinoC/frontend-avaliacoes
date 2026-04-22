# Frontend — Avaliações Pizza da Toca

Interface web desenvolvida para exibir e cadastrar avaliações de clientes da **Pizza da Toca**, consumindo uma API REST própria.

O sistema permite que usuários registrem experiências com a pizzaria, incluindo comentários, data e avaliação por estrelas ⭐.

---

## Objetivo

Criar uma interface simples, intuitiva e responsiva para coleta e visualização de feedbacks de clientes, simulando a experiência de plataformas como iFood e Google Reviews.

---

## Tecnologias utilizadas

* **HTML5**
* **CSS3**
* **JavaScript (Vanilla)**
* **Bootstrap 5**

---

## Funcionalidades

* Cadastro de avaliações
* Sistema interativo de estrelas (1 a 5)
* Edição de avaliações
* Exclusão de avaliações
* Atualização em tempo real
* Layout responsivo
* Interface com identidade visual (logo + imagem de fundo)

---

## Estrutura do Projeto

```id="estrutura-front"
/
 ├── index.html
 ├── style.css
 ├── app.js
 ├── manifest.json
 ├── service-worker.js
 └── /icons
```

---

## Como funciona

1. O usuário preenche o formulário com:

   * Nome
   * Título
   * Comentário
   * Avaliação por estrelas
   * Data

2. O frontend envia os dados via **fetch (POST)** para a API

3. As avaliações são listadas dinamicamente na tela

4. É possível editar ou excluir qualquer avaliação

---

##  Interface

* Fundo com imagem + overlay escuro
* Cards estilizados para avaliações
* Estrelas interativas com feedback visual
* Layout centralizado e limpo

---

## Melhorias futuras

* Média de avaliações no topo (ex: ⭐ 4.8)
* Destaque para melhores avaliações
* Filtro por quantidade de estrelas
* Upload de imagens nas avaliações
* Deploy público (Vercel ou Netlify)

---

## Autor

Desenvolvido por **Caio Sabino Coelho**

---

## Projeto relacionado

Este frontend consome a API desenvolvida no repositório backend do projeto.

---

##  Licença

Este projeto está sob a licença MIT.

---
