document.addEventListener('DOMContentLoaded', function() {
    const burgerButton = document.querySelector('.headerBurger');
    const navMenu = document.querySelector('.navMenu');
    
    burgerButton.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
});





const playButton = document.getElementById("playButton");
    const playIcon = document.getElementById("playIcon");
    const audioPlayer = document.getElementById("audioPlayer");

    playButton.addEventListener("click", () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playIcon.src = "src/assets/images/audioPause.svg"; // Cambia a icono de pausa
        } else {
            audioPlayer.pause();
            playIcon.src = "src/assets/images/audioPlayer.svg"; // Cambia a icono de play
        }
    });