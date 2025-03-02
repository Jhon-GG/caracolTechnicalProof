// Import validation functions
import {
    isValidUrl,
    isValidEmail,
    isAudioFile,
    validateAudioPlayer,
    validateSocialItems,
    validateShareItems,
    validateJsonData,
    sanitizeText,
    sanitizeUrl
} from './validation.js';

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
            // Validate the complete JSON before processing the data
            const validationResult = validateJsonData(data);
            
            // If there are validation errors, log them to the console
            if (!validationResult.isValid) {
                console.error('JSON validation errors:', validationResult.errors);
            }
            
            // If there are warnings, log them to the console
            if (validationResult.warnings && validationResult.warnings.length > 0) {
                console.warn('Validation warnings:', validationResult.warnings);
            }
            
            // Continue loading data even with warnings, but only if there are no critical errors
            if (validationResult.isValid) {
                // Load all sections normally
                loadHeaderLogo(data);
                loadMainNavigation(data);
                loadHotTopics(data);
                loadSocialIcons(data);
                loadPageLeadImage(data);
                loadBreadcrumbs(data);
                loadHeadlineContent(data);
                loadAudioPlayerData(data);
                loadShareButtons(data);
                loadBannerLogo(data);
            } else {
                // Show error message on the page
                showErrorMessage('Errors were found in the data. Check the console for more details.');
            }
        })
        .catch(error => {
            console.error('Error loading data:', error);
            showErrorMessage('Error loading data. Please try again later.');
        });
});

/**
 * Shows an error message on the page
 * @param {string} message - The error message to display
 */
function showErrorMessage(message) {
    const headlineBox = document.querySelector('.headlineBox');
    if (headlineBox) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.style.padding = '10px';
        errorDiv.style.margin = '10px 0';
        errorDiv.style.border = '1px solid red';
        errorDiv.style.borderRadius = '5px';
        errorDiv.textContent = message;
        
        headlineBox.appendChild(errorDiv);
    }
}

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
        
        // Validate and sanitize the image URL
        const logoSrc = sanitizeUrl(logoData.image.src);
        if (logoSrc) {
            logoImg.src = logoSrc;
            logoImg.alt = sanitizeText(logoData.alt);
            
            if (logoData.image.width) logoImg.width = logoData.image.width;
            if (logoData.image.height) logoImg.height = logoData.image.height;
        } else {
            console.error('Invalid logo URL:', logoData.image.src);
        }
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
            // Validate URL before creating the element
            const validatedHref = sanitizeUrl(item.href);
            if (!validatedHref) {
                console.warn('Invalid navigation URL ignored:', item.href);
                return; // Skip this element
            }
            
            const li = document.createElement('li');
            const a = document.createElement('a');
            
            a.href = validatedHref;
            a.textContent = sanitizeText(item.text);
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
            // Validate URL before creating the element
            const validatedUrl = sanitizeUrl(topic.url);
            if (!validatedUrl) {
                console.warn('Invalid trend URL ignored:', topic.url);
                return; // Skip this element
            }
            
            const a = document.createElement('a');
            a.href = validatedUrl;
            a.textContent = sanitizeText(topic.title);
            a.classList.add(`tend${index + 1}`);
            if (topic.target) a.target = sanitizeText(topic.target);
            
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
        
        // Validate social elements before processing them
        const socialValidation = validateSocialItems(data.social[0].items);
        if (!socialValidation.isValid) {
            console.error('Errors in social elements:', socialValidation.errors);
            return; // Don't load elements with errors
        }
        
        /**
         * Iterates through each social media item and creates corresponding elements
         */
        data.social[0].items.forEach(item => {
            const validatedHref = sanitizeUrl(item.href);
            if (!validatedHref) {
                console.warn('Invalid social URL ignored:', item.href);
                return; // Skip this element
            }
            
            const a = document.createElement('a');
            a.href = validatedHref;
            
            const img = document.createElement('img');
            img.src = `src/assets/images/${sanitizeText(item.socialService)}.svg`;
            img.alt = sanitizeText(item.socialService);
            
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
        
        // Validate and sanitize the image URL
        const imageSrc = sanitizeUrl(imageData.image.src);
        if (imageSrc) {
            pageLeadImg.src = imageSrc;
            pageLeadImg.alt = sanitizeText(imageData.alt || 'Header image');
            
            if (imageData.image.width) pageLeadImg.width = imageData.image.width;
            if (imageData.image.height) pageLeadImg.height = imageData.image.height;
        } else {
            console.error('Invalid header image URL:', imageData.image.src);
        }
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
            // Validate URL for elements that are links
            let validatedHref = '#';
            if (crumb.href) {
                validatedHref = sanitizeUrl(crumb.href);
                if (!validatedHref && index < 3) { // First 3 elements are links
                    console.warn('Invalid breadcrumb URL ignored:', crumb.href);
                    validatedHref = '#'; // Use a default value
                }
            }
            
            const a = document.createElement('a');
            a.href = validatedHref;
            a.textContent = sanitizeText(crumb.body);
            
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
                p.textContent = sanitizeText(crumb.body);
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
        h1.textContent = sanitizeText(data.headline);
    }
    
    if (data.subHeadline) {
        /**
         * The paragraph element within the headline box
         * @type {HTMLParagraphElement}
         */
        const p = headlineBox.querySelector('p');
        // Here we could decide whether to allow HTML in the subheadline or not
        // For security, we apply sanitizeText to prevent XSS
        p.textContent = sanitizeText(data.subHeadline);
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
        
        // Validate the audio player data
        const audioValidation = validateAudioPlayer(audioData);
        if (!audioValidation.isValid) {
            console.error('Errors in audio player:', audioValidation.errors);
            return; // Don't load player with errors
        }
        
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
            // Validate that it's an audio file
            if (isAudioFile(audioData.audioUrl)) {
                /**
                 * The audio source element
                 * @type {HTMLSourceElement}
                 */
                const audioSource = audioPlayer.querySelector('source');
                const validatedUrl = sanitizeUrl(audioData.audioUrl);
                if (validatedUrl) {
                    audioSource.src = validatedUrl;
                    audioPlayer.load(); 
                } else {
                    console.error('Invalid audio URL:', audioData.audioUrl);
                }
            } else {
                console.error('The file is not a recognized audio format:', audioData.audioUrl);
            }
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
            
            audioTitle.innerHTML = sanitizeText(audioData.audioTitle) + (durationText ? ` <span>${durationText}</span>` : '');
        }
    }
}

/**
 * Loads and displays share buttons from the provided JSON data
 * @param {Object} data - The JSON data containing share button information
 * @description This function populates the share button container using data from the "share" array.
 * It creates anchor elements with appropriate icons and links for social media sharing.
 */
function loadShareButtons(data) {
    if (data.share && data.share.length > 0) {
        /**
         * The share icon box container element
         * @type {HTMLElement}
         */
        const shareIconBox = document.querySelector('.shareIconBox');
        shareIconBox.innerHTML = ''; 
        
        /**
         * Iterates through each share item and creates corresponding elements
         * @type {Array}
         */
        data.share.forEach(item => {
            /**
             * Anchor element for the share button
             * @type {HTMLAnchorElement}
             */
            const a = document.createElement('a');
            
            /**
             * Image element for the share icon
             * @type {HTMLImageElement}
             */
            const img = document.createElement('img');
            
            /**
             * Sanitized image source URL
             * @type {string|null}
             */
            const imageSrc = sanitizeUrl(item.src);
            if (!imageSrc) {
                console.warn('Invalid share icon URL ignored:', item.src);
                return; // Skip this element
            }
            
            // Set image properties from JSON
            img.src = imageSrc;
            img.alt = sanitizeText(item.alt || 'Share');
            
            /**
             * Sanitized share URL
             * @type {string|null}
             */
            const shareHref = sanitizeUrl(item.href);
            if (!shareHref) {
                console.warn('Invalid share URL ignored:', item.href);
                return; // Skip this element
            }
            
            a.href = shareHref;
            
            // Configure additional options if they exist
            if (item.target) {
                a.target = item.target;
            }
            
            /**
             * Adds popup window behavior for social sharing links
             * @type {boolean}
             */
            const isSocialShareLink = item.href.includes('facebook.com/sharer') || 
                                     item.href.includes('twitter.com/intent');
            
            if (item.display === 'popup' || isSocialShareLink) {
                a.target = '_blank';
                
                /**
                 * Click event handler to open a popup window for sharing
                 * @param {Event} e - The click event object
                 * @listens click
                 */
                a.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.open(this.href, 'sharePopup', 'width=600,height=400');
                });
            }
            
            a.appendChild(img);
            shareIconBox.appendChild(a);
        });
    }
}

/**
 * Loads and displays the banner logo from logo2 in the provided data
 * @param {Object} data - The JSON data containing logo2 information
 */
function loadBannerLogo(data) {
    if (data.logo2 && data.logo2.length > 0) {
        /**
         * The banner box container element
         * @type {HTMLElement}
         */
        const bannerBox = document.querySelector('.bannerBox');
        
        /**
         * The image element within the banner box
         * @type {HTMLImageElement}
         */
        const bannerImg = bannerBox.querySelector('img');
        
        /**
         * Logo2 data from the JSON
         * @type {Object}
         */
        const logoData = data.logo2[0];
        
        // Validate and sanitize the image URL
        const logoSrc = sanitizeUrl(logoData.image.src);
        if (logoSrc) {
            bannerImg.src = logoSrc;
            bannerImg.alt = sanitizeText(logoData.alt || 'Banner logo');
            
            if (logoData.image.width) bannerImg.width = logoData.image.width;
            if (logoData.image.height) bannerImg.height = logoData.image.height;
        } else {
            console.error('Invalid banner logo URL:', logoData.image.src);
        }
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