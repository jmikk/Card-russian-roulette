// ==UserScript==
// @name         9003 Roulette 1/6
// @version      1.2
// @description  Junks one random card every time you open a pack of cards
// @author       9003
// @match        https://www.nationstates.net/*page=deck*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Sound effect URL
    const laserZapSound = "https://www.soundjay.com/button/sounds/button-11.mp3"; // Laser zap sound

    // Play a sound
    function playSound(soundUrl) {
        const audio = new Audio(soundUrl);
        audio.play();
    }

    // Junk a random card
    function clickRandomJunkButton(junkButtons) {
        if (junkButtons.length > 0) {
            const randomButton = junkButtons[Math.floor(Math.random() * junkButtons.length)];
            playSound(laserZapSound); // Play zap sound
            randomButton.dataset.rarity = "uncommon";
            randomButton.click(); // Junk the card
        } else {
            console.warn('No junk buttons found!');
        }
    }

    // Remove confirmation and process junk buttons
    function processJunkButtons() {
        const junkButtons = [];
        document.querySelectorAll(".deckcard").forEach((card) => {
            const junkButton = card.querySelector(".deckcard-junk-button");
            if (junkButton) {
                junkButtons.push(junkButton); // Collect all junk buttons
            }
        });

        // Junk a random card if buttons are available
        if (junkButtons.length > 0) {
            clickRandomJunkButton(junkButtons);
        } else {
            console.warn('No junk buttons found on the page.');
        }
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
