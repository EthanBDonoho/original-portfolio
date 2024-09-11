var cardList = [];
var sortedCardsList = [
    [[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[]]
]

var emptyCardsList = [
    [[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[]]
]

var deck = [];
var link = "";
var links = [];

sets();

document.getElementById("sets").onchange = changeListener;

var checks = document.querySelectorAll("input");
var max = 2;
for (var i = 0; i < checks.length; i++)
  checks[i].onclick = selectiveCheck;
function selectiveCheck (event) {
  var checkedChecks = document.querySelectorAll("input:checked");
  if (checkedChecks.length >= max + 1)
    return false;
}

function manaColors() {
    var isChecked = document.querySelectorAll("input");
    var selectedColors = [];
    if (link.length > 0) {
        for (i = 0; i < isChecked.length; i++) {
            if (isChecked[i].checked) {
                selectedColors.push(isChecked[i].id);
            }
        }
        if (selectedColors.length < 1) {
            console.log("please pick a color")
        }
        else if (selectedColors.length == 1) {
            generateDeck(selectedColors[0]);
        }
        else {
            console.log("More options being added");
            generateDeck(selectedColors);
        }
    }
    else {
        console.log("Please select a set");
    }
}

function colorChecker(colorvalues) {
    var values = []
    for (let i = 0; i < colorvalues.length; i++) {
        if (colorvalues[i] == 0) {
            values.push("G");
        }
        else if (colorvalues[i] == 1) {
            values.push("U");
        }
        else if (colorvalues[i] == 2) {
            values.push("R");
        }
        else if (colorvalues[i] == 3) {
            values.push("B");
        }
        else {
            values.push("W");
        }
    }
    return(values);
}


function changeListener() {
    var value = this.value
    link = value;
    if (link == "Pick a set") {
        console.log("Pick a set");
    }
    else {
        newDeck();
    }
}

function addBasicLands() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var txt = this.responseText;
        var obj = JSON.parse(txt);
        for (let i = 0; i < obj.data.length; i ++) {
            cardList.push(obj.data[i]);
        }
      }
    };
    xhttp.open("GET", 'https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3Appp1&unique=prints');
    xhttp.send();
}

function dualCards(type,colors) {
    var lands = [];
    var dualCreatures = [];
    var dualSpells = [];
    if (type == 0) {
        for (let i = 0; i < sortedCardsList[0][6].length; i++) {
            if ((sortedCardsList[0][6][i].color_identity.includes(colors[0]) && sortedCardsList[0][6][i].color_identity.includes(colors[1])) && (sortedCardsList[0][6][i].color_identity.length) == 2) {
                lands.push(sortedCardsList[0][6][i]);
            }
            else {
                console.log("mismatch");
            }
        }
        return(lands);
    }
    else if (type == 1) {
        for (let i = 0; i < sortedCardsList[1][6].length; i++) {
            if ((sortedCardsList[1][6][i].color_identity.includes(colors[0]) && sortedCardsList[1][6][i].color_identity.includes(colors[1])) && (sortedCardsList[1][6][i].color_identity.length) == 2) {
                dualCreatures.push(sortedCardsList[1][6][i]);
            }
            else {
                console.log("mismatch");
            }
        }
        return(dualCreatures);
    }
    else if (type == 2) {
        for (let i = 2; i < 4; i++) {
                for (let j = 0; j < sortedCardsList[i][6].length; j++) {
                    if ((sortedCardsList[i][6][j].color_identity.includes(colors[0]) && sortedCardsList[i][6][j].color_identity.includes(colors[1])) && (sortedCardsList[i][6][j].color_identity.length) == 2) {
                        dualSpells.push(sortedCardsList[i][6][j]);
                    }
                    else {
                        console.log("mismatch");
                    }
                }
                return(dualSpells);
                }
            }
        }

function sets() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var txt = this.responseText;
        var obj = JSON.parse(txt);
        var codes = [];
        for (let i = 0; codes.length < 10; i ++) {
            if (obj.data[i].card_count < 400) {
                console.log('Not enough cards');
            }
            else {
                codes.push(obj.data[i].name);
                links.push(obj.data[i].search_uri);
                
            }
        }
        for (let i = 0; i < links.length; i++) {
            document.getElementById("sets").innerHTML += '<option id = "' + codes[i] + '"' + 'value = "' + links[i] + '"'+ '>' + codes[i] + '</option>';
        }
      }
    };
    xhttp.open("GET", 'https://api.scryfall.com/sets');
    xhttp.send();
}

function newDeck() {
    cardList = [];
    if (sortedCardsList[2][2].length > 0) {
        clearDeck();
        addBasicLands();
        loadDoc();
    }
    else {
        addBasicLands();
        loadDoc();
    }
}

function clearDeck() {
    for (let i = 0; i < sortedCardsList.length; i ++) {
        console.log(i);
        for (let b = 0; b < sortedCardsList[i].length; b ++) {
            while (sortedCardsList[i][b].length > 0) {
                sortedCardsList[i][b].pop();
            }
        }
    }
}

function loadDoc() {
    console.log(link);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var txt = this.responseText;
        var obj = JSON.parse(txt);
        for (let i = 0; i < obj.data.length; i++) {
            if ('image_uris' in obj.data[i]) {
                cardList.push(obj.data[i]);
            }
            else {
                console.log('No picture available');
            }
}
if (obj.has_more == true) {
    link = obj.next_page;
    console.log("has more cards");
    loadDoc();
}
else {
    sortCards();
}
    }
  };
   xhttp.open("GET", link);
   xhttp.send();
  }

function sortCards() {
    for (let i = 0; i < cardList.length; i++) {
        var card = cardList[i];
        var cardType = cardTypes(card.type_line);
        var cardColor = cardColors(card.color_identity);
        sortedCardsList[cardType][cardColor].push(card);
    }
}

function cardTypes(typeLine) {
    if (typeLine.includes('Creature')) {
        return(1);
    }
    else if (typeLine.includes('Enchantment')) {
        return(2);
    }
    else if (typeLine.includes('Sorcery')) {
        return(3);
    }
    else if (typeLine.includes('Instant')) {
        return(4);
    }
    else if (typeLine.includes('Artifact')) {
        return(5);
    }
    else if (typeLine.includes('Land')) {
        return(0);
    }
    else {
        return(6);
    }
}

function cardColors(color) {
    if (color.length > 1) {
        return(6);
    }
    else if (color.length < 1) {
        return(5);
    }
    else if (color == 'G') {
        return(0);
    }
    else if (color == 'U') {
        return(1);
    }
    else if (color == 'R') {
        return(2);
    }
    else if (color == 'B') {
        return(3);
    }
    else if (color == 'W') {
        return(4);
    }
}

function generateDeck(color) {
    deck = [];
    const myNode = document.getElementById("demo");
    while (myNode.lastElementChild) {
      myNode.removeChild(myNode.lastElementChild);
    }
    landCards(color);
    creatureCards(color);
    spellCards(color);
    for (let i = 0; i < deck.length; i++) {
        constructingText = deck[i];
        document.getElementById("demo").innerHTML += "<img class = card src=" + deck[i].image_uris.large + ">";
    }
}

function landCards(color) {
    var lands = [];
    if (color.length == 1) {
        var basicLands = ['Plains','Island','Swamp','Mountain','Forest'];
        var max = sortedCardsList[0][color].length;
        var landID = [];
        var landName = [];
        var count = 0;
        while ((lands.length < 20) && (count < 200)) {
            count++;
            var randomNumber = Math.trunc(Math.random() * (max - 0) + 0);
            if (basicLands.includes(sortedCardsList[0][color][randomNumber].name)) {
                lands.push(sortedCardsList[0][color][randomNumber]);
            }
            else if (landID.includes(randomNumber) || landName.includes(sortedCardsList[0][color][randomNumber].name)) {
                console.log("Land already exists");
            }
            else {
                for (let i = (Math.trunc(Math.random() * (4-0) + 0)); i >= 0; i--) {
                    var newCard = sortedCardsList[0][color][randomNumber];
                    landID.push(randomNumber);
                    landName.push(newCard.name);
                    lands.push(newCard);
                    }
            }
        
        }
    }
    else {
        var dualMana = dualCards(0,colorChecker(color));
        var basicLands = ['Plains','Island','Swamp','Mountain','Forest'];
        var max = sortedCardsList[0][color[0]].length;
        var max2 = sortedCardsList[0][color[1]].length;
        var landID = [];
        var landName = [];
        var count = 0;
        if (dualMana.length < 1) {
            while ((lands.length < 10) && (count < 200)) {
                count++;
                var randomNumber = Math.trunc(Math.random() * (max - 0) + 0);
                if (basicLands.includes(sortedCardsList[0][color[0]][randomNumber].name)) {
                    lands.push(sortedCardsList[0][color[0]][randomNumber]);
                }
                else if (landID.includes(randomNumber) || landName.includes(sortedCardsList[0][color[0]][randomNumber].name)) {
                    console.log("Land already exists");
                }
                else {
                    for (let i = (Math.trunc(Math.random() * (4-0) + 0)); i >= 0; i--) {
                        var newCard = sortedCardsList[0][color[0]][randomNumber];
                        landID.push(randomNumber);
                        landName.push(newCard.name);
                        lands.push(newCard);
                        }
                }
            }
            while (((lands.length >= 10) && (count < 200)) && (lands.length < 20)) {
                count++;
                var randomNumber = Math.trunc(Math.random() * (max2 - 0) + 0);
                if (basicLands.includes(sortedCardsList[0][color[1]][randomNumber].name)) {
                    lands.push(sortedCardsList[0][color[1]][randomNumber]);
                }
                else if (landID.includes(randomNumber) || landName.includes(sortedCardsList[0][color[1]][randomNumber].name)) {
                    console.log("Land already exists");
                }
                else {
                    for (let i = (Math.trunc(Math.random() * (4-0) + 0)); i >= 0; i--) {
                        var newCard = sortedCardsList[0][color[1]][randomNumber];
                        landID.push(randomNumber);
                        landName.push(newCard.name);
                        lands.push(newCard);
                        }
                }
            }
        }
        else {
            var dualLandAmount = Math.trunc(Math.random() * (dualMana.length - 0) + 0);
            var dualLandsAdded = 0;
            while ((lands.length < 20) && (count < 200)) {
                count++;
                while (dualLandsAdded <= dualLandAmount) {
                    dualLandsAdded++;
                    for (let i = (Math.trunc(Math.random() * (4-0) + 0)); i >= 0; i--) {
                        var newCard = dualMana[dualLandsAdded];
                        lands.push(newCard);
                        }
                }
                if ((20 - lands.length) % 2) {
                    var landsNeeded = 20-lands.length;
                    var amountOfEach = landsNeeded / 2;
                    var totaladded = 0;
                    while (totaladded < amountOfEach) {
                        totaladded ++;
                        count++;
                        var randomNumber = Math.trunc(Math.random() * (max - 0) + 0);
                        if (basicLands.includes(sortedCardsList[0][color[0]][randomNumber].name)) {
                            lands.push(sortedCardsList[0][color[0]][randomNumber]);
                        }
                        else if (landID.includes(randomNumber) || landName.includes(sortedCardsList[0][color[0]][randomNumber].name)) {
                            console.log("Land already exists");
                        }
                        else {
                            for (let i = (Math.trunc(Math.random() * (4-0) + 0)); i >= 0; i--) {
                                var newCard = sortedCardsList[0][color[0]][randomNumber];
                                landID.push(randomNumber);
                                landName.push(newCard.name);
                                lands.push(newCard);
                                }
                        }
                    }
                    while ((totaladded >= amountOfEach) && (totaladded < landsNeeded)) {
                        totaladded ++;
                        count++;
                        var randomNumber = Math.trunc(Math.random() * (max2 - 0) + 0);
                        if (basicLands.includes(sortedCardsList[0][color[1]][randomNumber].name)) {
                            lands.push(sortedCardsList[0][color[1]][randomNumber]);
                        }
                        else if (landID.includes(randomNumber) || landName.includes(sortedCardsList[0][color[1]][randomNumber].name)) {
                            console.log("Land already exists");
                        }
                        else {
                            for (let i = (Math.trunc(Math.random() * (4-0) + 0)); i >= 0; i--) {
                                var newCard = sortedCardsList[0][color[1]][randomNumber];
                                landID.push(randomNumber);
                                landName.push(newCard.name);
                                lands.push(newCard);
                                }
                        }
                    }

                }
                else {
                    var landsNeeded = (20-lands.length) + 1;
                    var amountOfEach = landsNeeded / 2;
                    var totaladded = 0;
                    while (totaladded < amountOfEach) {
                        totaladded ++;
                        count++;
                        var randomNumber = Math.trunc(Math.random() * (max - 0) + 0);
                        if (basicLands.includes(sortedCardsList[0][color[0]][randomNumber].name)) {
                            lands.push(sortedCardsList[0][color[0]][randomNumber]);
                        }
                        else if (landID.includes(randomNumber) || landName.includes(sortedCardsList[0][color[0]][randomNumber].name)) {
                            console.log("Land already exists");
                        }
                        else {
                            for (let i = (Math.trunc(Math.random() * (4-0) + 0)); i >= 0; i--) {
                                var newCard = sortedCardsList[0][color[0]][randomNumber];
                                landID.push(randomNumber);
                                landName.push(newCard.name);
                                lands.push(newCard);
                                }
                        }
                    }
                    while ((totaladded >= amountOfEach) && (totaladded < landsNeeded)) {
                        totaladded ++;
                        count++;
                        var randomNumber = Math.trunc(Math.random() * (max2 - 0) + 0);
                        if (basicLands.includes(sortedCardsList[0][color[1]][randomNumber].name)) {
                            lands.push(sortedCardsList[0][color[1]][randomNumber]);
                        }
                        else if (landID.includes(randomNumber) || landName.includes(sortedCardsList[0][color[1]][randomNumber].name)) {
                            console.log("Land already exists");
                        }
                        else {
                            for (let i = (Math.trunc(Math.random() * (4-0) + 0)); i >= 0; i--) {
                                var newCard = sortedCardsList[0][color[1]][randomNumber];
                                landID.push(randomNumber);
                                landName.push(newCard.name);
                                lands.push(newCard);
                                }
                        }
                    }

                }

            }

        }
    }
    for (let i = 0; i < 20; i++) {
        deck.push(lands[i]);
    }
    return;
}

function creatureCards(color) {
    var creatures = [];
    if (color.length == 1) {
        var max = sortedCardsList[1][color].length;
        var previousRandomNumbers = [];
        var cardNames = [];
        var count = 0;
        while ((creatures.length < 25) && (count < 200)) {
            count++;
            var randomNumber = Math.trunc(Math.random() * (max - 0) + 0);
            if (sortedCardsList[1][color][randomNumber] == undefined) {
                console.log('No card exists');
            }
            else if (previousRandomNumbers.includes(randomNumber)) {
                console.log("Already in list");
            }
            else if (cardNames.includes(sortedCardsList[1][color][randomNumber].name)) {
                previousRandomNumbers.push(randomNumber);
                console.log("Variant in Deck");
            }
            else {
                for (let i = (Math.trunc(Math.random() * (4-0) + 0)); i >= 0; i--) {
                    var newCard = sortedCardsList[1][color][randomNumber];
                        previousRandomNumbers.push(randomNumber);
                        creatures.push(newCard);
                        cardNames.push(newCard.name);
                    }
                }
            }
        for (let i = 0; i < 25; i++) {
            deck.push(creatures[i]);
        }
        return;
    }
    else {
        var availableCreatures = [];
        var dualMana = dualCards(1,colorChecker(color));
        var previousRandomNumbers = [];
        var cardNames = [];
        var count = 0;

        for (let i = 0; i < dualMana.length; i++) {
            availableCreatures.push(dualMana[i]);
        }
        for (let i = 0; i < color.length; i++){
            for (let j = 0; j < sortedCardsList[1][color[i]].length; j++) {
                availableCreatures.push(sortedCardsList[1][color[i]][j]);
            }
        }
        var max = availableCreatures.length;
        while ((creatures.length < 25) && (count < 200)) {
            count++;
            var randomNumber = Math.trunc(Math.random() * (max - 0) + 0);
            if (availableCreatures[randomNumber] == undefined) {
                console.log('No card exists');
            }
            else if (previousRandomNumbers.includes(randomNumber)) {
                console.log("Already in list");
            }
            else if (cardNames.includes(availableCreatures[randomNumber].name)) {
                previousRandomNumbers.push(randomNumber);
                console.log("Variant in Deck");
            }
            else {
                for (let i = (Math.trunc(Math.random() * (4-0) + 0)); i >= 0; i--) {
                    var newCard = availableCreatures[randomNumber];
                        previousRandomNumbers.push(randomNumber);
                        creatures.push(newCard);
                        cardNames.push(newCard.name);
                    }
                }
            }
        for (let i = 0; i < 25; i++) {
            deck.push(creatures[i]);
        }
        return;
    }
}

function spellCards(color) {
    var possibleSpells =[];
    var spells = [];
    var previousCardName = [];
    var count = 0;
    var dualSpells = dualCards(2,colorChecker(color));
    for (let i = 1; i < dualSpells.length; i++) {
        possibleSpells.push(dualSpells[i]);
    }
    for (let i = 2; i < 4; i++) {
        for (let j = 0; j < color.length; j++) {
            for (let k = 0; k < sortedCardsList[i][color[j]].length; k++) {
                possibleSpells.push(sortedCardsList[i][color[j]][k]);
            }
        }
    }
    while ((spells.length < 15) && (count < 200)) {
        count++;
        var randomCard = Math.trunc(Math.random() * (possibleSpells.length - 0) + 0);
        if (possibleSpells[randomCard] == undefined) {
            console.log('No card exists');
        }
        else if (previousCardName.includes(possibleSpells[randomCard].name)) {
            console.log('Already in list');
        }
        else {
            for (let i = (Math.trunc(Math.random() * (4-0) + 0)); i >= 0; i--) {
                var card = (possibleSpells[randomCard]);
                previousCardName.push(card.name);
                spells.push(card);
                }
        }

    }
    for (let i = 0; i < 15; i++) {
        deck.push(spells[i]);
    }
}
