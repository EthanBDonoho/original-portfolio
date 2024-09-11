// Array for type effectiveness

var typeRelations = [
  [['none'],['rock','steel'],[ 'ghost' ],[ 'none' ],[ 'fighting' ],['ghost']],
  [['grass','ice','bug','steel'],['fire','water','rock','dragon'],['none'],['fire','grass','ice','steel','fairy'],['water','ground','rock'],[ 'none' ]],
  [['water','ground'],['fire','grass','poison','flying','bug','dragon','steel'],['none'],['water','electric','grass','ground'],['fire','ice','poison','flying','bug'],['none']],
  [['water','ground','rock'],['water','grass','dragon'],['none'],['fire','water','ice','steel'],['electric','grass'],['none']],
  [['grass','ground','flying','dragon'],['fire','water','ice','steel'],['none'],['ice'],['fire','fighting','rock','steel'],['none'],],
  [['water','flying'],['electric','grass','dragon'],['ground'],['electric','flying','steel'],['ground'],['none']],
  [['normal','ice','rock','dark','steel'],['poison','flying','psychic','bug','fairy'],['ghost'],['bug','rock','dark'],['flying','psychic','fairy'],['none']],
  [['grass','fighting','bug'],['electirc','rock','steel'],['none'],['grass','fighting','bug'],['electric','ice','rock'],['ground']],
  [['grass','psychic','dark'],['fire','fighting','poison','flying','ghost','steel','fairy'],['none'],['grass','fighting','ground'],['fire','fighting','rock'],['none']],
  [['psychic','ghost'],['dark'],['normal'],['poison','bug'],['ghost','dark'],['normal','fighting']],
  [['water','ice','flying','bug'],['fighting','ground','steel'],['none'],['normal','fire','poison','flying'],['water','grass','fighting','ground','steel'],['none']],
  [['fire','electric','poison','rock','steel'],['grass','bug'],['flying'],['poison','rock'],['water','grass','ice',],['electric']],
  [['ice','fairy'],['fire','water','electric','steel'],['none'],['normal','grass','ice','flying','psychic','bug','rock','dragon','steel','fairy'],['fire','fighting','ground'],['poison']],
  [['psychic','ghost'],['fighting','dark','fairy'],['none'],['ghost','dark'],['fighting','bug','fairy'],['psychic']],
  [['fighting','poison'],['psychic','steel'],['dark'],['fighting','psychic'],['bug','ghost','dark'],['none']],
  [['fighting','dragon','dark'],['fire','poison','steel'],['none'],['fighting','bug','dark'],['poison','steel'],['dragon']],
  [['dragon'],['steel'],['fairy'],['fire','water','electric','grass'],['ice','dragon','fairy'],['none']],
  [['grass','fairy'],['poison','ground','rock','ghost'],['none'],['grass','fighting','poison','bug','fairy'],['ground','psychic'],['none']]
]

// sets up modal and pokemon type variables for later

var modal = document.getElementById("myModal");
const hideTheBox = document.getElementById("pokemon-types")
const thisThing = document.querySelectorAll(".type-box");

// creates modal and creates the thml for the modal

function onit(type) {
  typeValue = thisThing[type].className;
  typeText = thisThing[type].innerHTML;
  typeInfo = typeRelations[type];
  modal.style.display = "grid";
  var div = document.createElement('div');
  div.innerHTML = `
    <div>
      <div class = "headerText">Selected Type</div>
      <div id = "selectedType"></div>
      <div id = "modal text">Strong against</div>
      <div id = "strong against" class = "grid" ></div>
      <div id = "modal text">Weak against</div>
      <div id = "weak against" class = "grid"></div>
      <div id = "modal text">No Effect against</div>
      <div id = "noeffect against" class = "grid"></div>
      <div id = "modal text">Strong To</div>
      <div id = "strong to" class = "grid"></div>
      <div id = "modal text">Weak To</div>
      <div id = "weak to" class = "grid"></div>
      <div id = "modal text">NoEffect From</div>
      <div id = "noeffect from" class = "grid"></div>
    </div>
`;
document.getElementById('posts').appendChild(div);
document.getElementById('selectedType').innerHTML += typeText;
document.getElementById("selectedType").className = typeValue;
var modalTextElements = document.querySelectorAll("[id^='modal text']");

for (let i = 0; i < modalTextElements.length; i++) {
  var textInModal = modalTextElements[i];
  textInModal.className = "modalText";
}

// Loops through array to get type weakness and adds them to appropriate div above

for (let i = 0; i < typeInfo.length; i ++) {
  if (i == 0) {
    typeAgainst = typeInfo[i]; 
    for (let i = 0; i < typeAgainst.length; i++){
      constructingText = typeAgainst[i];
      typeBox = "type-box ";
      constructingClass = typeBox.concat(constructingText)
      document.getElementById("strong against").innerHTML += '<div id = "constructing"></div>';
      constructing = document.getElementById('constructing');
      constructing.className = constructingClass;
      constructing.innerHTML += constructingText;
      constructing.id = ""
    }
  } else if ( i == 1) {
    typeAgainst = typeInfo[i]; 
    for (let i = 0; i < typeAgainst.length; i++){
      constructingText = typeAgainst[i];
      typeBox = "type-box ";
      constructingClass = typeBox.concat(constructingText)
      document.getElementById("weak against").innerHTML += '<div id = "constructing"></div>';
      constructing = document.getElementById('constructing');
      constructing.className = constructingClass;
      constructing.innerHTML += constructingText;
      constructing.id = ""
    }
  } else if ( i == 2) {
    typeAgainst = typeInfo[i]; 
    for (let i = 0; i < typeAgainst.length; i++){
      constructingText = typeAgainst[i];
      typeBox = "type-box ";
      constructingClass = typeBox.concat(constructingText)
      document.getElementById("noeffect against").innerHTML += '<div id = "constructing"></div>';
      constructing = document.getElementById('constructing');
      constructing.className = constructingClass;
      constructing.innerHTML += constructingText;
      constructing.id = ""
    }
  } else if ( i == 3) {
    typeAgainst = typeInfo[i]; 
    for (let i = 0; i < typeAgainst.length; i++){
      constructingText = typeAgainst[i];
      typeBox = "type-box ";
      constructingClass = typeBox.concat(constructingText)
      document.getElementById("strong to").innerHTML += '<div id = "constructing"></div>';
      constructing = document.getElementById('constructing');
      constructing.className = constructingClass;
      constructing.innerHTML += constructingText;
      constructing.id = ""
    }  } else if ( i == 4) {
      typeAgainst = typeInfo[i]; 
      for (let i = 0; i < typeAgainst.length; i++){
        constructingText = typeAgainst[i];
        typeBox = "type-box ";
        constructingClass = typeBox.concat(constructingText)
        document.getElementById("weak to").innerHTML += '<div id = "constructing"></div>';
        constructing = document.getElementById('constructing');
        constructing.className = constructingClass;
        constructing.innerHTML += constructingText;
        constructing.id = ""
      }  } else if ( i == 5) {
          typeAgainst = typeInfo[i]; 
          for (let i = 0; i < typeAgainst.length; i++){
            constructingText = typeAgainst[i];
            typeBox = "type-box ";
            constructingClass = typeBox.concat(constructingText)
            document.getElementById("noeffect from").innerHTML += '<div id = "constructing"></div>';
            constructing = document.getElementById('constructing');
            constructing.className = constructingClass;
            constructing.innerHTML += constructingText;
            constructing.id = ""
          }  }


}

}

// closes modal if user clicks outside window

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    const list = document.getElementById("posts");
    list.removeChild(list.firstElementChild);
  }
}

