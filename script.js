const VOICE_RATE = 1;
const VOICE_PITCH = 1;
const BACKEND_URL = "https://chatbot-api-proxy-nine.vercel.app/api/chat"; 

const cards = [
    "Alle links von der gezogenen Karte müssen 2 mal TRINKWORT.",
    "Aufzählung! Wählt ein beliebiges Thema und beginnt die Aufzählung. Der Verlierer muss TRINKWORT.",
    "Regel! Stell eine Regel auf, die für alle gilt. Wer dagegen verstößt, muss TRINKWORT.",
    "Quizmaster! Der jüngste Spieler ist Quizmaster. Falsche Antwort = TRINKWORT.",
    "Packe deinen Koffer! Startet ein Mini-Spiel; der Verlierer muss TRINKWORT.",
    "(Kein) Lappen! Alle ohne Führerschein müssen 2 mal TRINKWORT.",
    "Daumenkönig! Lege deinen Daumen unauffällig auf den Tisch. Der Langsamste muss TRINKWORT.",
    "ADEL! Alle müssen eine Person siezen. Fehler = TRINKWORT.",
    "Privat! Zeige die letzten drei Bilder in deiner Galerie oder TRINKWORT 3 mal.",
    "Urlaub! Du bist im Urlaub und musst dich an keine Regeln halten.",
    "Teenies! Alle unter 20 Jahren müssen TRINKWORT.",
    "Spielkönig! Der Geräte-Besitzer darf 3 mal TRINKWORT verteilen.",
    "TRINKWORT! Alle müssen ein mal TRINKWORT.",
    "Weihnachten! Verschenke 3 mal TRINKWORT.",
    "Großverdiener! Meistes Bargeld = 2 mal TRINKWORT.",
    "Große Liebe! Wähle ein Paar, das Händchen halten muss. Sonst TRINKWORT.",
    "KO-Tropfen! Wähle einen Drink eines Mitspielers und trinke 2 mal davon.",
    "Alle rechts von der gezogenen Karte müssen TRINKWORT.",
    "Schnelles Geld! Wer zuerst 1€ auf den Tisch legt, verteilt 3 mal TRINKWORT.",
    "Ernst! Wer zuerst lacht, muss TRINKWORT.",
    "Rentner! Älteste Person muss 2 mal TRINKWORT.",
    "Testo! Alle Männer müssen TRINKWORT.",
    "Medusa! Niemand darf dir in die Augen schauen. Fehler = TRINKWORT.",
    "Déjà-vu! Wer zuletzt trinken musste, trinkt nochmal.",
    "Reimmeister! Reihum reimen. Verlierer muss 2 mal TRINKWORT.",
    "Zahl! Ruft eine Zahl (1-5). Gleiche Zahlen = TRINKWORT.",
    "Blinzelduell! Verlierer muss TRINKWORT.",
    "Trink-Bro! Wähle einen Partner. Er trinkt, wenn du trinkst.",
    "Schneck! Vollstes Glas muss 2 mal TRINKWORT.",
    "Putzfee! Tisch aufräumen oder 2 mal TRINKWORT.",
    "Klassenclown! Erzähle einen Witz. Lacht keiner = TRINKWORT.",
    "Goldene Hochzeit! Längste Beziehung muss TRINKWORT.",
    "Anonym! Keiner darf Namen nennen. Fehler = TRINKWORT.",
    "Breaking News! Letzte WhatsApp vorlesen oder 3 mal TRINKWORT.",
    "Demokratie! Abstimmung auf eine Person. Die muss 2 mal TRINKWORT.",
    "Eiszeit! Einfrieren. Langsamster = 2 mal TRINKWORT.",
    "Freitag, der 13.! Zählt bis 13. Der 13. muss TRINKWORT.",
    "Arschkarte! Du musst 2 mal TRINKWORT.",
    "Reste weg! Leerstes Glas muss exen.",
    "Geschenke! Verteile Geschenke oder 3 mal TRINKWORT.",
    "Oldtimer! Ältestes Auto = TRINKWORT.",
    "Tierfreund! Haustier-Besitzer = TRINKWORT.",
    "Storytime! Wahr oder Falsch. Falsch geraten = 2 mal TRINKWORT.",
    "Opas! Alle über 30 müssen TRINKWORT.",
    "Frauen! Alle Frauen müssen TRINKWORT.",
    "Singles! Alle Singles müssen TRINKWORT.",
    "CBA! Alphabet rückwärts. Fehler = TRINKWORT.",
    "Saufbirne! Wer am meisten getrunken hat, muss 2 mal TRINKWORT.",
    "Schlafnase! Nüchternste Person muss 3 mal TRINKWORT.",
    "Zu hören! Ans Ohr fassen. Langsamster 2 mal TRINKWORT.",
    "Schnick, Schnack, Schnuck! Verlierer muss 2 mal TRINKWORT.",
    "Spätzünder! Alle Jungfrauen müssen 2 mal TRINKWORT.",
    "Hotel Mama! Wer zu Hause wohnt, 2 mal TRINKWORT.",
    "Akademiker! Studenten/Absolventen 2 mal TRINKWORT.",
    "Versaut! Höchster Bodycount muss 2 mal TRINKWORT.",
    "Durstig! Längste Sex-Flaute muss 2 mal TRINKWORT.",
    "Freibier! Wer Bier trinkt, 2 mal TRINKWORT.",
    "Das Auto! VW Fahrer 2 mal TRINKWORT.",
    "Runter! 10 Liegestütze oder 3 mal TRINKWORT.",
    "Erfolgsfan! Bayern-Fans TRINKWORT.",
    "Höhepunkt! Letzter Orgasmus? Sag es oder 2 mal TRINKWORT.",
    "Playboy! Wer hatte heute Sex? Die Gruppe wählt -> TRINKWORT.",
    "Wahrheit! Nacktbild bekommen? Sag von wem oder TRINKWORT.",
    "Wahrheit! Nacktbild verschickt? Sag an wen oder TRINKWORT.",
    "Kamasutra! Stellung darstellen. Errater verteilt 2 mal TRINKWORT.",
    "Bondage light! Eine Bewegung verboten. Verstoß = 2 mal TRINKWORT."
];

const gameNames = ["Allgemein Wichsen!", "Verpennst du den Song?", "Alles oder Wichs!"];

let lastCardIndex = -1;
let lastGameIndex = -1;
let isFlipped = false;
let replaceWord = "applaudieren";
let minigameCooldown = 0;
let minigameActive = true;

// --- DOM ELEMENTE ---
const cardElement = document.getElementById('card');
const textFront = document.getElementById('text-front');
const textBack = document.getElementById('text-back');
const drawCardBtn = document.getElementById('draw-card-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeMenuBtn = document.getElementById('close-menu-btn');
const menuOverlay = document.getElementById('menu-overlay');
const replaceInput = document.getElementById('replace-input');
const saveWordBtn = document.getElementById('save-word-btn');
const minigameCheckbox = document.getElementById("minigame-active");
const minigameModal = document.getElementById('minigame-modal');
const minigameTitle = document.getElementById('minigame-title');
const minigameDesc = document.getElementById('minigame-desc');
const minigameBody = document.getElementById('minigame-body');
const minigameFeedback = document.getElementById('minigame-feedback');
const closeMinigameBtn = document.getElementById('close-minigame-btn');

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    if(minigameCheckbox) {
        minigameCheckbox.checked = true;
        minigameActive = true;
    }
});

minigameCheckbox.addEventListener('change', (e) => {
    minigameActive = e.target.checked;
});

// --- SETTINGS ---
function toggleSettings() {
    const isOpen = settingsModal.classList.contains('open');
    if (isOpen) {
        settingsModal.classList.remove('open');
        menuOverlay.classList.remove('visible');
    } else {
        settingsModal.classList.add('open');
        menuOverlay.classList.add('visible');
        replaceInput.focus();
    }
}
settingsBtn.addEventListener('click', toggleSettings);
closeMenuBtn.addEventListener('click', toggleSettings);
menuOverlay.addEventListener('click', () => {
    settingsModal.classList.remove('open');
    minigameModal.classList.remove('open');
    menuOverlay.classList.remove('visible');
    drawCardBtn.disabled = false;
    drawCardBtn.classList.remove('cooldown');
});
saveWordBtn.addEventListener('click', () => {
    const val = replaceInput.value.trim();
    replaceWord = val !== "" ? val : "applaudieren";
    const oldText = saveWordBtn.textContent;
    saveWordBtn.textContent = "Gespeichert!";
    setTimeout(() => {
        saveWordBtn.textContent = oldText;
        toggleSettings();
    }, 600);
});

// --- AUDIO ---
function playEpicVoice(text) {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = VOICE_RATE;
    utterance.pitch = VOICE_PITCH;

    const voices = speechSynthesis.getVoices();
    const preferredNames = ["Anna","Amelie","Lena","Markus","Yannick","Claudia","Sebastian","Alex"];
    let bestVoice = voices.find(v => preferredNames.some(name => v.name.includes(name) && v.lang.startsWith("de")));
    if (!bestVoice) bestVoice = voices.find(v => v.lang.startsWith("de"));
    if (!bestVoice && voices.length > 0) bestVoice = voices[0];
    if (bestVoice) utterance.voice = bestVoice;

    speechSynthesis.speak(utterance);
}

// --- CARDS ---
function getNewCardText() {
    if (cards.length === 0) return "Keine Karten mehr!";
    let newIndex;
    do { newIndex = Math.floor(Math.random() * cards.length); } 
    while (newIndex === lastCardIndex && cards.length > 1);
    lastCardIndex = newIndex;
    return cards[newIndex].replace(/TRINKWORT/gi, replaceWord);
}

// --- API ---
async function callChatBot(prompt) {
    try {
        const response = await fetch(BACKEND_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: [{ role: "user", content: prompt }] })
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        return data.reply || "Fehler";
    } catch (e) {
        return "Fehler beim Laden: " + e.message;
    }
}

// --- MINIGAME ---
function closeMinigame() {
    minigameModal.classList.remove('open');
    menuOverlay.classList.remove('visible');
    drawCardBtn.disabled = false;
    drawCardBtn.classList.remove('cooldown');
}
closeMinigameBtn.addEventListener('click', closeMinigame);

async function startMinigame(index) {
    minigameModal.classList.add('open');
    menuOverlay.classList.add('visible');
    minigameFeedback.textContent = "";
    minigameFeedback.className = "feedback-text";
    minigameBody.innerHTML = '<div class="loader"></div>';

    const setupSubmit = (question, checkPromptFn) => {
        const inputField = document.getElementById('minigame-input');
        const submitBtn = document.getElementById('minigame-submit-btn');
        setTimeout(() => inputField.focus(), 100);

        submitBtn.onclick = async () => {
            if (submitBtn.disabled) return;
            const userAnswer = inputField.value.trim();
            if (!userAnswer) return;

            submitBtn.disabled = true;
            submitBtn.textContent = "Prüfe...";
            inputField.disabled = true;

            let result = await callChatBot(checkPromptFn(question, userAnswer));
            result = result.replace(/TRINKWORT/g, replaceWord);
            minigameFeedback.textContent = result;
            minigameFeedback.classList.toggle('win', result.toLowerCase().includes("richtig"));
            minigameFeedback.classList.toggle('lose', !result.toLowerCase().includes("richtig"));
            submitBtn.textContent = "Fertig";
            playEpicVoice(result);
        };
    };

    if (index === 0) {
        // --- Allgemein Wichsen ---
        minigameTitle.textContent = "Allgemein Wichsen!";
        minigameDesc.textContent = "Beantwortet diese Frage gemeinsam!";
        const question = (await callChatBot("Stelle eine knackige Allgemeinwissensfrage (Mittel bis Schwer).")).replace(/^"|"$/g, '');
        minigameBody.innerHTML = `<div class="question-text">${question}</div>
            <input type="text" id="minigame-input" placeholder="Antwort..." autocomplete="off">
            <button id="minigame-submit-btn" class="action-btn">Senden</button>`;
        playEpicVoice(`Allgemein Wichsen! Beantwortet die Frage gemeinsam. ${question}`);
        setupSubmit(question, (q, a) => `Frage: "${q}". Antwort: "${a}". Richtig? Wenn ja: "Richtig!", sonst: "Falsch! TRINKWORT"`);
    } else if (index === 1) {
        // --- Verpennst du den Song ---
        minigameTitle.textContent = "Verpennst du den Song?";
        minigameDesc.textContent = "Versucht gemeinsam den Songtitel zu erraten.";
        const lyrics = (await callChatBot("Zitiere 1-2 Zeilen aus einem bekannten Song (ohne Titel).")).replace(/^"|"$/g, '');
        minigameBody.innerHTML = `<div class="question-text" style="font-style: italic;">"${lyrics}"</div>
            <input type="text" id="minigame-input" placeholder="Songtitel..." autocomplete="off">
            <button id="minigame-submit-btn" class="action-btn">Senden</button>`;
        playEpicVoice(`Verpennst du den Song? Ratet den Songtitel. Zitat: ${lyrics}`);
        setupSubmit(lyrics, (q, a) => `Zitat: "${q}". Titel: "${a}". Richtig? Wenn ja: "Richtig!", sonst: "Falsch! TRINKWORT"`);
    } else if (index === 2) {
        // --- Alles oder Wichs (Glücksrad) ---
        minigameTitle.textContent = "Alles oder Wichs!";
        minigameDesc.textContent = "Setze Schlücke und drehe das Rad beliebig oft!";
        let currentBet = 1;
        let totalRotation = 0;

        const getWinChance = (bet) => 65 - (bet * 5);
        playEpicVoice("Alles oder Wichs! Setze deine Schlücke weise. Pink gewinnt, Weiß verliert.");

        minigameBody.innerHTML = `
            <div class="wheel-container">
                <div class="wheel-pointer"></div>
                <div id="wheel" class="wheel"></div>
            </div>
            <div class="bet-controls">
                <button id="bet-minus" class="bet-btn-small">-</button>
                <div id="bet-display" class="bet-display">1</div>
                <button id="bet-plus" class="bet-btn-small">+</button>
            </div>
            <p style="font-size:0.9em;color:#666;margin-bottom:10px;">
                Gewinnchance: <span id="win-chance-display">60</span>%
            </p>
            <button id="spin-btn" class="action-btn">Drehen!</button>
        `;

        const wheel = document.getElementById('wheel');
        const betDisplay = document.getElementById('bet-display');
        const chanceDisplay = document.getElementById('win-chance-display');
        const btnMinus = document.getElementById('bet-minus');
        const btnPlus = document.getElementById('bet-plus');
        const spinBtn = document.getElementById('spin-btn');

        const updateWheelVisuals = () => {
            const winPercent = getWinChance(currentBet);
            betDisplay.textContent = currentBet;
            chanceDisplay.textContent = winPercent;
            wheel.style.background = `conic-gradient(#BA68C8 0% ${winPercent}%, #fff ${winPercent}% 100%)`;
        };

        btnMinus.onclick = () => { if(currentBet>1){currentBet--;updateWheelVisuals();} };
        btnPlus.onclick = () => { if(currentBet<5){currentBet++;updateWheelVisuals();} };

        spinBtn.onclick = () => {
            if(spinBtn.disabled) return;
            spinBtn.disabled = true;
            btnMinus.disabled = true;
            btnPlus.disabled = true;
            minigameFeedback.textContent = "Das Rad dreht sich...";
            minigameFeedback.className = "feedback-text";

            const winChance = getWinChance(currentBet);
            const isWin = Math.random()*100<winChance;
            const winAngleMax = (winChance/100)*360;
            let targetDegree = isWin ? Math.floor(Math.random()*(winAngleMax-20))+10
                                     : Math.floor(Math.random()*(360-winAngleMax-20))+winAngleMax+10;

            const spins = 5*360;
            totalRotation += spins + (360-targetDegree);
            wheel.style.transform = `rotate(${totalRotation}deg)`;

            setTimeout(()=>{
                minigameFeedback.textContent = isWin ? 
                    `Glück gehabt! Du darfst ${currentBet} mal ${replaceWord} verteilen.` :
                    `Verloren! Du musst ${currentBet} mal ${replaceWord}!`;
                minigameFeedback.className = "feedback-text "+(isWin?"win":"lose");
                playEpicVoice(minigameFeedback.textContent);

                spinBtn.textContent = "Erneut drehen!";
                spinBtn.disabled = false;
                btnMinus.disabled = false;
                btnPlus.disabled = false;
            }, 4100);
        };

        updateWheelVisuals();
    }
}

// --- MAIN LOOP ---
function drawNewCard() {
    if(minigameActive && minigameCooldown<=0){
        minigameCooldown = 5;
        let newGameIndex;
        do { newGameIndex = Math.floor(Math.random() * gameNames.length); } 
        while(newGameIndex===lastGameIndex && gameNames.length>1);
        lastGameIndex=newGameIndex;
        startMinigame(newGameIndex);
        return;
    }
    minigameCooldown--;

    drawCardBtn.disabled = true;
    drawCardBtn.classList.add('cooldown');

    const newText = getNewCardText();
    playEpicVoice(newText);

    if(!isFlipped){
        textBack.textContent = newText;
        cardElement.classList.add('flipped');
        isFlipped=true;
    } else {
        textFront.textContent = newText;
        cardElement.classList.remove('flipped');
        isFlipped=false;
    }

    setTimeout(()=>{
        if(!minigameModal.classList.contains('open')){
            drawCardBtn.disabled=false;
            drawCardBtn.classList.remove('cooldown');
        }
    },10000);
}

drawCardBtn.addEventListener('click', drawNewCard);