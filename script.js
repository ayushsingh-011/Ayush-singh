/* =========================================
   GOOGLE FORM
========================================= */

const GOOGLE_FORM_URL =
"https://docs.google.com/forms/d/e/1FAIpQLSdNNoOuLCcKQexCAQDE2a3D35ML1SmT5xyNuXTQ_a4lBhFzJA/formResponse";

const GOOGLE_ENTRY =
"entry.1419515186";


/* =========================================
   ELEMENTS
========================================= */

const screens =
document.querySelectorAll(".screen");

const $ = id =>
document.getElementById(id);


/* =========================================
   SCREEN SWITCH
========================================= */

function showScreen(id){

  screens.forEach(screen=>{
    screen.classList.remove("active");
  });

  const target = $(id);

  if(target){
    target.classList.add("active");
  }

}


/* =========================================
   GOOGLE FORM SUBMISSION
========================================= */

function submitAnswer(answer){

  const formData =
  new FormData();

  formData.append(
    GOOGLE_ENTRY,
    answer
  );

  fetch(
    GOOGLE_FORM_URL,
    {
      method:"POST",
      mode:"no-cors",
      body:formData
    }
  ).catch(()=>{
    console.log(
      "Response submission attempted."
    );
  });

}


/* =========================================
   CONFETTI
========================================= */

function createConfetti(amount){

  const container =
  $("confetti");

  if(!container) return;

  container.innerHTML="";

  const colors=[
    "#ff6fae",
    "#8d7cff",
    "#ffffff",
    "#ffd166",
    "#70e1f5"
  ];

  for(
    let i=0;
    i<amount;
    i++
  ){

    const piece =
    document.createElement("div");

    piece.className =
    "confetti-piece";

    piece.style.left =
    Math.random()*100+"%";

    piece.style.width =
    5+Math.random()*7+"px";

    piece.style.height =
    8+Math.random()*12+"px";

    piece.style.background =
    colors[
      Math.floor(
        Math.random()*colors.length
      )
    ];

    piece.style.setProperty(
      "--fall",
      2+Math.random()*2.5+"s"
    );

    piece.style.animationDelay =
    Math.random()*0.6+"s";

    container.appendChild(piece);

  }

}


/* =========================================
   INTRO
========================================= */

$("startBtn").addEventListener(
  "click",
  ()=>{

    showScreen("countdown");

    createConfetti(50);

    tryMusic();

  }
);


/* =========================================
   COUNTDOWN
========================================= */

function getBirthdayDate(){

  const now =
  new Date();

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

  if(now > target){

    target =
    new Date(
      year+1,
      7,
      24,
      0,
      0,
      0
    );

  }

  return target;

}


function updateCountdown(){

  const difference =
  Math.max(
    0,
    getBirthdayDate()-new Date()
  );

  const days =
  Math.floor(
    difference/
    (1000*60*60*24)
  );

  const hours =
  Math.floor(
    difference/
    (1000*60*60)
  )%24;

  const minutes =
  Math.floor(
    difference/
    (1000*60)
  )%60;

  const seconds =
  Math.floor(
    difference/1000
  )%60;


  $("days").textContent =
  String(days).padStart(2,"0");

  $("hours").textContent =
  String(hours).padStart(2,"0");

  $("minutes").textContent =
  String(minutes).padStart(2,"0");

  $("seconds").textContent =
  String(seconds).padStart(2,"0");

}

updateCountdown();

setInterval(
  updateCountdown,
  1000
);


/* =========================================
   COUNTDOWN → BIRTHDAY
========================================= */

$("countdownBtn").addEventListener(
  "click",
  ()=>{

    showScreen("birthday");

    createConfetti(80);

  }
);


/* =========================================
   BIRTHDAY → MESSAGE
========================================= */

$("birthdayBtn").addEventListener(
  "click",
  ()=>{

    showScreen("message");

    startTyping();

  }
);


/* =========================================
   TYPING MESSAGE
========================================= */

const personalMessage =
"Ragini, tumhare birthday par main kuch simple sa kehna chahta tha. Tum mere liye genuinely special ho, aur isi wajah se maine socha ki sirf ek normal birthday message bhejne ke bajay tumhare liye kuch alag banaya jaye. I hope this little surprise makes you smile. ❤️";

let typingStarted =
false;


function startTyping(){

  if(typingStarted)
  return;

  typingStarted=true;

  const element =
  $("typingText");

  let index=0;

  element.textContent="";

  const timer =
  setInterval(()=>{

    element.textContent +=
    personalMessage[index];

    index++;

    if(
      index >=
      personalMessage.length
    ){

      clearInterval(timer);

      $("messageBtn")
      .classList
      .remove("hidden");

    }

  },28);

}


/* =========================================
   MESSAGE → MEMORIES
========================================= */

$("messageBtn").addEventListener(
  "click",
  ()=>showScreen("memories")
);


/* =========================================
   MEMORIES → FINAL
========================================= */

$("memoriesBtn").addEventListener(
  "click",
  ()=>showScreen("finalMessage")
);


/* =========================================
   FINAL → QUESTION
========================================= */

$("questionBtn").addEventListener(
  "click",
  ()=>showScreen("proposal")
);


/* =========================================
   YES / MAYBE / NO
========================================= */

document
.querySelectorAll(".choice")
.forEach(button=>{

  button.addEventListener(
    "click",
    ()=>{

      const answer =
      button.dataset.answer;


      /* SEND TO GOOGLE FORM */

      submitAnswer(answer);


      /* SHOW STATUS */

      $("submitStatus")
      .textContent =
      "Response recorded ❤️";


      /* YES */

      if(
        answer ===
        "YES 💝"
      ){

        $("resultIcon")
        .textContent="❤️";

        $("resultTitle")
        .innerHTML =
        "A new chapter can start <span>here.</span>";

        $("resultMessage")
        .textContent =
        "Thank you for giving it a chance. And once again, Happy Birthday, Ragini! ✨";

        createConfetti(150);

      }


      /* MAYBE */

      else if(
        answer ===
        "Maybe 🙂"
      ){

        $("resultIcon")
        .textContent="✨";

        $("resultTitle")
        .innerHTML =
        "Take your time. <span>No pressure.</span>";

        $("resultMessage")
        .textContent =
        "Whatever you decide, I hope your birthday is genuinely wonderful. ❤️";

      }


      /* NO */

      else{

        $("resultIcon")
        .textContent="🌸";

        $("resultTitle")
        .innerHTML =
        "Thank you for being <span>honest.</span>";

        $("resultMessage")
        .textContent =
        "I respect your answer. I hope you have an amazing birthday and a wonderful year ahead. ❤️";

      }


      setTimeout(
        ()=>{
          showScreen("result");
        },
        350
      );

    }
  );

});


/* =========================================
   RESTART
========================================= */

$("restartBtn").addEventListener(
  "click",
  ()=>{

    typingStarted=false;

    $("typingText")
    .textContent="";

    $("messageBtn")
    .classList
    .add("hidden");

    showScreen("intro");

  }
);


/* =========================================
   STARS
========================================= */

const stars =
$("stars");

for(
  let i=0;
  i<100;
  i++
){

  const star =
  document.createElement("div");

  star.className="star";

  star.style.left =
  Math.random()*100+"%";

  star.style.top =
  Math.random()*100+"%";

  star.style.setProperty(
    "--duration",
    2+Math.random()*4+"s"
  );

  star.style.animationDelay =
  Math.random()*4+"s";

  stars.appendChild(star);

}


/* =========================================
   MUSIC
========================================= */

const music =
$("bgMusic");

const musicBtn =
$("musicBtn");

let musicPlaying=false;


function tryMusic(){

  if(!music)
  return;

  music.volume=.2;

  music.play()
  .then(()=>{

    musicPlaying=true;

    musicBtn.textContent="♫";

  })
  .catch(()=>{

    musicPlaying=false;

  });

}


musicBtn.addEventListener(
  "click",
  ()=>{

    if(musicPlaying){

      music.pause();

      musicPlaying=false;

      musicBtn.textContent="♪";

    }

    else{

      tryMusic();

    }

  }
);
