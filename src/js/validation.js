/**
 * validation.js - Validation module to complement app.js
 * Provides functions to validate data and user inputs
 */

/**
 * Validates if a URL is valid
 * @param {string} url - The URL to validate
 * @returns {boolean} True if the URL is valid, false otherwise
 */
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Validates if a string is a valid email
 * @param {string} email - The email to validate
 * @returns {boolean} True if the email is valid, false otherwise
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validates if a file is an image based on its extension
 * @param {string} filename - The filename to validate
 * @returns {boolean} True if the file is an image, false otherwise
 */
function isImageFile(filename) {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];
    const extension = filename.split('.').pop().toLowerCase();
    return imageExtensions.includes(extension);
}

/**
 * Validates if a file is an audio file based on its extension
 * @param {string} filename - The filename to validate
 * @returns {boolean} True if the file is an audio file, false otherwise
 */
function isAudioFile(filename) {
    const audioExtensions = ['mp3', 'wav', 'ogg', 'aac', 'm4a'];
    const extension = filename.split('.').pop().toLowerCase();
    return audioExtensions.includes(extension);
}

/**
 * Validates duration in "minutes:seconds" format
 * @param {string} duration - The duration in "mm:ss" format
 * @returns {boolean} True if the format is valid, false otherwise
 */
function isValidDuration(duration) {
    const durationRegex = /^([0-9]+):([0-5][0-9])$/;
    return durationRegex.test(duration);
}

/**
 * Converts duration in "mm:ss" format to milliseconds
 * @param {string} duration - The duration in "mm:ss" format
 * @returns {number} The duration in milliseconds
 */
function durationToMilliseconds(duration) {
    if (!isValidDuration(duration)) return 0;
    
    const parts = duration.split(':');
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    
    return (minutes * 60 + seconds) * 1000;
}

/**
 * Validates audio player data
 * @param {Object} audioData - Object with audio player data
 * @returns {Object} Object with validation results
 */
function validateAudioPlayer(audioData) {
    const results = {
        isValid: true,
        errors: []
    };
    
    if (!audioData) {
        results.isValid = false;
        results.errors.push('No audio data provided');
        return results;
    }
    
    if (!audioData.audioUrl) {
        results.isValid = false;
        results.errors.push('Audio URL not provided');
    } else if (!isValidUrl(audioData.audioUrl)) {
        results.isValid = false;
        results.errors.push('Invalid audio URL');
    } else if (!isAudioFile(audioData.audioUrl)) {
        results.isValid = false;
        results.errors.push('The file is not a recognized audio format');
    }
    
    return results;
}

/**
 * Validates social media data
 * @param {Array} socialItems - Array of objects with social media data
 * @returns {Object} Object with validation results
 */
function validateSocialItems(socialItems) {
    const results = {
        isValid: true,
        errors: []
    };
    
    if (!socialItems || !Array.isArray(socialItems)) {
        results.isValid = false;
        results.errors.push('No valid social items provided');
        return results;
    }
    
    socialItems.forEach((item, index) => {
        if (!item.href) {
            results.isValid = false;
            results.errors.push(`Social item ${index + 1} has no URL (href)`);
        } else if (!isValidUrl(item.href)) {
            results.isValid = false;
            results.errors.push(`Social item ${index + 1} has an invalid URL`);
        }
        
        if (!item.socialService) {
            results.isValid = false;
            results.errors.push(`Social item ${index + 1} has no defined social service`);
        }
    });
    
    return results;
}

/**
 * Validates share data
 * @param {Array} shareItems - Array of objects with share data
 * @returns {Object} Object with validation results
 */
function validateShareItems(shareItems) {
    const results = {
        isValid: true,
        errors: []
    };
    
    if (!shareItems || !Array.isArray(shareItems)) {
        results.isValid = false;
        results.errors.push('No valid share items provided');
        return results;
    }
    
    shareItems.forEach((item, index) => {
        if (item._template && item._template.includes('Facebook')) {
            if (!item.shareHref) {
                results.isValid = false;
                results.errors.push(`Facebook item ${index + 1} has no share URL`);
            } else if (!isValidUrl(item.shareHref)) {
                results.isValid = false;
                results.errors.push(`Facebook item ${index + 1} has an invalid URL`);
            }
        } else if (item._template && item._template.includes('Twitter')) {
            if (!item.url) {
                results.isValid = false;
                results.errors.push(`Twitter item ${index + 1} has no share URL`);
            } else if (!isValidUrl(item.url)) {
                results.isValid = false;
                results.errors.push(`Twitter item ${index + 1} has an invalid URL`);
            }
        }
    });
    
    return results;
}

/**
 * Validates JSON data with a more lenient approach
 * @param {Object} data - The JSON data to validate
 * @returns {Object} Object with validation results including warnings
 */
function validateJsonData(data) {
    const results = {
        isValid: true,
        errors: [],
        warnings: []
    };
    
    // Less strict validations to avoid complete blockages
    
    // For example, if there are issues with the audio player, only mark as a warning
    if (data.audioPlayer && data.audioPlayer.length > 0) {
        const audioValidation = validateAudioPlayer(data.audioPlayer[0]);
        if (!audioValidation.isValid) {
            // Instead of failing the entire JSON, just add as a warning
            results.warnings.push(...audioValidation.errors);
        }
    }
    
    // Same with social networks
    if (data.social && data.social.length > 0 && data.social[0].items) {
        const socialValidation = validateSocialItems(data.social[0].items);
        if (!socialValidation.isValid) {
            results.warnings.push(...socialValidation.errors);
        }
    }
    
    // And with share items
    if (data.actions && data.actions.length > 0 && data.actions[0].items) {
        const shareValidation = validateShareItems(data.actions[0].items);
        if (!shareValidation.isValid) {
            results.warnings.push(...shareValidation.errors);
        }
    }
    
    // Only mark as invalid if there are critical errors
    if (results.errors.length > 0) {
        results.isValid = false;
    }
    
    return results;
}

/**
 * Sanitizes a text string to prevent potential XSS attacks
 * @param {string} text - The text string to sanitize
 * @returns {string} The sanitized text string
 */
function sanitizeText(text) {
    if (!text) return '';
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Sanitizes a URL to prevent potential XSS attacks
 * @param {string} url - The URL to sanitize
 * @returns {string} The sanitized URL or an empty string if invalid
 */
function sanitizeUrl(url) {
    if (!url) return '';
    try {
        const validatedUrl = new URL(url);
        if (validatedUrl.protocol === 'http:' || validatedUrl.protocol === 'https:') {
            return validatedUrl.href;
        }
        return '';
    } catch (e) {
        return '';
    }
}

// Export all functions so they can be used in app.js
export {
    isValidUrl,
    isValidEmail,
    isImageFile,
    isAudioFile,
    isValidDuration,
    durationToMilliseconds,
    validateAudioPlayer,
    validateSocialItems,
    validateShareItems,
    validateJsonData,
    sanitizeText,
    sanitizeUrl
};