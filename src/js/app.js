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







// Register Handlebars helpers
Handlebars.registerHelper('formatDuration', function(duration) {
    // Convert milliseconds to minutes and seconds
    const totalSeconds = Math.floor(duration / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    // Format as MM:SS
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
});

// Main function to fetch JSON data and render template
document.addEventListener('DOMContentLoaded', function() {
    // Load JSON data
    fetch('test.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Get the template source from the current HTML
            const source = document.getElementById('handlebars-template').innerHTML;
            
            // Compile the template
            const template = Handlebars.compile(source);
            
            // Render the template with the data
            const html = template(data);
            
            // Replace the content of the body
            document.body.innerHTML = html;
            
            // Re-initialize any event listeners after the DOM is updated
            initializeAudioPlayer();
            initializeBurgerMenu();
        })
        .catch(error => {
            console.error('Error fetching or processing JSON:', error);
        });
});

// Audio player functionality
function initializeAudioPlayer() {
    const playButton = document.getElementById('playButton');
    const playIcon = document.getElementById('playIcon');
    const audioPlayer = document.getElementById('audioPlayer');
    
    if (playButton && playIcon && audioPlayer) {
        playButton.addEventListener('click', function() {
            if (audioPlayer.paused) {
                audioPlayer.play();
                playIcon.src = 'src/assets/images/pause.svg'; // Assuming you have a pause icon
            } else {
                audioPlayer.pause();
                playIcon.src = 'src/assets/images/audioPlayer.svg';
            }
        });
    }
}

// Burger menu functionality
function initializeBurgerMenu() {
    const burgerButton = document.querySelector('.headerBurger');
    const navMenu = document.querySelector('.navMenu');
    
    if (burgerButton && navMenu) {
        burgerButton.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

// Initialize event listeners for initial page load
initializeAudioPlayer();
initializeBurgerMenu();