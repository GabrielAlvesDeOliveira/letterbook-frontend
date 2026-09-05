const CHAVE_ACERVO = "acervo";
const CHAVE_DESEJOS = "listaDesejos";

const ICONE_ESTRELA_VAZIA = "../icone/star-svgrepo-com.svg";
const ICONE_ESTRELA_MEIA = "../icone/star-half-svgrepo-com.svg";
const ICONE_ESTRELA_CHEIA = "../icone/star-filled-svgrepo-com.svg";

const ICONE_CARRINHO_ADICIONAR = "../icone/cart-shopping-svgrepo-com.svg";
const ICONE_CARRINHO_REMOVER = "../icone/cart-xmark-svgrepo-com.svg";

function estaNaPaginaDesejos() {
  return window.location.pathname.includes("wishlist");
}

function criarEstrelas(livro) {
  const container = document.createElement("div");
  container.className = "estrelas";

  for (let posicao = 1; posicao <= 5; posicao++) {
    const estrela = document.createElement("span");
    estrela.className = "estrela";
    estrela.dataset.posicao = posicao;

    const img = document.createElement("img");
    img.width = 25;
    estrela.appendChild(img);
    container.appendChild(estrela);

    estrela.addEventListener("click", (evento) => {
      const valorClicado = calcularValorClique(evento, posicao);
      livro.nota = valorClicado;
      atualizarNota(livro.id, valorClicado);
      pintarEstrelas(container, valorClicado);
    });

    estrela.addEventListener("mousemove", (evento) => {
      const valorPreview = calcularValorClique(evento, posicao);
      pintarEstrelas(container, valorPreview);
    });
  }

  container.addEventListener("mouseleave", () => {
    pintarEstrelas(container, livro.nota ?? 0);
  });

  pintarEstrelas(container, livro.nota ?? 0);
  return container;
}

function calcularValorClique(evento, posicao) {
  const larguraEstrela = evento.currentTarget.offsetWidth;
  const cliqueX = evento.offsetX;
  const clicouNaMetadeEsquerda = cliqueX < larguraEstrela / 2;
  return clicouNaMetadeEsquerda ? posicao - 0.5 : posicao;
}

function pintarEstrelas(container, nota) {
  const estrelas = container.querySelectorAll(".estrela");

  estrelas.forEach((estrela) => {
    const posicao = Number(estrela.dataset.posicao);
    const img = estrela.querySelector("img");

    if (nota >= posicao) {
      img.src = ICONE_ESTRELA_CHEIA;
      img.alt = `Estrela ${posicao} preenchida`;
    } else if (nota >= posicao - 0.5) {
      img.src = ICONE_ESTRELA_MEIA;
      img.alt = `Estrela ${posicao} meio preenchida`;
    } else {
      img.src = ICONE_ESTRELA_VAZIA;
      img.alt = `Estrela ${posicao} vazia`;
    }
  });
}

function criarCardLivro(livro, modo) {
  const card = document.createElement("div");
  card.className = "livro-card";
  card.dataset.livroId = livro.id;

  const iconeCarrinho = modo === "desejos" ? ICONE_CARRINHO_REMOVER : ICONE_CARRINHO_ADICIONAR;
  const altCarrinho = modo === "desejos" ? "Remover da lista de desejos" : "Adicionar a lista de desejos";

  card.innerHTML = `
    <img src="${livro.capa}" alt="Capa do livro ${livro.titulo}" width="200">
    <h3>${livro.titulo}</h3>
    <button type="button">
      <img src="${iconeCarrinho}" alt="${altCarrinho}" width="25">
    </button>
  `;

  const estrelas = criarEstrelas(livro);
  const botaoCarrinho = card.querySelector("button");
  card.insertBefore(estrelas, botaoCarrinho);

  botaoCarrinho.addEventListener("click", () => {
    if (modo === "desejos") {
      removerDaListaDesejos(livro.id, card);
    } else {
      adicionarNaListaDesejos(livro.id);
    }
  });

  return card;
}

function renderizarAcervo() {
  const acervo = JSON.parse(localStorage.getItem(CHAVE_ACERVO)) || [];
  const secaoCards = document.querySelector(".cards");
  if (!secaoCards) return;

  const modo = estaNaPaginaDesejos() ? "desejos" : "acervo";
  let livrosParaExibir = acervo;

  if (modo === "desejos") {
    const listaDesejos = JSON.parse(localStorage.getItem(CHAVE_DESEJOS)) || [];
    livrosParaExibir = acervo.filter((livro) => listaDesejos.includes(livro.id));
  }

  livrosParaExibir.forEach((livro) => {
    const card = criarCardLivro(livro, modo);
    secaoCards.appendChild(card);
  });
}

function atualizarNota(idLivro, novaNota) {
  const acervo = JSON.parse(localStorage.getItem(CHAVE_ACERVO)) || [];
  const livro = acervo.find((item) => item.id === idLivro);
  if (livro) {
    livro.nota = novaNota;
    localStorage.setItem(CHAVE_ACERVO, JSON.stringify(acervo));
  }
}

function adicionarNaListaDesejos(idLivro) {
  const listaDesejos = JSON.parse(localStorage.getItem(CHAVE_DESEJOS)) || [];
  if (!listaDesejos.includes(idLivro)) {
    listaDesejos.push(idLivro);
    localStorage.setItem(CHAVE_DESEJOS, JSON.stringify(listaDesejos));
    console.log(`Livro ${idLivro} adicionado à lista de desejos.`);
  }
}

function removerDaListaDesejos(idLivro, card) {
  let listaDesejos = JSON.parse(localStorage.getItem(CHAVE_DESEJOS)) || [];
  listaDesejos = listaDesejos.filter((id) => id !== idLivro);
  localStorage.setItem(CHAVE_DESEJOS, JSON.stringify(listaDesejos));
  card.remove();
}

if (localStorage.getItem(CHAVE_ACERVO) !== null) {
  renderizarAcervo();
} else {
  document.addEventListener("acervo:pronto", renderizarAcervo);
}