var win = 0;
var loose = 0 ; 

window.onload = function () {

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
  
  var categories;         // Array of topics
  var chosenCategory;     // Selected catagory
  var getHint ;          // Word getHint
  var word ;              // Selected word
  var guess ;             // Geuss
  var geusses = [ ];      // Stored geusses
  var lives ;             // Lives
  var counter ;           // Count correct geusses
  var space;              // Number of spaces in word '-'
  

  // Get elements
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("catagoryName");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");
  var seeImage = document.getElementById("myImage");
  var playAudio = document.getElementById("myAudio");
  var winGame = document.getElementById("wincount");
  var looseGame = document.getElementById("loosecount");
           


  // create alphabet ul ----------------------------------------------------------------------------

  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
    
  }
// Select Catagory ----------------------------------------------------------------------------
var selectCat = function () {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML = "The  Category Is cartoons characters";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "The Category Is Dianasours";
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "The Category Is Cars";
    }
  }
// Create geusses ul ----------------------------------------------------------------------------
result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }
// Show lives ----------------------------------------------------------------------------
comments = function () {
    showLives.innerHTML = "You have   " +   lives   + "     lives";
    if (lives < 1) {
      showLives.innerHTML = "Game Over "  + "<br>"+ "<br>" +  "Correct answer is  :    " + word;
      playAudio.setAttribute("src","assets/mp3/next.wav");
      resetMe();
      loose++;
      looseGame.innerHTML=loose;
      }
     for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = "You Win!"  + "<br>" + "<br>"+ word ;
        showPicture();
        listenAudio();
        resetMe();
        win++;
        winGame.innerHTML=win;
    
      }
    }
  }

// Animate man ----------------------------------------------------------------------------

  var animate = function () {
    var drawMe = lives ;
    drawArray[drawMe]();
  }

  
  // Hangman ----------------------------------------------------------------------------
canvas =  function(){

    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = 'blue';
    context.lineWidth = 5;
  };
  
    head = function(){
      myStickman = document.getElementById("stickman");
      context = myStickman.getContext('2d');
      context.beginPath();
      context.arc(60, 25, 10, 0, Math.PI*2, true);
      context.stroke();
    }
    
  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke(); 
  }

   frame1 = function() {
     draw (0, 150, 150, 150);
   };
   
   frame2 = function() {
     draw (10, 0, 10, 600);
   };
  
   frame3 = function() {
     draw (0, 5, 70, 5);
   };
  
   frame4 = function() {
     draw (60, 5, 60, 15);
   };
  
   torso = function() {
     draw (60, 36, 60, 70);
   };
  
   rightArm = function() {
     draw (60, 46, 100, 50);
   };
  
   leftArm = function() {
     draw (60, 46, 20, 50);
   };
  
   rightLeg = function() {
     draw (60, 70, 100, 100);
   };
  
   leftLeg = function() {
     draw (60, 70, 20, 100);
   };
  
  drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1]; 


  // OnClick Function ----------------------------------------------------------------------------
check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        } 
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
        } else {
        comments();
        }
    }
  }
  // start Game ----------------------------------------------------------------------------
startGame = function () {
    categories = [
        ["pocoyo", "peppa pig", "caillou", "paw-patrol"],
        ["tyrannosaurus-rex", "diplodocus", "triceratops", "troodon", "megalosaurus"],
        ["mater", "sally", "guido", "fillmore", "flo" ,"lightning-mcqueen"]
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();
    geusses = [ ];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
    canvas();
  }
  startGame();
//  show Answer Image ----------------------------------------------------------------------------
 var listOfImages =[
            ["assets/images/pocoyo.jpg", "assets/images/pocoyo.jpg", "assets/images/caillou.jpg",
            "assets/images/pawpatrol.jpg"],

            ["assets/images/trex.png","assets/images/Diplodocus.png","assets/images/triceratops.png",
            "assets/images/troodon.png","assets/images/Megalosaurus.png"],

            ["assets/images/mater.jpg","assets/images/SallyCarreraCars2.jpg","assets/images/guido.jpg",
            "assets/images/fillmore.jpg","assets/images/flo.jpg","assets/images/mcaqueen.png"]
    ]; 
    function showPicture()  {      
    var catagoryIndex = categories.indexOf(chosenCategory);
    var imageIndex = chosenCategory.indexOf(word);
    seeImage.src = listOfImages[catagoryIndex][imageIndex];
    }

// for audio ----------------------------------------------------------------------------
      var listOfAudio =[
            ["assets/mp3/Pocoyo.mp3", "assets/mp3/peppa.mp3", "assets/mp3/Caillou.mp3",
            "assets/mp3/paw.mp3"],

            ["assets/mp3/trex.mp3","assets/mp3/diplodocus.mp3","assets/mp3/Trice.mp3",
            "assets/mp3/troodon.mp3","assets/mp3/Megal.mp3"],

            ["assets/mp3/Mater.mp3","assets/mp3/music.mp3","assets/mp3/music.mp3",
            "assets/mp3/music.mp3","assets/mp3/Cars.mp3","assets/mp3/McQueen.mp3"]
        ]; 
    function listenAudio()  {      
     var catagoryIndex = categories.indexOf(chosenCategory);
    var audioIndex = chosenCategory.indexOf(word);
    playAudio.setAttribute("src", listOfAudio[catagoryIndex][audioIndex]);
    playAudio.play();
   }

  // Hint ----------------------------------------------------------------------------
    hint.onclick = function() {

      hints = [
        ["Spanish pre-school comedy animated television series ", "adventures of the titular, anthropomorphic animal along with her family and friends", "Aimed at the toddler and pre-school set",  "A group of six rescue..."],
        ["is a genus of coelurosaurian theropod dinosaur ", "whose fossils were first discovered in 1877 by S. W. Williston", " is a genus of herbivorous ceratopsid dinosaur ", "a dubious genus of relatively small, bird-like dinosaurs", "a genus of large meat-eating theropod dinosaurs "],
        ["best friend ", "girlfriend car", "assistant", "wife of Remone car", "race car"]
    ];

    var catagoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML += hints [catagoryIndex][hintIndex];
    };


   // Reset ------------------------------------------------------------------------------
    resetMe = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    startGame();
    }
}