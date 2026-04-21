const API_URL = 'https://backend-avaliacoes-iimr.onrender.com/api/avaliacoes';

// Formulário
const form = document.getElementById('entry-form');
const avaliacaoId = document.getElementById('entry-id');

const nome = document.getElementById('nome');
const titulo = document.getElementById('titulo');
const descricao = document.getElementById('descricao');
const estrelasInput = document.getElementById('estrelas');
const dataHora = document.getElementById('happenedAt');

// UI
const listaAvaliacoes = document.getElementById('entries-list');
const mensagem = document.getElementById('message');
const cancelarEdicao = document.getElementById('cancel-edit');
const tituloFormulario = document.getElementById('form-title');
const botaoAtualizar = document.getElementById('reload-btn');
const estrelasUI = document.querySelectorAll("#star-rating span");

// ---------------- UTIL ----------------

function mostrarMensagem(texto) {
  mensagem.textContent = texto;
}

function formatarData(data) {
  return new Date(data).toLocaleString('pt-BR');
}

function renderizarEstrelas(qtd) {
  return '★'.repeat(qtd) + '☆'.repeat(5 - qtd);
}

// ---------------- FORM ----------------

function limparFormulario() {
  form.reset();
  avaliacaoId.value = '';
  tituloFormulario.textContent = 'Nova avaliação';
  cancelarEdicao.classList.add('hidden');
  dataHora.value = new Date().toISOString().slice(0, 16);

  estrelasInput.value = '';
  atualizarEstrelas(0);
}

// ---------------- API ----------------

async function carregarAvaliacoes() {
  try {
    const response = await fetch(API_URL);
    const avaliacoes = await response.json();

    if (!avaliacoes.length) {
      listaAvaliacoes.innerHTML = '<p>Nenhuma avaliação encontrada.</p>';
      return;
    }

    listaAvaliacoes.innerHTML = avaliacoes.map(av => `
      <div class="entry-item">
        <p><strong>${av.nome}</strong></p>
        <h5>${av.titulo}</h5>
        <p>${av.descricao}</p>
        <p>${renderizarEstrelas(av.estrelas)}</p>
        <p>${formatarData(av.happenedAt)}</p>
      </div>
    `).join('');
  } catch (err) {
    listaAvaliacoes.innerHTML = '<p class="text-danger">Erro ao carregar avaliações. Verifique se o servidor está rodando.</p>';
    console.error('Erro ao carregar avaliações:', err);
  }
}

async function salvarAvaliacao(dados) {
  const id = avaliacaoId.value;
  const url = id ? `${API_URL}/${id}` : API_URL;
  const metodo = id ? 'PUT' : 'POST';

  await fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
}

// ---------------- AÇÕES ----------------

window.editarAvaliacao = async function (id) {
  const response = await fetch(`${API_URL}/${id}`);
  const av = await response.json();

  avaliacaoId.value = av._id;
  nome.value = av.nome;
  titulo.value = av.titulo;
  descricao.value = av.descricao;
  dataHora.value = new Date(av.happenedAt).toISOString().slice(0, 16);

  estrelasInput.value = av.estrelas;
  atualizarEstrelas(av.estrelas);

  tituloFormulario.textContent = 'Editar avaliação';
  cancelarEdicao.classList.remove('hidden');

  mostrarMensagem('Editando avaliação...');
};

window.deletarAvaliacao = async function (id) {
  if (!confirm('Deseja excluir esta avaliação?')) return;

  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

  mostrarMensagem('Avaliação excluída.');
  carregarAvaliacoes();
};

// ---------------- SUBMIT ----------------

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // CORRIGIDO: validação manual das estrelas (campo hidden não é validado pelo browser)
  if (!estrelasInput.value) {
    mostrarMensagem('Por favor, selecione uma avaliação em estrelas.');
    return;
  }

  const dados = {
    nome: nome.value,
    titulo: titulo.value,
    descricao: descricao.value,
    estrelas: Number(estrelasInput.value),
    happenedAt: dataHora.value
  };

  await salvarAvaliacao(dados);

  mostrarMensagem(avaliacaoId.value ? 'Avaliação atualizada.' : 'Avaliação criada.');

  limparFormulario();
  carregarAvaliacoes();
});

// ---------------- EVENTOS ----------------

cancelarEdicao.addEventListener('click', () => {
  limparFormulario();
  mostrarMensagem('Edição cancelada.');
});

botaoAtualizar.addEventListener('click', carregarAvaliacoes);

// ---------------- ESTRELAS ----------------

estrelasUI.forEach((estrela) => {
  estrela.addEventListener("click", () => {
    const valor = estrela.getAttribute("data-value");
    estrelasInput.value = valor;
    atualizarEstrelas(valor);
  });
});

function atualizarEstrelas(valor) {
  estrelasUI.forEach((estrela) => {
    estrela.classList.toggle(
      "active",
      estrela.getAttribute("data-value") <= valor
    );
  });
}

// ---------------- INIT ----------------

limparFormulario();
carregarAvaliacoes();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registrado:', reg))
      .catch(err => console.log('Erro no Service Worker:', err));
  });
}
