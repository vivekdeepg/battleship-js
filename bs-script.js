var randomLoc = Math.floor(Math.random() * 5);
var location1 = randomLoc;
var location2 = location1++;
var location3 = location2++;

var hits = 0;
var guess = 0;
var guesses = 0;
var isSunk = false;

while (isSunk == false) {
  guess = prompt("Please enter a number between 0 and 6");
  if (guess<0 || guess>6) {
    alert("The number has to be between 0-6");
  }
  else {
    guesses++;
  }
  if(guess == location1 || guess == location2 || guess == location3) {
    hits++;
    if (hits == 3){
      alert("You sank the ship");
      isSunk = true;
    }
  }
}

var stats = "You took " + guesses + " guesses to hit my ship. Your accuracy is " + 3/guesses;
alert(stats);



