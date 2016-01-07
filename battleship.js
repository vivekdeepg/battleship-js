var view = {
  displayMessage: function(msg) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  
  displayHit: function(loc) {
    var cell = document.getElementById(loc);
    cell.setAttribute("class", "hit");
  },
  
  displayMiss: function(loc) {
    var cell = document.getElementById(loc);
    cell.setAttribute("class", "miss");
  }
};


var model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,
  
  /*ships: [ { locations: ["10", "20", "30"], hits: ["", "", ""] },
           { locations: ["32", "33", "34"], hits: ["", "", ""] },
           { locations: ["63", "64", "65"], hits: ["", "", "hit"] }],*/

  ships: [ { locations: ["00", "00", "00"], hits: ["", "", ""] },
           { locations: ["00", "00", "00"], hits: ["", "", ""] },
           { locations: ["00", "00", "00"], hits: ["", "", ""] }
         ],
  
  generateShipLocations: function() {
    var locations;
    for(var i=0; i<this.numShips; i++){ 
      do {
        locations = this.generateShip();
        //debugger;
      } while (this.collision(locations));
      this.ships[i].locations = locations;
    } 
		console.log("Ships array: ");
		console.log(this.ships);
  },

  generateShip: function() {
//    console.log("generate ship is being called");
    var direction = Math.floor(Math.random() * 2);
    var row, col;
    var newShipLocations = [];

    if (direction === 1) {
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
    }
    else {
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
      col = Math.floor(Math.random() * this.boardSize);
    }
    // debugger;
    for( var i=0; i<this.shipLength; i++) {
      if(direction === 1){
        newShipLocations.push(row + "" + (col+i));
      }
      else {
        newShipLocations.push((row+i) + "" + col);
      }
    }
    console.log(this.newShipLocations);
    //debugger;
    return newShipLocations;
  },

  collision: function(locations) {
    //debugger;
    for(var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      for(var j = 0; j < locations.length; j++) {
        if(ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  },

  fire: function(guess) {
    for(var i = 0; i< this.numShips; i++) {
      var ship = this.ships[i];
      /*var locations = ship.locations; */
      var index = ship.locations.indexOf(guess);
      if (index >=0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("You scored a hit!");
        if (this.isSunk(ship)) {
          this.shipsSunk++;
          view.displayMessage("You sank a ship!");
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("You missed!");
    return false;
  },

  isSunk: function(ship) {
    for(var i=0; i<this.numShips; i++) {
      if(ship.hits[i] !== "hit"){
        return false;
      }
    }
    return true;
  }
};

var controller = {
  guesses: 0,

  parseGuess: function(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

    if(guess === null || guess.length !== 2) {
      alert("You need to enter a valid number")
    }
    else {
      var firstChar = guess.charAt(0);
      var row = alphabet.indexOf(firstChar);
      var column = guess.charAt(1);

      if (isNaN(row) || isNaN(column)) {
        alert("Sorry this is not on the board");
      }
      else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
        alert("Thats outside the board limit");
      }
      else {
        return row + column;
      }
    }
    return null;
  },

  processGuess: function(guess) {
    var loc = this.parseGuess(guess);
    if(loc) {
      this.guesses++;
      var hit = model.fire(loc);
      if(hit && model.shipsSunk === model.numShips) {
        view.displayMessage("You have sunk all the ships in" + this.guesses + "tries");
      }
    }
  }
};


function handleFireButton() {
  var guessInput = document.getElementById("guessInput");
  controller.processGuess(guessInput.value);
  guessInput.value = "";
}

function handleKeyPress(e) {
  var fireButton = document.getElementById("fireButton");
  if (e.keyCode == 13) {
    fireButton.click();
    return false;
  }
}

window.onload = init;

function init() {
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  
  var guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleKeyPress;
  model.generateShipLocations();
}



/*controller.processGuess("A0");
controller.processGuess("A6");
controller.processGuess("B6");
controller.processGuess("C6");
controller.processGuess("C4");
controller.processGuess("D4");
controller.processGuess("E4");
controller.processGuess("B0");
controller.processGuess("B1");
controller.processGuess("B2");*/


/*view.displayMiss("00");
view.displayHit("34");
view.displayMiss("55");
view.displayHit("12");
view.displayMiss("25");
view.displayHit("26");
view.displayMessage("Tap tap, is this thing on?");*/


/*model.fire("53");
model.fire("06");
model.fire("16");
model.fire("26");
model.fire("34");
model.fire("24");
model.fire("44");
model.fire("12");
model.fire("11");
model.fire("10");*/
