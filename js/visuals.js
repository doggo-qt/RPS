export { fight, getRandom, randomize,images };
import { modalRoot } from "./win.js";
const radioButtons = document.getElementsByName("choice");
const userChoiceImage = document.querySelector(".user-choice");
const enemyChoiceImage = document.querySelector(".enemy-choice");
const images = ["images/rock.jpg", "images/paper.jpg", "images/scissors.jpg"];
const modalHeader = document.querySelector(".modal__header");
const content = document.querySelector(".modal__content");
const modalFooter = document.querySelector(".modal__footer");

// Gets the user choice
function getUserChoice() {
  let choice;
  let temp;
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      choice = i;
      temp = radioButtons[i].value;
      break;
    }
  }
  // console.log("user", temp, choice);
  return choice;
}

// Gets the enemy choice when the fight button was clicked
function getEnemyChoice() {
  const enemyCaption = document.querySelector(".enemy-caption");
  // gets a random choice from the radio buttons
  const choice = getRandom(radioButtons);
  enemyChoiceImage.src = images[choice];
  enemyCaption.innerHTML = radioButtons[choice].value;
  // console.log("enemy", radioButtons[choice].value, choice);
  return choice;
}

function getRandom(array) {
  return Math.floor(Math.random() * array.length);
}

// randomize the enemy choice images
function randomize() {
  const rng = images[getRandom(images)];
  enemyChoiceImage.src = rng;
}

function setUserImage() {
  radioButtons.forEach((radio) =>
    radio.addEventListener("click", () => {
      if (radio.value === "Rock") userChoiceImage.src = "images/rock.jpg";
      else if (radio.value === "Paper")
        userChoiceImage.src = "images/paper.jpg";
      else userChoiceImage.src = "images/scissors.jpg";
    })
  );
}

setUserImage();

const userScore = document.querySelector(".user-score");
const enemyScore = document.querySelector(".enemy-score");
const draw = document.querySelector(".draw");

/*
  ROCK- 0 - 1
  PAPER- 1 -  2
  SCISSOR - 2 - 3
*/

// logic for checking who wins
function fight() {
  const user = getUserChoice();
  const enemy = getEnemyChoice();

  if (user === enemy) {
    draw.innerHTML = parseInt(draw.textContent) + 1;
    resultModal("DRAW!!!");
    // console.log("draw");
  }
  /* used modulo to stay at 1-3 only 
       so if it is equals to the enemy's choice, enemy will win because we just add 1 
       to make the condition easy and we dont need to use '>', '<' and make longer if else
      
       e.g 
        user ROCK = 0 (cause of +1 and modulo is now 1)
        enemy PAPER = 1
        so panalo paper dito kase originally mas mataas value niya sa rock
       
       e.g
        user ROCK = 0 (cause of +1 and modulo is now 1)
        enemy SCISSOR = 2
        so mas malaki dito scissor but panalo dapat rock
        kaya sa else na punta nito 
       */
  // basta pag nag equal ang values panalo enemy pota
  else if ((user + 1) % 3 === enemy) {
    enemyScore.innerHTML = parseInt(enemyScore.textContent) + 1;
    resultModal("ENEMY WINS!!!");
    // console.log("enemy-wins");
  } else {
    userScore.innerHTML = parseInt(userScore.textContent) + 1;
    resultModal("YOU WIN!!!");
    // console.log("user-wins");
  }

  if (userScore.textContent == 10) {
    endModal("YOU WIN");
    resetPoints();
  } else if (enemyScore.textContent == 10) {
    endModal("YOU LOSE");
    resetPoints();
  }
}

// toggles when the user/enemy reaches 10 points
function endModal(winOrLose) {
  modalHeader.innerHTML = winOrLose;
  content.innerHTML = "Thank you for playing!";
  modalFooter.innerHTML = "-Jiseeeh";
  modalRoot.classList.add("visible");
}

// toggles every round
function resultModal(message) {
  modalHeader.innerHTML = "";
  modalFooter.innerHTML = "";
  content.classList.add("center");
  content.innerHTML = message;
  modalRoot.classList.toggle("visible");
}

// resets the points after the player/enemy reaches 10 points
function resetPoints() {
  enemyScore.textContent = 0;
  userScore.textContent = 0;
  draw.textContent = 0;
}
