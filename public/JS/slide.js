// Obtém todos os slides
const slides = document.querySelectorAll('.slide');

// Define o índice do slide atual
let currentSlide = 0;

// Exibe o slide atual e esconde os demais
function showSlide() {
  slides.forEach((slide, index) => {
    if (index === currentSlide) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
}

// Função para ir para o próximo slide
function nextSlide() {
  currentSlide++;
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  showSlide();
}

// Função para ir para o slide anterior
function previousSlide() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  showSlide();
}

// Função para alternar entre tela cheia e modo normal
function toggleFullscreen() {
  const container = document.querySelector('.slide-container');
  const navigation = document.querySelector('.navigation');
  if (container.requestFullscreen) {
    if (!document.fullscreenElement) {
      container.requestFullscreen();
      navigation.style.display = 'block';
    } else {
      document.exitFullscreen();
      navigation.style.display = 'none';
    }
  } else if (container.mozRequestFullScreen) {
    if (!document.mozFullScreenElement) {
      container.mozRequestFullScreen();
      navigation.style.display = 'block';
    } else {
      document.mozCancelFullScreen();
      navigation.style.display = 'none';
    }
  } else if (container.webkitRequestFullscreen) {
    if (!document.webkitFullscreenElement) {
      container.webkitRequestFullscreen();
      navigation.style.display = 'block';
    } else {
      document.webkitExitFullscreen();
      navigation.style.display = 'none';
    }
  } else if (container.msRequestFullscreen) {
    if (!document.msFullscreenElement) {
      container.msRequestFullscreen();
      navigation.style.display = 'block';
    } else {
      document.msExitFullscreen();
      navigation.style.display = 'none';
    }
  }
}

// Exibe o slide inicial
showSlide();

// Adiciona evento para a tecla pressionada
document.addEventListener('keydown', function(e) {
  if (e.keyCode === 37) {
    // Tecla de seta esquerda
    previousSlide();
  } else if (e.keyCode === 39) {
    // Tecla de seta direita
    nextSlide();
  }
});