let hunger = 5;
let happiness = 7;
let cleanded = 0;
let pooped = 0;
let food = 2;
let poops = [];

updateDisplay()
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}



function feed() {
  if (hunger > 0 && food > 0) {
    hunger -= 1;
    food -= 1;
    updateDisplay();
  }
}

function play() {
  opem_game_modal()

}

function clean() {
  if (hunger < 7) {
    if (poops.length > 0) {
      cleanded++;
      document.getElementById(poops[poops.length - 1]).remove()
      poops.pop()

    }
    if (cleanded == 3) {
    happiness -= 1;
    cleanded = 0;
  } else if (cleanded == 2) {
    if (hunger >= 0 && 10 > hunger) {
      hunger++
    }
  }
  updateDisplay();}
}

document.getElementById("info").addEventListener("click", () => {
  openModal(`
    Willkommen zu deinem Tamagotchi! <br><br><br>
    Dein kleiner Begleiter hat einige Bedürfnisse, die du beachten solltest: <br><br>
    

    Sauberkeit:<br>
    Dein Tamagotchi macht alle 20 Sekunden Dreck. Um den Dreck zu beseitigen, musst du sicherstellen, dass sein Hungerlevel nicht mehr als 6 beträgt.
    <br><br>

    Hunger:<br>
    Dein Tamagotchi bekommt alle 60 Sekunden Hunger. Stelle sicher, dass du ihn rechtzeitig fütterst, damit er zufrieden bleibt.
    <br><br>

    Fütterung:<br>
    Du kannst deinen Tamagotchi mit Äpfeln füttern. Spiele, um Äpfel zu verdienen und deinem Tamagotchi eine leckere Mahlzeit zu geben.
    <br><br>

    Glücklichkeit:<br>
    Dein Tamagotchi wird alle 70 Sekunden unglücklicher. Spiele 45 Sekunden mit ihm um ihn glücklicher zu machen und sein Wohlbefinden zu verbessern.
    <br><br>
    Viel Spaß mit deinem Tamagotchi und vergiss nicht, dich gut um ihn zu kümmern!
    `
      
  
  )
})
function updateDisplay() {
    let hungerBar = document.getElementById("hunger-bar");
    let happinessBar = document.getElementById("happiness-bar");
  
    
    hungerBar.innerHTML = "";
    happinessBar.innerHTML = "";
  
    
    for (let i = 0; i < hunger; i++) {
      hungerBar.innerHTML += '<div class="pixel"></div>';
    }
  
    for (let i = 0; i < happiness; i++) {
      happinessBar.innerHTML += '<div class="pixel"></div>';
    }
  
    
    let status = 'Status: ';
    if (hunger > 7 || happiness < 3) {
      status += 'Unhappy';
      let tamagotchi_image = document.getElementById("tamagotchi-image")
      tamagotchi_image.src =  "http://127.0.0.1:5000/unhappy"

    } else if (hunger <= 3 || happiness > 7) {
      status += 'Happy';
      let tamagotchi_image = document.getElementById("tamagotchi-image")
      tamagotchi_image.src =  "http://127.0.0.1:5000/happy"

    } else {
      status += 'Neutral';
      let tamagotchi_image = document.getElementById("tamagotchi-image")
      tamagotchi_image.src =  "http://127.0.0.1:5000/normal"

    }
    document.getElementById('status').innerText = status;
    document.getElementById("food-count").innerHTML = food
  }


  function updateHappines() {
    happiness -= 1
    updateDisplay()
  }

  function updateHunger() {
    if (hunger < 10) {
      hunger++ 
      updateDisplay()
    }
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function place_poop() {
    let x = getRandomInt(window.innerWidth); 
    let y = getRandomInt(window.innerHeight); 
  

    let poop_div = document.createElement("div");
    poop_div.style.zIndex = -1;
    poop_div.id = poops.length + 1
    poop_div.style.position = "absolute"; 
    poop_div.style.top = y + 'px';
    poop_div.style.left = x + 'px';
  
    let poop_img = document.createElement("img");
    poop_img.src = "http://127.0.0.1:5000/poop";
    poop_img.style.transform = "scale(0.5)"
    poop_div.appendChild(poop_img);
  
    document.body.appendChild(poop_div); 
    poops.push(poop_div.id)

    pooped++;

    if (pooped == 2) {
      pooped = 0;
      happiness -= 1;
      updateDisplay()
    }
  }
  
  
  setInterval(place_poop, 20000)
  setInterval(updateHunger, 60000);
  setInterval(updateHappines, 70000);

  function openModal(content) {
    var modal = document.getElementById('myModal');
    modal.style.display = 'block';
    modal_text = document.getElementById("modal-text")
    modal_text.innerHTML = content
}

function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

let createAppleIntervalId;
let moveApplesDownIntervalId;
let startTime;

function opem_game_modal() {
  var modal = document.getElementById('gameModal');
  modal.style.display = 'block';

  
  createAppleIntervalId = setInterval(createApple, 2500);
  moveApplesDownIntervalId = setInterval(moveApplesDown, 1000);
  startTime = new Date()
}

function close_game_modal() {
  var modal = document.getElementById('gameModal');
  modal.style.display = 'none';



  clearInterval(createAppleIntervalId)
  clearInterval(moveApplesDownIntervalId)

  let endTime = new Date();
  let elapsedTime = endTime - startTime;

  let elapsedTimeSeconds = Math.floor(elapsedTime / 1000);

  let elapsedTimeMinutes = Math.floor(elapsedTimeSeconds / 30);
  
  if (elapsedTime > elapsedTimeMinutes) {

    happiness += elapsedTimeMinutes;
    updateDisplay();

  }

}


const character = document.getElementById('character');
const applesContainer = document.getElementById('apples');
const gameContainer = document.getElementById("game-container");

let apples = [];


function createApple() {
  const apple = document.createElement('div');
  apples.push(apple)
  apple.className = "apple"
  apple.innerHTML = '<img src="http://127.0.0.1:5000/apple" alt="Apfel">'

  const appleWidth = 102;  // Adjusted apple width
 

  x = getRandomInt(gameContainer.offsetWidth)

  apple.style.left = `${x}px`;
  apple.style.marginTop = "0 px"
  applesContainer.appendChild(apple);

}

const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

function moveApplesDown() {
  for (i = 0;i < apples.length; i++) {
    let marginTop = parseInt(apples[i].style.marginTop) || 0;
    apples[i].style.marginTop = marginTop + 50 + "px";

    if (checkCollision(character, apples[i])) {
      apples[i].remove();
      
      food++;
      updateDisplay()
   }

   if (!elementIsVisibleInViewport(apples[i])) {
    apples[i].remove()
   } 
 }
}

function moveCharacter(event) {
  const key = event.keyCode;
  const characterPosition = parseInt(window.getComputedStyle(character).left);

  

  if (key === 37 && characterPosition > 0) {
    character.style.left = `${characterPosition - 10}px`;
  } else if (key === 39 && characterPosition < gameContainer.offsetWidth) {
    character.style.left = `${characterPosition + 10}px`;
  }
}

document.addEventListener('keydown', moveCharacter);


function checkCollision(character, apple) {
  const characterRect = character.getBoundingClientRect();
  const appleRect = apple.getBoundingClientRect();

  return !(
    characterRect.right < appleRect.left ||
    characterRect.left > appleRect.right ||
    characterRect.bottom < appleRect.top ||
    characterRect.top > appleRect.bottom
  );
}

function ausbildungsstelleBekommen() {
  let element = document.getElementById("tamagotchi-container")
  element.scrollIntoView({behavior: "smooth"})
  hunger = 0;
  happiness = 10;
  updateDisplay()
  document.getElementById("status").innerHTML = "Status: Mega Happy"
  document.getElementById("tamagotchi-image").src = "http://127.0.0.1:5000/mega_happy"

 const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});

}