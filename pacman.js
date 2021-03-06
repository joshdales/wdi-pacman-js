'use strict';
// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;
var dots = 240;
var ghostsEaten = 0;
var level = 1;
var random = randomNum(1, dots);
var fruit = {
  'name': 'Cherry',
  'score': 100,
  'eaten': true,
  'disable': false
}

// Define fruits
function defineFruit(level) {
  var fruit;
  if (level === 2) {
    fruit = {
    'name': 'Strawberry',
    'score': 300,}
  } else if (level === 3 || level === 4) {
    fruit = {
    'name': 'Orange',
    'score': 500,}
  } else if (level === 5 || level === 6) {
    fruit = {
    'name': 'Apple',
    'score': 700,}
  } else if (level === 7 || level === 8) {
      fruit = {
      'name': 'Pineapple',
      'score': 1000,}
  } else if (level === 9 || level === 10) {
      fruit = {
      'name': 'Galaxian Spaceship',
      'score': 2000,}
  } else if (level === 11 || level === 12) {
      fruit = {
      'name': 'Bell',
      'score': 3000,}
  } else if (level > 12) {
      fruit = {
      'name': 'Key',
      'score': 5000,}
  }
  fruit.eaten = true;
  fruit.disable = false;
  return fruit
};

// Define your ghosts here
var inky = {
  'menuOption': 1,
  'name': 'Inky',
  'colour': 'Red',
  'character': 'Shadow',
  'edible': false
};

var blinky = {
  'menuOption': 2,
  'name': 'Blinky',
  'colour': 'Cyan',
  'character': 'Speedy',
  'edible': false
};

var pinky = {
  'menuOption': 3,
  'name': 'Pinky',
  'colour': 'Pink',
  'character': 'Bashful',
  'edible': false
};

var clyde = {
  'menuOption': 4,
  'name': 'Clyde',
  'colour': 'Orange',
  'character': 'Pokey',
  'edible': false
};

// replace this comment with your four ghosts setup as objects
var ghosts = [inky, blinky, pinky, clyde];

function edibility(ghost){
  if (ghost.edible === true){
    return 'edible';
  } else {
    return 'inedible';
  }
}


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + '\nPower-Pellets: ' + powerPellets + '\n\nLevel: ' + level);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if (fruit.eaten === false && fruit.disable === false) {
    console.log('(f) Eat ' + fruit.name);
  }
  if (dots > 10) {
    console.log('(x) Eat 10 Dots');
  }
  if (dots > 100) {
    console.log('(c) Eat 100 Dots');
  }
  console.log('(v) Eat Remaing Dots');
  if (powerPellets > 0 && eatingPellets()){
    console.log('(p) Eat Power-Pellet');
  }
  ghosts.forEach(function(ghost){
    console.log('(' + ghost.menuOption + ') Eat ' + ghost.name + ' (' + edibility(ghost) + ')');
  })
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}

// Menu Options
function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}

function resetFruit(numDots, randomNum) {
  if (numDots < randomNum) {
    return fruit.eaten = false;
}};

function eatDot() {
  if (dots > 0) {
  console.log('\nChomp!');
  score += 10;
  dots -= 1;
  resetFruit(dots, random);
  levelComplete();
  }
}

function eat10Dots() {
  if (dots > 0) {
  console.log('\nChomp! Chomp!');
  score += 100;
  dots -= 10;
  resetFruit(dots, random);
  levelComplete();
  }
}

function eat100Dots() {
  if (dots > 0) {
  console.log('\nChomp! Chomp! Chomp! Chomp!')
  score += 1000;
  dots -= 100;
  resetFruit(dots, random);
  levelComplete();
  }
}

function eatRemainingDots() {
  if (dots > 0) {
  console.log('\nChomp! Chomp! Chomp! Chomp! Chomp! Chomp! Chomp! Chomp! Chomp!')
  score += (dots * 10);
  dots = 0;
  resetFruit(dots, random);
  levelComplete();
  }
}

function eatPowerPellet() {
  if (eatingPellets()) {
  console.log('\nChomp!');
  score += 50;
  ghosts.forEach(function(ghost) {
    ghost.edible = true;
    setTimeout(function() {
      ghost.edible = false
    }, 10000);
  })
  powerPellets -= 1;
  levelComplete();
}};

function checkEditble(ghost) {
  return ghost.edible === false;
}

function eatingPellets() {
 return ghosts.every(checkEditble);
}

function eatFruit() {
  console.log('\nChomp!');
  score += fruit.score;
  fruit.eaten = true;
  fruit.disable = true;
}

// Eating the ghosts
function eatGhost(ghost) {
  if (ghost.edible){
    console.log('\nPac-Man ate the ' + ghost.character + ' ghost, ' + ghost.name);
    if (ghostsEaten === 0) {
      score += 200;
    } else if (ghostsEaten === 2) {
      score += 400;
    } else if (ghostsEaten === 3) {
      score += 800;
    } else if (ghostsEaten >= 4) {
      score += 1600;
    }
    ghost.edible = false
  } else {
    console.log('\nPac-Man was killed by the ' + ghost.colour + ' ghost, ' + ghost.name);
    lives -= 1;
    gameOver();
  }
}

// check for Game Over
function gameOver() {
  if (lives < 0) {
    saveScore();
    process.exit();
  }
}

function saveScore(){
  const fs = require('fs');
  fs.writeFile(score+".score", "okwedone", (err) => {
    // throws an error, you could also catch it here
    console.log('data saved!');
    if (err) throw err;

    // success case, the file was saved
});
};


// check for level completion
function levelComplete() {
  console.log(fruit);
  if (dots === 0 && powerPellets === 0){
    gameComplete();
    dots = 240;
    powerPellets = 4;
    level += 1;
    random = randomNum(10, dots);
    fruit = defineFruit(level);
    ghosts.forEach(function(ghost) {
      ghost.edible = false;
    })
  }
}

function gameComplete () {
  if (level > 256) {
    console.log("Congrats you have compeleted the game!");
    gameOver();
  }
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':

      process.exit();
      break;
    case 'd':
      eatDot();
      resetFruit(dots, random);
      break;
    case 'f':
      if (fruit.eaten === false && fruit.disable === false) {
        eatFruit();
      } else {
        console.log(fruit.name + ' already eaten!');
      }
      break;
    case 'x':
      if (dots >= 10) {
      eat10Dots();
    } else {
      console.log('\nThere arent that many dots left!');
    }
      break;
    case 'c':
      if (dots >= 100) {
      eat100Dots();
    } else {
      console.log('\nThere arent that many dots left!');
    }
      break;
    case 'v':
      eatRemainingDots();
      break;
    case 'p':
      if (powerPellets > 0) {
        eatPowerPellet();
      } else {
        console.log('\nThere are no Power-Pellets left!');
      }
      break;
    case '1':
      eatGhost(inky)
      break;
    case '2':
      eatGhost(blinky)
      break;
    case '3':
      eatGhost(pinky)
      break;
    case '4':
      eatGhost(clyde)
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
