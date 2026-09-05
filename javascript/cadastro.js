const CHAVE_USUARIOS = "usuarios";

const formCadastro = document.getElementById("form-cadastro-conta");

function obterUsuarios() {
  return JSON.parse(localStorage.getItem(CHAVE_USUARIOS)) || [];
}

function salvarUsuarios(usuarios) {
  localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));
}

function gerarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

formCadastro.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmar-senha").value;
  const nascimento = document.getElementById("nascimento").value;

  if (!nome || !email || !senha || !nascimento) {
    alert("Preencha todos os campos.");
    return;
  }

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem.");
    return;
  }

  const usuarios = obterUsuarios();
  usuarios.push({
    id: gerarId(),
    nome,
    email,
    data: new Date().toLocaleString("pt-BR"),
  });
  salvarUsuarios(usuarios);

  window.location.href = "login.html";
});