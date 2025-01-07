// ==UserScript==
// @name         9003 Roulette with Shredding Effect
// @version      1.6
// @description  Junks one random card with a shredding animation
// @author       9003
// @match        https://www.nationstates.net/*page=deck*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Sound effect URL
    const laserZapSound = "https://www.soundjay.com/button/sounds/button-11.mp3"; // Laser zap sound

    // Add CSS for shredding effect
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shred {
            0% { transform: scale(1) rotate(0); opacity: 1; }
            50% { transform: scale(0.5) rotate(15deg); opacity: 0.5; }
            100% { transform: scale(0) rotate(-30deg); opacity: 0; }
        }
        .shredding {
            animation: shred 1s ease-out forwards;
        }
    `;
    document.head.appendChild(style);

    // Play a sound
    function playSound(soundUrl) {
        const audio = new Audio(soundUrl);
        audio.play();
    }

    // Junk a random card with shredding effect
    function junkWithShredEffect(junkButtons) {
        if (junkButtons.length > 0) {
            const randomButton = junkButtons[Math.floor(Math.random() * junkButtons.length)];
            const cardElement = randomButton.closest('.deckcard'); // Get the parent card element

            if (cardElement) {
                // Add shredding effect
                cardElement.classList.add('shredding');
                playSound(laserZapSound); // Play zap sound

                // Wait for animation to complete before junking
                setTimeout(() => {
                    randomButton.dataset.rarity = "uncommon";
                    randomButton.click(); // Junk the card
                    console.log(`Junked card: ${randomButton.dataset.cardid}`);
                }, 1000); // Match the animation duration (1s)
            }
        } else {
            console.warn('No junk buttons found!');
        }
    }

    // Process junk buttons and run the junker
    function processJunkButtons() {
        const junkButtons = document.querySelectorAll(".deckcard .deckcard-junk-button");
        junkWithShredEffect(junkButtons); // Always junk one card
    }

    // Wait until the DOM is fully loaded
    window.addEventListener('load', () => {
        // Check if the "Tap cards to reveal..." text is present
        const revealText = Array.from(document.querySelectorAll('p, span, div'))
            .some(element => element.textContent.trim() === "Tap cards to reveal...");

        if (revealText) {
            console.log('"Tap cards to reveal..." text found. Running junker.');
            processJunkButtons(); // Run the junking process
        } else {
            console.log('"Tap cards to reveal..." text not found. Script will not run on this page.');
        }
    });
})();
