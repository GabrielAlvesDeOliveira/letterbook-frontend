(function () {
    const CHAVE_ACERVO = "acervo";
  
    function acervoJaExiste() {
      return localStorage.getItem(CHAVE_ACERVO) !== null;
    }
  
    function carregarAcervoInicial() {
      fetch("../data/obras.json")
        .then((resposta) => {
          if (!resposta.ok) {
            throw new Error("Não foi possível carregar obras.json: " + resposta.status);
          }
          return resposta.json();
        })
        .then((obras) => {
          localStorage.setItem(CHAVE_ACERVO, JSON.stringify(obras));
          document.dispatchEvent(new CustomEvent("acervo:pronto"));
        })
        .catch((erro) => {
          console.error("Erro ao carregar o acervo inicial:", erro);
        });
    }
  
    if (acervoJaExiste()) {
      document.dispatchEvent(new CustomEvent("acervo:pronto"));
    } else {
      carregarAcervoInicial();
    }
  })();