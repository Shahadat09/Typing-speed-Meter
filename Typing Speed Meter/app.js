// Selecting elements
const typingText = document.querySelector('.text-of-typing p');
const inputField = document.querySelector('.input-field');
const errorTag = document.querySelector('.errors span');
const timeTag = document.querySelector('.time span');
const wpmTag = document.querySelector('.wpm span');
const cpmTag = document.querySelector('.cpm span');
const button = document.querySelector('button');

// Variables
let characterIndex = 0;
let errors = 0;
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let isTyping = false;

// Function to generate a random paragraph
function randomParagraph() {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);

    typingText.innerHTML = paragraphs[randomIndex]
        .split('')
        .map(char => `<span>${char}</span>`)
        .join('');

    typingText.querySelector('span:first-child').classList.add('active');
}

// Function to initialize typing
function initTyping() {
    const characters = typingText.querySelectorAll('span');
    const typedCharacter = inputField.value.charAt(characterIndex);

    if (characterIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if (typedCharacter === characters[characterIndex].innerText) {
            characters[characterIndex].classList.add('correct');
        } else {
            errors++;
            characters[characterIndex].classList.add('incorrect');
        }

        characters.forEach(span => span.classList.remove('active'));
        characters[characterIndex].classList.add('active');

        errorTag.innerText = errors;

        cpmTag.innerText = characterIndex - errors;

        const wpm = Math.round((((characterIndex - errors) / 5) / (maxTime - timeLeft)) * 60) || 0;
        wpmTag.innerText = wpm;
        characterIndex++;
    } else {
        inputField.value = '';
        clearInterval(timer);
    }
}

// Function to initialize the timer
function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
        showThankYou();
    }
}

// Function to reset the game
function resetGame() {
    randomParagraph();
    inputField.value = '';
    clearInterval(timer);
    timeLeft = maxTime;
    characterIndex = 0;
    errors = 0;
    isTyping = false;
    timeTag.innerText = timeLeft;
    errorTag.innerText = errors;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

// Function to show a thank you message
function showThankYou() {
    alert('Thank you for completing the Typing Test!');
    resetGame();
}

// Event listeners
inputField.addEventListener('input', initTyping);
button.addEventListener('click', resetGame);

// Initial setup
randomParagraph();
