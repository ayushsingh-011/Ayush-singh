/* =========================================
   RAGINI WEBSITE — FINAL SCRIPT
========================================= */


/* =========================================
   SCREEN ELEMENTS
========================================= */

const screens = document.querySelectorAll(".screen");

const intro = document.getElementById("intro");
const countdown = document.getElementById("countdown");
const birthday = document.getElementById("birthday");
const message = document.getElementById("message");
const memories = document.getElementById("memories");
const finalMessage = document.getElementById("finalMessage");
const proposal = document.getElementById("proposal");
const result = document.getElementById("result");


/* =========================================
   BUTTONS
========================================= */

const startBtn = document.getElementById("startBtn");
const countdownBtn = document.getElementById("countdownBtn");
const birthdayBtn = document.getElementById("birthdayBtn");
const messageBtn = document.getElementById("messageBtn");
const memoriesBtn = document.getElementById("memoriesBtn");
const questionBtn = document.getElementById("questionBtn");

const yesBtn = document.getElementById("yesBtn");
const maybeBtn = document.getElementById("maybeBtn");
const noBtn = document.getElementById("noBtn");

const restartBtn = document.getElementById("restartBtn");

const resultIcon = document.getElementById("resultIcon");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");

const confetti = document.getElementById("confetti");


/* =========================================
   GOOGLE FORM
========================================= */

const GOOGLE_FORM_URL =
"https://docs.google.com/forms/d/e/1FAIpQLSdNNoOuLCcKQexCAQDE2a3D35ML1SmT5xyNuXTQ_a4lBhFzJA/formResponse";

const GOOGLE_ENTRY =
"entry.1419515186";


/* =========================================
   SEND ANSWER TO GOOGLE FORM
========================================= */

function submitAnswer(answer) {

    const formData = new FormData();

    formData.append(
        GOOGLE_ENTRY,
        answer
    );

    fetch(GOOGLE_FORM_URL, {

        method: "POST",

        mode: "no-cors",

        body: formData

    })
    .then(() => {

        console.log(
            "Response submitted:",
            answer
        );

    })
    .catch(error => {

        console.log(
            "Submission attempted:",
            error
        );

    });

}


/* =========================================
   SCREEN SWITCH
========================================= */

function showScreen(screen) {

    screens.forEach(item => {

        item.classList.remove("active");

    });

    if (screen) {

        screen.classList.add("active");

    }

}


/* =========================================
   STARS
========================================= */

const starsContainer =
document.getElementById("stars");

if (starsContainer) {

    for (let i = 0; i < 100; i++) {

        const star =
        document.createElement("div");

        star.className = "star";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.setProperty(
            "--duration",
            2 + Math.random() * 4 + "s"
        );

        star.style.animationDelay =
            Math.random() * 4 + "s";

        starsContainer.appendChild(star);

    }

}


/* =========================================
   INTRO
========================================= */

if (startBtn) {

    startBtn.addEventListener(
        "click",
        () => {

            showScreen(countdown);

            createConfetti(40);

            tryMusic();

        }
    );

}


/* =========================================
   MUSIC
========================================= */

const musicBtn =
document.getElementById("musicBtn");

const bgMusic =
document.getElementById("bgMusic");

let musicPlaying = false;


function tryMusic() {

    if (!bgMusic) return;

    bgMusic.volume = 0.2;

    bgMusic.play()
    .then(() => {

        musicPlaying = true;

        if (musicBtn) {
            musicBtn.textContent = "♫";
        }

    })
    .catch(() => {

        musicPlaying = false;

    });

}


if (musicBtn && bgMusic) {

    musicBtn.addEventListener(
        "click",
        () => {

            if (musicPlaying) {

                bgMusic.pause();

                musicPlaying = false;

                musicBtn.textContent = "♪";

            } else {

                bgMusic.volume = 0.2;

                bgMusic.play()
                .then(() => {

                    musicPlaying = true;

                    musicBtn.textContent =
                        "♫";

                })
                .catch(() => {});

            }

        }
    );

}


/* =========================================
   COUNTDOWN
========================================= */

function getBirthdayDate() {

    const now = new Date();

    let year =
        now.getFullYear();

    let target =
        new Date(
            year,
            7,
            24,
            0,
            0,
            0
        );

    if (now >= target) {

        target =
            new Date(
                year + 1,
                7,
                24,
                0,
                0,
                0
            );

    }

    return target;

}


function updateCountdown() {

    const target =
        getBirthdayDate();

    const now =
        new Date();

    let difference =
        target.getTime() -
        now.getTime();

    if (difference < 0) {
        difference = 0;
    }

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (difference /
            (1000 * 60 * 60)) % 24
        );

    const minutes =
        Math.floor(
            (difference /
            (1000 * 60)) % 60
        );

    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    const daysEl =
        document.getElementById("days");

    const hoursEl =
        document.getElementById("hours");

    const minutesEl =
        document.getElementById("minutes");

    const secondsEl =
        document.getElementById("seconds");


    if (daysEl)
        daysEl.textContent =
            String(days).padStart(2, "0");

    if (hoursEl)
        hoursEl.textContent =
            String(hours).padStart(2, "0");

    if (minutesEl)
        minutesEl.textContent =
            String(minutes).padStart(2, "0");

    if (secondsEl)
        secondsEl.textContent =
            String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =========================================
   COUNTDOWN → BIRTHDAY
========================================= */

if (countdownBtn) {

    countdownBtn.addEventListener(
        "click",
        () => {

            showScreen(birthday);

            createConfetti(80);

        }
    );

}


/* =========================================
   BIRTHDAY → MESSAGE
========================================= */

if (birthdayBtn) {

    birthdayBtn.addEventListener(
        "click",
        () => {

            showScreen(message);

            startTyping();

        }
    );

}


/* =========================================
   TYPING
========================================= */

const personalMessage =
"Ragini, tumhare birthday par main kuch simple sa kehna chahta tha. Tum mere liye genuinely special ho, aur isi wajah se maine socha ki sirf ek normal birthday message bhejne ke bajay tumhare liye kuch alag banaya jaye. I hope this little surprise makes you smile. ❤️";

let typingStarted = false;


function startTyping() {

    if (typingStarted) return;

    typingStarted = true;

    const typingText =
        document.getElementById(
            "typingText"
        );

    if (!typingText) return;

    let index = 0;

    typingText.textContent = "";

    const interval =
        setInterval(() => {

            typingText.textContent +=
                personalMessage[index];

            index++;

            if (
                index >=
                personalMessage.length
            ) {

                clearInterval(interval);

                if (messageBtn) {

                    messageBtn.classList.remove(
                        "hidden"
                    );

                }

            }

        }, 28);

}


/* =========================================
   MESSAGE → MEMORIES
========================================= */

if (messageBtn) {

    messageBtn.addEventListener(
        "click",
        () => {

            showScreen(memories);

        }
    );

}


/* =========================================
   MEMORIES → FINAL
========================================= */

if (memoriesBtn) {

    memoriesBtn.addEventListener(
        "click",
        () => {

            showScreen(finalMessage);

        }
    );

}


/* =========================================
   FINAL → QUESTION
========================================= */

if (questionBtn) {

    questionBtn.addEventListener(
        "click",
        () => {

            showScreen(proposal);

        }
    );

}


/* =========================================
   YES
========================================= */

if (yesBtn) {

    yesBtn.addEventListener(
        "click",
        () => {

            submitAnswer("YES 💝");

            createConfetti(160);

            showResult(
                "❤️",
                "I'm really glad you said <span>yes.</span>",
                "Thank you for being honest with me. Happy Birthday, Ragini! ✨"
            );

        }
    );

}


/* =========================================
   MAYBE
========================================= */

if (maybeBtn) {

    maybeBtn.addEventListener(
        "click",
        () => {

            submitAnswer("Maybe 🙂");

            showResult(
                "✨",
                "Take your time. <span>No pressure.</span>",
                "Whatever you decide, I hope your birthday is genuinely wonderful. ❤️"
            );

        }
    );

}


/* =========================================
   NO
========================================= */

if (noBtn) {

    noBtn.addEventListener(
        "click",
        () => {

            submitAnswer("NO");

            showResult(
                "🌸",
                "Thank you for being <span>honest.</span>",
                "I respect your answer. I hope you have an amazing birthday and a wonderful year ahead. ❤️"
            );

        }
    );

}


/* =========================================
   RESULT
========================================= */

function showResult(
    icon,
    title,
    messageText
) {

    if (resultIcon) {

        resultIcon.textContent =
            icon;

    }

    if (resultTitle) {

        resultTitle.innerHTML =
            title;

    }

    if (resultMessage) {

        resultMessage.textContent =
            messageText;

    }

    setTimeout(() => {

        showScreen(result);

    }, 300);

}


/* =========================================
   RESTART
========================================= */

if (restartBtn) {

    restartBtn.addEventListener(
        "click",
        () => {

            typingStarted = false;

            if (messageBtn) {

                messageBtn.classList.add(
                    "hidden"
                );

            }

            showScreen(intro);

        }
    );

}


/* =========================================
   CONFETTI
========================================= */

function createConfetti(amount) {

    if (!confetti) return;

    confetti.innerHTML = "";

    const colors = [
        "#ff6fae",
        "#9277ff",
        "#ffffff",
        "#ffd166",
        "#70e1f5"
    ];

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const piece =
            document.createElement("div");

        piece.className =
            "confetti-piece";

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.width =
            5 + Math.random() * 7 + "px";

        piece.style.height =
            8 + Math.random() * 12 + "px";

        piece.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

        piece.style.opacity =
            .6 +
            Math.random() * .4;

        piece.style.setProperty(
            "--fall-time",
            2 +
            Math.random() * 2.5 +
            "s"
        );

        piece.style.animationDelay =
            Math.random() * .7 + "s";

        confetti.appendChild(piece);

    }

}
