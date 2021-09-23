const imageContainer = document.querySelector('.container');

document.addEventListener("DOMContentLoaded", function() {
  // Código que será executado quando o navegador carregar
  fetch('https://us-central1-squid-apis.cloudfunctions.net/test-front-basic')
    .then(response => response.json())
    .then((data) => {
      data.map((item) => {
        const divImage = createImage(item.imagens.resolucaoPadrao.url)
        divImage.href = item.link
        divImage.target = '_blank'
        const divDetails = createDetails(item)
        divImage.appendChild(divDetails);
        imageContainer.appendChild(divImage);
      })
    })
});

const createImage = (data) => {
  const div = document.createElement('a');
  div.style.backgroundImage = `url(${data})`
  div.className = 'image-container';
  return div
}

const createDetails = (data) => {
  const div = document.createElement('div');
  div.className = 'details-container';
  const userName = document.createElement('p');
  userName.innerText = `@${data.usuario.username}`;
  const likes = document.createElement('p');
  likes.innerText = ` ${data.upvotes}`;
  likes.className = 'fas fa-heart';
  const coments = document.createElement('p');
  coments.innerText = ` ${data.comentarios}`;
  coments.className = 'fas fa-comments';
  const createAt = document.createElement('p');
  const formatedData = formatData(data.criadoEm);
  createAt.innerText = ` ${formatedData}`;
  createAt.className = 'fas fa-calendar-alt';
  div.appendChild(userName);
  div.appendChild(likes);
  div.appendChild(coments);
  div.appendChild(createAt);
  return div;
}

const formatData = (item) => {
  const data = new Date(item)
  dia = data.getDate().toString().padStart(2, '0'),
  mes = (data.getMonth()+1).toString().padStart(2, '0'),
  ano = data.getFullYear();
  hora = data.getHours();
  minuto = ('00' + data.getMinutes()).slice(-2);
  return `${dia}/${mes}/${ano} ${hora}:${minuto}`
}
