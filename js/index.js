window.onload = () => {

    const aboutButton = document.getElementById('about-button')
    const aboutText = document.getElementById('menu-about')
    aboutButton.onclick = () =>{
    aboutText.classList.remove('hidden')
  }

    const closeAbout = document.getElementById('closeAbout')
    closeAbout.onclick = () =>{
      aboutText.classList.add('hidden')
    }
  

  document.getElementById('start-button').onclick = () => {
    startGame();
    
  };
  document.getElementById('reload-button').onclick = () =>{
    location.reload();
  }

  function startGame() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const game = new Game(ctx);

    const boardNode = document.getElementById('menu-board');
    boardNode.classList.add('hidden');
    game.start();
  }
}