function start(){
    const livesShow = document.getElementById('mylives');
    const showcatagory = document.getElementById('catagoryName');
    const getHint = document.getElementById('hint');
    const showClue = document.getElementById('clue');
    const wordholder = document.getElementById('hold');
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
                    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
                     't', 'u', 'v', 'w', 'x', 'y', 'z'];

    const categories =[
        ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
        ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
        ["manchester", "milan", "madrid", "amsterdam", "prague"]
    ];
    const hints = [
        ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
        ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
        ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
    ];
    var chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    var words = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    var word = words.replace(/\s/g, "-");
    var guesses = [ ];
    var lives= 10;
    var counter=0;
    var space= 0;



    var selectCat = function(){
        if (chosenCategory === categories[0]) {
      catagoryName.innerHTML = "The Chosen Category Is Premier League Football Teams";
        }
        else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "The Chosen Category Is Films";
        } 
        else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "The Chosen Category Is Cities";
        }
    }
    selectCat();
    // Create guess ul
    var result = function() {
        var guess;
        var word = words.replace(/\s/g, "-");
        var correct =document.createElement('ul');
        correct.setAttribute('id','my-word');
        wordholder.appendChild(correct);
        for(var i = 0; i < word.length; i++) {
            guess = document.createElement('li');
            guess.setAttribute('class', 'guess');
            if (word[i] === "-") {
                guess.innerHTML = "-";
                space = 1;
            } else {
                guess.innerHTML = "_";
            }
            guesses.push(guess);
            correct.appendChild(guess);
        }
        
    }
    result();
    // Create alphabet ul 
    var buttons = function() {
        var mybuttons = document.getElementById('buttons');
        var letters = document.createElement('ul');
        letters.setAttribute('id','alphabet');

        for(var i = 0; i < alphabet.length; i++) {
            var list = document.createElement('li');
            list.setAttribute('id','letter');
            list.innerHTML = alphabet[i];
            mybuttons.appendChild(letters);
            letters.appendChild(list);
            list.onclick=function(){
                var guess = (this.innerHTML);
                this.setAttribute("class", "active");
                this.onclick = null;
                this.style.removeProperty('cursor');
                console.log(guess);
                for (var i = 0; i < word.length; i++) {
                    if (word[i] === guess) {
                    guesses[i].innerHTML = guess;
                    counter += 1;
                    } 
                }
                var j = (word.indexOf(guess));
                if (j === -1) {
                    lives -= 1;
                    comments();
                } else {
                    comments();
                }
            }
        }
    }
    buttons();
    var comments =function(){
        livesShow.innerHTML = "You have " + lives + " lives";
         if (lives < 1) {
            livesShow.innerHTML = "Game Over";
        }
        for (var i = 0; i < guesses.length; i++) {
        if (counter + space === guesses.length) {
            livesShow.innerHTML = "You Win!";
        }
        }
    }
    comments();
    getHint.onclick = function() {
        var catagoryIndex = categories.indexOf(chosenCategory);
        var hintIndex = chosenCategory.indexOf(word);
        showClue.innerHTML = "Clue: - " +  hints [catagoryIndex][hintIndex];
        console.log(words);
        }
    document.getElementById('reset').onclick = function() {
        start();
        showcatagory.innerText ="";
        document.getElementById('alphabet').remove();
        document.getElementById('my-word').remove();
        selectCat();
        showClue.innerHTML = "Clue -";
  }
}

start();