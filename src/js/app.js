
document.addEventListener('DOMContentLoaded', function() {
    // Control del menú hamburguesa
    const burgerButton = document.querySelector('.headerBurger');
    const navMenu = document.querySelector('.navMenu');
    
    burgerButton.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Control del reproductor de audio
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

    // Cargar datos desde JSON
    fetch('src/data/test.json')
        .then(response => response.json())
        .then(data => {
            // 1. Cargar logo del header
            loadHeaderLogo(data);
            
            // 2. Cargar navegación principal
            loadMainNavigation(data);
            
            // 3. Cargar temas de tendencia (hot topics)
            loadHotTopics(data);
            
            // 4. Cargar iconos de redes sociales
            loadSocialIcons(data);
            
            // 5. Cargar imagen de la sección pageLead
            loadPageLeadImage(data);
            
            // 6. Cargar migas de pan (breadcrumbs)
            loadBreadcrumbs(data);
            
            // 7. Cargar título y subtítulo
            loadHeadlineContent(data);
            
            // 8. Cargar datos del reproductor de audio
            loadAudioPlayerData(data);
            
            // 9. Cargar botones de compartir
            loadShareButtons(data);
        })
        .catch(error => {
            console.error('Error cargando los datos:', error);
        });
});

// Función para cargar el logo del header
function loadHeaderLogo(data) {
    if (data.logo && data.logo.length > 0) {
        const logoImg = document.getElementById('logo-container');
        const logoData = data.logo[0];
        
        // Actualiza solo los atributos de la imagen existente
        logoImg.src = logoData.image.src;
        logoImg.alt = logoData.alt;
        
        if (logoData.image.width) logoImg.width = logoData.image.width;
        if (logoData.image.height) logoImg.height = logoData.image.height;
    }
}

// Función para cargar la navegación principal
function loadMainNavigation(data) {
    if (data.navigation && data.navigation.length > 0 && data.navigation[0].items) {
        const menuList = document.querySelector('.menuList');
        menuList.innerHTML = ''; // Limpiar lista actual
        
        data.navigation[0].items.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            
            a.href = item.href;
            a.textContent = item.text;
            a.classList.add(convertToClassName(item.text)); // Añadir clase basada en el texto
            
            li.appendChild(a);
            menuList.appendChild(li);
        });
    }
}

// Función para cargar los temas de tendencia
function loadHotTopics(data) {
    if (data.hotTopics && data.hotTopics.length > 0) {
        const trendingBox = document.querySelector('.trendingBox');
        
        // Conservar el span de "Tendencias:"
        const trendingSpan = trendingBox.querySelector('.trendingSpan');
        const br = trendingBox.querySelector('br');
        
        // Limpiar el resto del contenido
        trendingBox.innerHTML = '';
        trendingBox.appendChild(trendingSpan);
        trendingBox.appendChild(br);
        
        // Añadir los nuevos enlaces de tendencias
        data.hotTopics.forEach((topic, index) => {
            const a = document.createElement('a');
            a.href = topic.url;
            a.textContent = topic.title;
            a.classList.add(`tend${index + 1}`);
            if (topic.target) a.target = topic.target;
            
            trendingBox.appendChild(a);
        });
    }
}

// Función para cargar los iconos de redes sociales
function loadSocialIcons(data) {
    if (data.social && data.social.length > 0 && data.social[0].items) {
        const socialBox = document.querySelector('.socialBox');
        socialBox.innerHTML = ''; // Limpiar iconos actuales
        
        data.social[0].items.forEach(item => {
            const a = document.createElement('a');
            a.href = item.href;
            
            const img = document.createElement('img');
            img.src = `src/assets/images/${item.socialService}.svg`;
            img.alt = item.socialService;
            
            a.appendChild(img);
            socialBox.appendChild(a);
        });
    }
}

// Función para cargar la imagen de la sección pageLead
function loadPageLeadImage(data) {
    if (data.pageLead && data.pageLead.length > 0) {
        const pageLeadSection = document.querySelector('.pageLead');
        const pageLeadImg = pageLeadSection.querySelector('img');
        
        const imageData = data.pageLead[0];
        
        pageLeadImg.src = imageData.image.src;
        pageLeadImg.alt = imageData.alt || 'Imagen de cabecera';
        
        if (imageData.image.width) pageLeadImg.width = imageData.image.width;
        if (imageData.image.height) pageLeadImg.height = imageData.image.height;
    }
}

// Función para cargar las migas de pan
function loadBreadcrumbs(data) {
    if (data.breadcrumbs && data.breadcrumbs.length > 0) {
        const startBox = document.querySelector('.startBox');
        startBox.innerHTML = ''; // Limpiar contenido actual
        
        data.breadcrumbs.forEach((crumb, index) => {
            // Crear el enlace
            const a = document.createElement('a');
            a.href = crumb.href || '#';
            a.textContent = crumb.body;
            
            // Asignar clases según la posición
            if (index === 0) {
                a.classList.add('startInicio');
            } else if (index === 1) {
                a.classList.add('startHumor');
            } else if (index === 2) {
                a.classList.add('startSosp');
                const div = document.createElement('div');
                div.classList.add('boxSosp');
                div.appendChild(a);
                startBox.appendChild(div);
            } else if (index === 3) {
                const div = document.createElement('div');
                div.classList.add('boxSpan');
                const p = document.createElement('p');
                p.classList.add('spanTato');
                p.textContent = crumb.body;
                div.appendChild(p);
                startBox.appendChild(div);
            }
            
            // Para los tres primeros elementos, añadir directamente
            if (index < 2) {
                startBox.appendChild(a);
            }
            
            // Añadir separadores ">" excepto después del último elemento
            if (index < data.breadcrumbs.length - 1) {
                const span = document.createElement('span');
                span.textContent = '>';
                startBox.appendChild(span);
            }
        });
    }
}

// Función para cargar título y subtítulo
function loadHeadlineContent(data) {
    const headlineBox = document.querySelector('.headlineBox');
    
    if (data.headline) {
        const h1 = headlineBox.querySelector('h1');
        h1.textContent = data.headline;
    }
    
    if (data.subHeadline) {
        const p = headlineBox.querySelector('p');
        p.innerHTML = data.subHeadline;
    }
}

// Función para cargar datos del reproductor de audio
function loadAudioPlayerData(data) {
    if (data.audioPlayer && data.audioPlayer.length > 0) {
        const audioData = data.audioPlayer[0];
        const audioPlayer = document.getElementById('audioPlayer');
        const audioTitle = document.querySelector('.audioTitle p');
        
        // Actualizar la fuente del audio
        if (audioData.audioUrl) {
            const audioSource = audioPlayer.querySelector('source');
            audioSource.src = audioData.audioUrl;
            audioPlayer.load(); // Recargar el audio con la nueva fuente
        }
        
        // Actualizar el título y duración
        if (audioData.audioTitle) {
            // Formatear la duración de milisegundos a minutos:segundos
            let durationText = '';
            if (audioData.audioDuration) {
                const totalSeconds = Math.floor(audioData.audioDuration / 1000);
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;
                durationText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
            
            audioTitle.innerHTML = audioData.audioTitle + (durationText ? ` <span>${durationText}</span>` : '');
        }
    }
}

// Función para cargar botones de compartir
function loadShareButtons(data) {
    if (data.actions && data.actions.length > 0 && data.actions[0].items) {
        const shareIconBox = document.querySelector('.shareIconBox');
        shareIconBox.innerHTML = ''; // Limpiar contenido actual
        
        data.actions[0].items.forEach(item => {
            if (item._template.includes('Facebook')) {
                const a = document.createElement('a');
                a.href = `https://www.facebook.com/sharer/sharer.php?u=${item.shareHref}`;
                
                const img = document.createElement('img');
                img.src = 'src/assets/images/facebook2.svg';
                img.alt = 'facebook';
                
                a.appendChild(img);
                shareIconBox.appendChild(a);
            } else if (item._template.includes('Twitter')) {
                const a = document.createElement('a');
                a.href = `https://x.com/intent/tweet?text=${item.text}&url=${item.url}`;
                
                const img = document.createElement('img');
                img.src = 'src/assets/images/twitter2.svg';
                img.alt = 'twitter';
                
                a.appendChild(img);
                shareIconBox.appendChild(a);
            }
        });
    }
}

// Función de utilidad para convertir texto a formato de clase CSS
function convertToClassName(text) {
    // Eliminar acentos y convertir a minúsculas
    return text.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, '');
}