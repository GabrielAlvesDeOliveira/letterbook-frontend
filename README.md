# 📚 Letterbook

![Status](https://img.shields.io/badge/status-conclu%C3%ADdo-AC8F83?style=for-the-badge&labelColor=261C1A)
![HTML](https://img.shields.io/badge/HTML5-ADA0A2?style=for-the-badge&labelColor=261C1A)
![CSS](https://img.shields.io/badge/CSS3-AC8F83?style=for-the-badge&labelColor=261C1A)
![JavaScript](https://img.shields.io/badge/JavaScript-D5CCC7?style=for-the-badge&labelColor=261C1A&logoColor=261C1A)

Projeto desenvolvido para a disciplina de Programação Web Front-end (UTFPR — Campus Cornélio Procópio), com o objetivo de aplicar na prática os conceitos de HTML, CSS e JavaScript vistos em sala de aula.

## 🎨 Paleta de cores

Cores definidas em `css/variaveis.css` e utilizadas em toda a interface:

| Cor | Variável | Hex | Uso |
|---|---|---|---|
| ![#261C1A](https://placehold.co/20x20/261C1A/261C1A.png) | `--preto` | `#261C1A` | Textos, rodapé, títulos |
| ![#AC8F83](https://placehold.co/20x20/AC8F83/AC8F83.png) | `--marrom` | `#AC8F83` | Header, cards, formulários |
| ![#ADA0A2](https://placehold.co/20x20/ADA0A2/ADA0A2.png) | `--cinza` | `#ADA0A2` | Painel de listagem (Admin) |
| ![#D5CCC7](https://placehold.co/20x20/D5CCC7/D5CCC7.png) | `--branco` | `#D5CCC7` | Fundo geral da página |

## Descrição

O Letterbook é uma aplicação web de avaliação de livros, inspirada no conceito do Letterboxd (avaliação de filmes). A aplicação conta com:

- **Acervo fixo** de 10 livros, carregado automaticamente no Local Storage a partir de um arquivo `obras.json`.
- **Avaliação por estrelas** (0 a 5, com incrementos de 0.5), salva diretamente no Local Storage.
- **Lista de desejos**, onde o usuário pode adicionar ou remover livros do acervo para acompanhar depois.
- **Página de cadastro e login** de conta, com redirecionamento entre as duas páginas.
- **Painel Admin**, que permite:
  - Cadastrar novos usuários (nome e e-mail);
  - Visualizar todos os usuários cadastrados (incluindo os que se cadastraram pela página de criação de conta) em uma lista não ordenada;
  - Pesquisar usuários por nome ou e-mail em tempo real;
  - Excluir um usuário específico;
  - Excluir todos os usuários de uma vez;
  - Limpar os campos do formulário de cadastro.

Todos os dados (acervo, avaliações, lista de desejos e usuários) são armazenados localmente no navegador, utilizando as APIs DOM e Web Storage — sem uso de bibliotecas ou frameworks externos.

## Estrutura do projeto

```
├── html/
│   ├── home.html          # Página principal (acervo de livros)
│   ├── wishlist.html      # Lista de desejos
│   ├── admin.html         # Painel de administração de usuários
│   ├── cadastro.html      # Criação de conta
│   ├── login.html         # Login (estático)
│   ├── header.html        # Cabeçalho (componentizado)
│   └── footer.html        # Rodapé (componentizado)
│
├── css/
│   ├── variaveis.css      # Variáveis de cores utilizadas no projeto
│   ├── index.css          # Estilos gerais (header, footer, acervo, cards)
│   ├── admin.css          # Estilos da página Admin
│   └── formularios.css    # Estilos das páginas de cadastro e login
│
├── javascript/
│   ├── inicializar.js     # Carrega o acervo (obras.json) no Local Storage, se ainda não existir
│   ├── renderizar.js      # Carrega os componentes de header e footer
│   ├── cards.js           # Renderização dos cards do acervo, avaliação por estrelas e lista de desejos
│   ├── admin.js           # Lógica da página Admin (cadastro, exclusão, pesquisa)
│   └── cadastro.js        # Lógica da criação de conta (salva o usuário e redireciona para o login)
│
├── icone/                 # Ícones utilizados na interface (SVG)
├── imagem/                # Capas dos livros do acervo
├── data/
│   └── obras.json         # Acervo fixo de livros (título, capa, nota)
│
└── README.md
```

## Como executar

Como o projeto utiliza `fetch` para carregar o acervo e os componentes de header/footer, ele precisa ser servido por um servidor local (abrir diretamente pelo navegador via `file://` bloqueia essas requisições por CORS).

1. Clone o repositório.
2. Abra a pasta do projeto com a extensão **Live Server** do VS Code (ou outro servidor local de sua preferência).
3. Acesse `html/home.html`.

## Integrantes

- Gabriel Alves de Oliveira
- Luigi Augusto Rovani
