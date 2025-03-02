/**
 * Initializes the page functionality when the DOM content is fully loaded.
 * Sets up event listeners and loads data from a JSON file.
 * @event DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', function() {

    /**
     * Burger menu button element
     * @type {HTMLElement}
     */
    const burgerButton = document.querySelector('.headerBurger');
    
    /**
     * Navigation menu element
     * @type {HTMLElement}
     */
    const navMenu = document.querySelector('.navMenu');
    
    /**
     * Toggles the navigation menu visibility when the burger button is clicked
     * @event click
     */
    burgerButton.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    /**
     * Audio player control button
     * @type {HTMLElement}
     */
    const playButton = document.getElementById("playButton");
    
    /**
     * Play/Pause icon element
     * @type {HTMLImageElement}
     */
    const playIcon = document.getElementById("playIcon");
    
    /**
     * Audio player element
     * @type {HTMLAudioElement}
     */
    const audioPlayer = document.getElementById("audioPlayer");
    
    /**
     * Toggles audio playback when the play button is clicked
     * Changes the icon based on the current playback state
     * @event click
     */
    playButton.addEventListener("click", () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playIcon.src = "src/assets/images/audioPause.svg"; 
        } else {
            audioPlayer.pause();
            playIcon.src = "src/assets/images/audioPlayer.svg"; 
        }
    });

    /**
     * Fetches data from the JSON file and populates page content
     * @returns {Promise} Promise that resolves when all data is loaded
     */
    fetch('src/data/test.json')
        .then(response => response.json())
        .then(data => {

            /**
             * Loads the header logo from the fetched data
             * @param {Object} data - The JSON data object
             */
            loadHeaderLogo(data);
            
            /**
             * Loads the main navigation from the fetched data
             * @param {Object} data - The JSON data object
             */
            loadMainNavigation(data);
            
            /**
             * Loads hot topics section from the fetched data
             * @param {Object} data - The JSON data object
             */
            loadHotTopics(data);
            
            /**
             * Loads social media icons from the fetched data
             * @param {Object} data - The JSON data object
             */
            loadSocialIcons(data);
            
            /**
             * Loads the main lead image from the fetched data
             * @param {Object} data - The JSON data object
             */
            loadPageLeadImage(data);
            
            /**
             * Loads breadcrumb navigation from the fetched data
             * @param {Object} data - The JSON data object
             */
            loadBreadcrumbs(data);
            
            /**
             * Loads the main headline content from the fetched data
             * @param {Object} data - The JSON data object
             */
            loadHeadlineContent(data);
            
            /**
             * Loads audio player data from the fetched data
             * @param {Object} data - The JSON data object
             */
            loadAudioPlayerData(data);
            
            /**
             * Loads social share buttons from the fetched data
             * @param {Object} data - The JSON data object
             */
            loadShareButtons(data);
        })
        .catch(error => {
            console.error('Error cargando los datos:', error);
        });
});


/**
 * Loads and displays the header logo from the provided data
 * @param {Object} data - The JSON data containing logo information
 */
function loadHeaderLogo(data) {
    if (data.logo && data.logo.length > 0) {
        /**
         * The logo container element
         * @type {HTMLImageElement}
         */
        const logoImg = document.getElementById('logo-container');
        
        /**
         * Logo data from the JSON
         * @type {Object}
         */
        const logoData = data.logo[0];
        
        logoImg.src = logoData.image.src;
        logoImg.alt = logoData.alt;
        
        if (logoData.image.width) logoImg.width = logoData.image.width;
        if (logoData.image.height) logoImg.height = logoData.image.height;
    }
}

/**
 * Loads and builds the main navigation menu from the provided data
 * @param {Object} data - The JSON data containing navigation items
 */
function loadMainNavigation(data) {
    if (data.navigation && data.navigation.length > 0 && data.navigation[0].items) {
        /**
         * The menu list container element
         * @type {HTMLElement}
         */
        const menuList = document.querySelector('.menuList');
        menuList.innerHTML = ''; 
        
        /**
         * Iterates through each navigation item and creates corresponding elements
         */
        data.navigation[0].items.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            
            a.href = item.href;
            a.textContent = item.text;
            a.classList.add(convertToClassName(item.text)); 
            
            li.appendChild(a);
            menuList.appendChild(li);
        });
    }
}

/**
 * Loads and displays hot topics from the provided data
 * @param {Object} data - The JSON data containing hot topics information
 */
function loadHotTopics(data) {
    if (data.hotTopics && data.hotTopics.length > 0) {
        /**
         * The trending box container element
         * @type {HTMLElement}
         */
        const trendingBox = document.querySelector('.trendingBox');
        
        /**
         * The trending span element within the trending box
         * @type {HTMLElement}
         */
        const trendingSpan = trendingBox.querySelector('.trendingSpan');
        
        /**
         * The line break element within the trending box
         * @type {HTMLElement}
         */
        const br = trendingBox.querySelector('br');
        
        // Clear and rebuild the trending box content
        trendingBox.innerHTML = '';
        trendingBox.appendChild(trendingSpan);
        trendingBox.appendChild(br);
        
        /**
         * Iterates through each hot topic and creates corresponding elements
         */
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

/**
 * Loads and displays social media icons from the provided data
 * @param {Object} data - The JSON data containing social media information
 */
function loadSocialIcons(data) {
    if (data.social && data.social.length > 0 && data.social[0].items) {
        /**
         * The social box container element
         * @type {HTMLElement}
         */
        const socialBox = document.querySelector('.socialBox');
        socialBox.innerHTML = ''; // Clear current icons
        
        /**
         * Iterates through each social media item and creates corresponding elements
         */
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

/**
 * Loads and displays the page lead image from the provided data
 * @param {Object} data - The JSON data containing page lead image information
 */
function loadPageLeadImage(data) {
    if (data.pageLead && data.pageLead.length > 0) {
        /**
         * The page lead section container element
         * @type {HTMLElement}
         */
        const pageLeadSection = document.querySelector('.pageLead');
        
        /**
         * The image element within the page lead section
         * @type {HTMLImageElement}
         */
        const pageLeadImg = pageLeadSection.querySelector('img');
        
        /**
         * Image data from the JSON
         * @type {Object}
         */
        const imageData = data.pageLead[0];
        
        pageLeadImg.src = imageData.image.src;
        pageLeadImg.alt = imageData.alt || 'Imagen de cabecera';
        
        if (imageData.image.width) pageLeadImg.width = imageData.image.width;
        if (imageData.image.height) pageLeadImg.height = imageData.image.height;
    }
}

/**
 * Loads and builds the breadcrumb navigation from the provided data
 * @param {Object} data - The JSON data containing breadcrumb information
 */
function loadBreadcrumbs(data) {
    if (data.breadcrumbs && data.breadcrumbs.length > 0) {
        /**
         * The start box container element
         * @type {HTMLElement}
         */
        const startBox = document.querySelector('.startBox');
        startBox.innerHTML = ''; // Clear current content
        
        /**
         * Iterates through each breadcrumb and creates corresponding elements
         * with specific class assignments based on position
         */
        data.breadcrumbs.forEach((crumb, index) => {
            const a = document.createElement('a');
            a.href = crumb.href || '#';
            a.textContent = crumb.body;
            
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
            
            if (index < 2) {
                startBox.appendChild(a);
            }
            
            if (index < data.breadcrumbs.length - 1) {
                const span = document.createElement('span');
                span.textContent = '>';
                startBox.appendChild(span);
            }
        });
    }
}

/**
 * Loads and displays the headline content from the provided data
 * @param {Object} data - The JSON data containing headline information
 */
function loadHeadlineContent(data) {
    /**
     * The headline box container element
     * @type {HTMLElement}
     */
    const headlineBox = document.querySelector('.headlineBox');
    
    if (data.headline) {
        /**
         * The h1 element within the headline box
         * @type {HTMLHeadingElement}
         */
        const h1 = headlineBox.querySelector('h1');
        h1.textContent = data.headline;
    }
    
    if (data.subHeadline) {
        /**
         * The paragraph element within the headline box
         * @type {HTMLParagraphElement}
         */
        const p = headlineBox.querySelector('p');
        p.innerHTML = data.subHeadline;
    }
}

/**
 * Loads and configures the audio player with data from the provided JSON
 * @param {Object} data - The JSON data containing audio player information
 */
function loadAudioPlayerData(data) {
    if (data.audioPlayer && data.audioPlayer.length > 0) {
        /**
         * Audio player data from the JSON
         * @type {Object}
         */
        const audioData = data.audioPlayer[0];
        
        /**
         * The audio player element
         * @type {HTMLAudioElement}
         */
        const audioPlayer = document.getElementById('audioPlayer');
        
        /**
         * The audio title element
         * @type {HTMLElement}
         */
        const audioTitle = document.querySelector('.audioTitle p');
        
        if (audioData.audioUrl) {
            /**
             * The audio source element
             * @type {HTMLSourceElement}
             */
            const audioSource = audioPlayer.querySelector('source');
            audioSource.src = audioData.audioUrl;
            audioPlayer.load(); 
        }
        
        if (audioData.audioTitle) {
            /**
             * Formatted duration text string
             * @type {string}
             */
            let durationText = '';
            
            if (audioData.audioDuration) {
                /**
                 * Total seconds calculated from milliseconds
                 * @type {number}
                 */
                const totalSeconds = Math.floor(audioData.audioDuration / 1000);
                
                /**
                 * Minutes component of the duration
                 * @type {number}
                 */
                const minutes = Math.floor(totalSeconds / 60);
                
                /**
                 * Seconds component of the duration
                 * @type {number}
                 */
                const seconds = totalSeconds % 60;
                
                durationText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
            
            audioTitle.innerHTML = audioData.audioTitle + (durationText ? ` <span>${durationText}</span>` : '');
        }
    }
}

/**
 * Loads and displays share buttons from the provided data
 * @param {Object} data - The JSON data containing share button information
 */
function loadShareButtons(data) {
    if (data.actions && data.actions.length > 0 && data.actions[0].items) {
        /**
         * The share icon box container element
         * @type {HTMLElement}
         */
        const shareIconBox = document.querySelector('.shareIconBox');
        shareIconBox.innerHTML = ''; 
        
        /**
         * Iterates through each share action and creates corresponding elements
         * based on the template type (Facebook or Twitter)
         */
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

/**
 * Converts a display text into a CSS class name by removing accents,
 * converting to lowercase, and removing spaces
 * @param {string} text - The text to convert to a class name
 * @returns {string} The formatted class name
 */
function convertToClassName(text) {
    return text.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, '');
}