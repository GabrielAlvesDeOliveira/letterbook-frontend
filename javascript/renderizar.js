function carregarComponentes() {
    fetch('../html/header.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Erro ao carregar o header:', error));
  
    fetch('../html/footer.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Erro ao carregar o footer:', error));
}
  
window.addEventListener('DOMContentLoaded', carregarComponentes);