// admin.js
// Lógica da página Admin: cadastro, listagem, exclusão (individual e total) e pesquisa de usuários.
// Requisito do PDF: tudo em UMA única chave do Local Storage, valores em um objeto/array JSON.

const CHAVE_USUARIOS = "usuarios";

const formCadastro = document.getElementById("form-cadastro");
const inputNome = document.getElementById("fname");
const inputEmail = document.getElementById("femail");
const btnLimpar = document.getElementById("btn-limpar");

const formPesquisa = document.getElementById("form-pesquisa");
const inputPesquisa = document.getElementById("pesquisa-input");
const btnExcluirTodos = document.getElementById("btn-excluir-todos");
const listaUsuarios = document.getElementById("lista-usuarios");

function obterUsuarios() {
  return JSON.parse(localStorage.getItem(CHAVE_USUARIOS)) || [];
}

function salvarUsuarios(usuarios) {
  localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));
}

function gerarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function cadastrarUsuario(nome, email) {
  const usuarios = obterUsuarios();
  usuarios.push({
    id: gerarId(),
    nome,
    email,
    data: new Date().toLocaleString("pt-BR"),
  });
  salvarUsuarios(usuarios);
}

function excluirUsuario(id) {
  const usuarios = obterUsuarios().filter((usuario) => usuario.id !== id);
  salvarUsuarios(usuarios);
}

function excluirTodosUsuarios() {
  salvarUsuarios([]);
}

function pesquisarUsuarios(termo) {
  const termoNormalizado = termo.trim().toLowerCase();
  if (!termoNormalizado) return obterUsuarios();

  return obterUsuarios().filter(
    (usuario) =>
      usuario.nome.toLowerCase().includes(termoNormalizado) ||
      usuario.email.toLowerCase().includes(termoNormalizado)
  );
}

function criarLinhaUsuario(usuario) {
  const item = document.createElement("li");
  item.className = "usuario";
  item.dataset.id = usuario.id;

  item.innerHTML = `
    <div>
      <p>${usuario.nome}</p>
      <p>${usuario.email}</p>
      <p>${usuario.data}</p>
    </div>
    <div>
      <button type="button" class="btn-excluir-usuario">
        <img src="../icone/trash-delete-svgrepo-com.svg" alt="Excluir usuário" width="50">
      </button>
    </div>
  `;

  item.querySelector(".btn-excluir-usuario").addEventListener("click", () => {
    excluirUsuario(usuario.id);
    renderizarLista();
  });

  return item;
}

function renderizarLista(usuarios = obterUsuarios()) {
  listaUsuarios.innerHTML = "";
  usuarios.forEach((usuario) => {
    listaUsuarios.appendChild(criarLinhaUsuario(usuario));
  });
}

function limparFormulario() {
  formCadastro.reset();
}

formCadastro.addEventListener("submit", (evento) => {
  evento.preventDefault(); // impede o reload da página

  const nome = inputNome.value.trim();
  const email = inputEmail.value.trim();

  if (!nome || !email) {
    alert("Preencha nome e e-mail antes de cadastrar.");
    return;
  }

  cadastrarUsuario(nome, email);
  limparFormulario();
  renderizarLista();
});

btnLimpar.addEventListener("click", limparFormulario);

btnExcluirTodos.addEventListener("click", excluirTodosUsuarios_eRenderizar);

function excluirTodosUsuarios_eRenderizar() {
  excluirTodosUsuarios();
  renderizarLista();
}

formPesquisa.addEventListener("submit", (evento) => {
  evento.preventDefault(); // pesquisa é feita em tempo real, não precisa recarregar
});

inputPesquisa.addEventListener("input", () => {
  renderizarLista(pesquisarUsuarios(inputPesquisa.value));
});

renderizarLista();