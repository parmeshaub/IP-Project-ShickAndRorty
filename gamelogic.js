var inputText;
var room = ["Office","Crime Scene","Interrogation Room","Starting"];
var current_room;
const submitButton = document.querySelector("#submit-button");
const textBox = document.querySelector('.text-box');
const textInput = document.getElementById('text-input');


var response_States = ['Normal','Interrogation','Explore','Interrogation2','Accuse'];
var responseState = response_States[0];

var firstTime_Office = true;

var lastText;
var user_Inventory = [];
var buttonState = false;
var typingDelay = 0.5;

var suspect_1_visit = false;
var suspect_2_visit = false;
var suspect_3_visit = false;

var suspect_1_description;
var suspect_2_description;
var suspect_3_description;

var areacount_loadingzone = 0;
var max_areacount_loadingzone = 2;
var areacount_unloadingzone = 0;
var max_areacount_unloadingzone = 2;
var areacount_office = 0;
var max_areacount_office = 2;

var witness1_talk = false;
var witness2_talk = false;
var witness3_talk = false;


let squareBox = document.getElementById("square-box");
let imgElement = document.createElement("img");

function changeImage(path){
    let squareBox = document.getElementById("square-box");
    imgElement.src = path;
    imgElement.style.width = "700px";
    imgElement.style.height = "500px";
    squareBox.appendChild(imgElement);
}

//Typing effect on the textbox
function typeWriterEffect(text, delay) {
  let index = 0;
  const intervalId = setInterval(() => {
    textBox.textContent += text.charAt(index);
    index++;
    if (index >= text.length) {
      clearInterval(intervalId);
    }
  }, delay);
}
//Clears the text in the textbox
function clearText(){
    document.getElementById("text-box").innerHTML = '';
}

//Display info for suspect when clicked.
function displayText(index) {
    var bottomText = document.getElementById("bottom-text-" + index).innerHTML;
    
    // check the current button state and toggle it
    if (buttonState) {
        clearText();
        typeWriterEffect(lastText,typingDelay);
        buttonState = false;
    } else {
        clearText();
        let text;

        switch(bottomText){
            case Suspect_1.name:
                text = suspect_1_description;
                break;
            case Suspect_2.name:
                text = suspect_2_description;
                break;
            case Suspect_3.name:
                text = suspect_3_description;
                break;
        }

        typeWriterEffect(text,typingDelay);
        buttonState = true;
    }
}

function changeInstructions(){
    const sideBox = document.querySelector('.side-box');
    const instructions = sideBox.querySelector('p');
    const stepsList = sideBox.querySelector('ul');

    switch(current_room){
        case "Office":
            instructions.innerHTML = 'Office';
            stepsList.innerHTML = `
                <li>go crime scene</li>
                <li>go interrogation room</li>
                <li>inventory</li>
                <li>look</li>
                <li>back</li>
            `;
            break;
        case "Crime Scene":
            instructions.innerHTML = 'Crime Scene';
            stepsList.innerHTML = `
                <li>go office</li>
                <li>go interrogation room</li>
                <li>interview witnesses</li>
                <li>explore crime scene</li>
                <li>look</li>
                <li>back</li>
            `;
            break;
        case "Interrogation Room":
            instructions.innerHTML = 'Interrogation';
            stepsList.innerHTML = `
                <li>go office</li>
                <li>go crime scene</li>
                <li>call suspect</li>
                <li>accuse suspect</li>
                <li>look</li>
                <li>back</li>
            `;
            break;
        default:
            instructions.innerHTML = 'Instructions will appear here';
            stepsList.innerHTML = `
                <li>1</li>
                <li>2</li>
                <li>3</li>
            `;

    }
}

function enterRoom(current_room){
    switch(current_room){
        case "Office":
            changeInstructions();
            clearText();
            switch(firstTime_Office){
                case true:
                    changeImage("https://drive.google.com/uc?export=view&id=1NpJBcJxe0UA1bt1Y8gNP_6-sKZCMwv_E");
                    var text = "Good Morning Detective. \n\nWe currently have 3 suspects in our custody. You could either go and speak with them, or explore the crime scene to get some clues. \n\n What would you do?";
                    typeWriterEffect(text,typingDelay);
                    lastText = text;
                    firstTime_Office = false;
                    break;
                case false:
                    changeImage("https://drive.google.com/uc?export=view&id=1NpJBcJxe0UA1bt1Y8gNP_6-sKZCMwv_E");
                    var text = "Welcome Back Detective. \n\n How is the investigation going so far?";
                    text += "\n\nWe still have 3 suspects in custody.\nYou could speak with them or explore the crime scene.";
                    text += '\n\n\n What would you do?';
                    typeWriterEffect(text,typingDelay);
                    lastText = text;
                    break;

            }
            
            break;
        case "Crime Scene":
            changeInstructions();
            changeImage("https://drive.google.com/uc?export=view&id=1XkPeGWkP-hSNxdt3Okvl9aAuysoNwQHd");
            clearText();
            var text = "You enter the crime scene. \n\n";
            text += "The entire area is swathed in yellow police tape, a barrier between you and the unknown. \nThe air is thick with tension, each step forward feeling like a challenge. \nThe sense of unease in the space is palpable, as if the walls themselves are straining against the weight of what has happened here.\n\n";
            text += "What would you do?";
            typeWriterEffect(text, typingDelay);
            lastText = text;
            break;
        case "Interrogation Room":
            clearText();
            changeImage("https://drive.google.com/uc?export=view&id=1gEHEthvHy6CPWdDpYTkOmwgjYVXAu_J-");
            var text = "You enter the interrogation room.\n\nIts dark, with a dim lightbulb hanging from the ceiling... The air is thick.\n\n\nWhat would you like to do?";
            typeWriterEffect(text, typingDelay);
            changeInstructions();
            lastText = text;
            break;
        default:
            console.log("Enter Room fail");
    }
}

//Check users input and actions. - Based on room.
function checkUserInfo(input) {
    switch (current_room) {
      case "Office": // Office
        switch(input) {
          case "look":
            clearText();
            action_Look();
            break;
          case "go crime scene":
            action_Go(input);
            break;
          case "go interrogation room":
            action_Go(input);
            break;
          case "inventory":
            clearText();
            action_Inventory();
            break;
          case "back":
            action_Back();
            break;
          default:
            console.log("def");
        }
        break;
      case "Crime Scene": // Crime Scene
        switch(input){
            case "go office":
                action_Go(input);
                break;
            case "go interrogation room":
                console.log('runn');
                action_Go(input);
                break;
            case "look":
                action_Look();
                break;
            case "interview witness":
                action_Interview();
                break;
            case "explore crime scene":
                action_Explore();
                break;
            case "back":
                action_Back();
                break;
        }
        break;
      case "Interrogation Room": // Interro
        switch(input){
            case "go office":
                action_Go(input);
                break;
            case "go crime scene":
                action_Go(input);
                break;
            case "call suspect":
                action_CallSuspect();
                break;
            case "back":
                action_Back();
                break;
            case "look":
                action_Look();
                break;
            case "accuse suspect":
                action_Accuse();
                break;
        }
        break;
      case "Starting": // game start
        switch(input) {
          case "yes":
            current_room = room[0];
            enterRoom(current_room);
            console.log("gamestate changed");
            break;
          default:
            console.log("nothing happens");
        }
        break;
      default:
        console.log("Default");
    }
  }

//Listen to user input.
submitButton.addEventListener("click", function() {
  inputText = document.querySelector("#text-input").value;
  console.log("User input: " + inputText);
  textInput.value = '';
  switch(responseState){
    case "Normal":
        console.log("response state normal");
        checkUserInfo(inputText);
        break;
    case "Interrogation":
        console.log("response state interrogation");
        checkUserInfo_Suspect(inputText);
        break;
    case "Explore":
        console.log("response state explore");
        checkUserInfo_explore(inputText);
        break;
    case "Interrogation2":
        checkUserInfo_Witness(inputText);
        break;
    case "Accuse":
        checkUserInfo_Accuse(inputText);
        break;
    
    default:
        console.log("User Fail");
        checkUserInfo(inputText);
  }
  
});

function checkUserInfo_Accuse(input){
    let guilty_man;
    let suspects = [Suspect_1, Suspect_2, Suspect_3];
    for (let i =0; i < suspects.length; i++){
        if (suspects[i].status === 'guilty'){
            guilty_man = suspects[i].name;
        }
    }
    switch(input){
        case "im not sure":
            clearText();
            text = "Ah, take more time cross examining the evidence sir!\n\nType back to go back.";
            responseState = response_States[0];
            typeWriterEffect(text,typingDelay);
            break;
        case Suspect_1.name:
            if(Suspect_1.status === "guilty"){
                gameWin(Suspect_1);
            }
            else{
                gameLoose(Suspect_1,guilty_man);
            }
            break;
        case Suspect_2.name:
            if(Suspect_2.status === "guilty"){
                gameWin(Suspect_2);
            }
            else{
                gameLoose(Suspect_2,guilty_man);
            }
            break;
        case Suspect_3.name:
            if(Suspect_3.status === "guilty"){
                gameWin(Suspect_3);
            }
            else{
                gameLoose(Suspect_3,guilty_man);
            }
            break;

    }
}

function checkUserInfo_Suspect(input){
    switch(input){
        case Suspect_1.name:
            if(suspect_1_visit === false){
                console.log('suspect 1 called');
                clearText();
                text = Suspect_1.name;
                text += " was brought in for questioning.\n\n"
                text += "\n\n"
                text += Suspect_1.name;
                text += " was Interrogated.\n\n\n\n You learnt something new. (click on their profile). type back to go back"
                responseState = response_States[0];
                typeWriterEffect(text,typingDelay);
                suspect_1_visit = true;
                addDescription(0,1);
            }
            else{
                clearText();
                text = Suspect_1.name;
                text += " was brought in for questioning.\n\n"
                text += "\n\n"
                text += Suspect_1.name;
                text += " had no words. type back to go back"
                responseState = response_States[0];
                typeWriterEffect(text,typingDelay);
            }
            
            break;
        case Suspect_2.name:
            if(suspect_2_visit === false){
                console.log('suspect 2 called');
                clearText();
                text = Suspect_2.name;
                text += " was brought in for questioning.\n\n"
                text += "\n\n"
                text += Suspect_2.name;
                text += " was Interrogated.\n\n\n\n You learnt something new. (click on their profile). type back to go back"
                responseState = response_States[0];
                typeWriterEffect(text,typingDelay);
                suspect_2_visit = true;
                addDescription(1,1);
            }
            else{
                clearText();
                text = Suspect_2.name;
                text += " was brought in for questioning.\n\n"
                text += "\n\n"
                text += Suspect_2.name;
                text += " had no words. type back to go back"
                responseState = response_States[0];
                typeWriterEffect(text,typingDelay);
            }
            break;
        case Suspect_3.name:
            
        if(suspect_3_visit === false){
            console.log('suspect 1 called');
            clearText();
            text = Suspect_3.name;
            text += " was brought in for questioning.\n\n"
            text += "\n\n"
            text += Suspect_3.name;
            text += " was Interrogated.\n\n\n\n You learnt something new. (click on their profile). type back to go back"
            responseState = response_States[0];
            typeWriterEffect(text,typingDelay);
            suspect_3_visit = true;
            addDescription(2,1);
        }
        else{
            clearText();
            text = Suspect_3.name;
            text += " was brought in for questioning.\n\n"
            text += "\n\n"
            text += Suspect_3.name;
            text += " had no words. type back to go back"
            responseState = response_States[0];
            typeWriterEffect(text,typingDelay);
        }
    }
}

function checkUserInfo_explore(input){
    let item;
    switch(input){
        case "explore the loading zone":
            if(areacount_loadingzone < max_areacount_loadingzone){
                clearText();
                text = 'You explored the loading zone...\n\n';
                item = takeRandomItemFromEvidenceArrays([Evidence_Key, Evidence_ThrowOff, Evidence_Useless], user_Inventory);
                text += 'You managed to find...\n\n';
                text += item;
                text += '\n\nThats great! type back to go back. Review your evidence in the office (inventory)';
                responseState = response_States[0];
                areacount_loadingzone += 1;
                typeWriterEffect(text,typingDelay);
            }
            else{
                clearText();
                text = 'You explored the loading zone...\n\nYou found....\n\n Absolutely nothing!\n\nBummer, type back to go back.';
                responseState = responseState[0];
                typeWriterEffect(text,typingDelay);

            }
            break;
        case "explore the unloading zone":
            if(areacount_unloadingzone < max_areacount_unloadingzone){
                clearText();
                text = 'You explored the unloading zone...\n\n';
                item = takeRandomItemFromEvidenceArrays([Evidence_Key, Evidence_ThrowOff, Evidence_Useless], user_Inventory);
                text += 'You managed to find...\n\n';
                text += item;
                text += '\n\nThats great! type back to go back. Review your evidence in the office (inventory)';
                responseState = response_States[0];
                areacount_unloadingzone += 1;
                typeWriterEffect(text,typingDelay);
            }
            else{
                clearText();
                text = 'You explored the unloading zone...\n\nYou found....\n\n Absolutely nothing!\n\nBummer, type back to go back.';
                responseState = responseState[0];
                typeWriterEffect(text,typingDelay);

            }
            break;
        case "explore the warehouse office":
            if(areacount_office < max_areacount_office){
                clearText();
                text = 'You explored the loading zone...\n\n';
                item = takeRandomItemFromEvidenceArrays([Evidence_Key, Evidence_ThrowOff, Evidence_Useless], user_Inventory);
                text += 'You managed to find...\n\n';
                text += item;
                text += '\n\nThats great! type back to go back. Review your evidence in the office (inventory)';
                responseState = response_States[0];
                areacount_office += 1;
                typeWriterEffect(text,typingDelay);
            }
            else{
                clearText();
                text = 'You explored the warehouse office...\n\nYou found....\n\n Absolutely nothing!\n\nBummer, type back to go back.';
                responseState = responseState[0];
                typeWriterEffect(text,typingDelay);

            }
            break;
    }
}

function checkUserInfo_Witness(input){
    switch(input){
        case "talk to witness 1":
            switch(witness1_talk){
                case false:
                    clearText();
                    text = 'You question the witness if they saw anything.';
                    text += "\n\nThey gave descriptions of ";
                    text += Suspect_1.name;
                    addDescription(0,0);
                    text += "\nType back to return";
                    witness1_talk = true;
                    typeWriterEffect(text,typingDelay);
                    responseState = response_States[0];
                    break;
                case true:
                    clearText();
                    text = 'You question the witness if they saw anything.';
                    text += `\n\nThey give you a strange stare as if to say "I already told you didn't I??"`;
                    text += "\n\n You return with nothing! Type back to return.";
                    typeWriterEffect(text,typingDelay);
                    responseState = response_States[0];
            }
            break;
            
        case "talk to witness 2":
            switch(witness2_talk){
                case false:
                    clearText();
                    text = 'You question the witness if they saw anything.';
                    text += "\n\nThey gave descriptions of ";
                    text += Suspect_2.name;
                    addDescription(1,0);
                    text += "\nType back to return";
                    witness2_talk = true;
                    typeWriterEffect(text,typingDelay);
                    responseState = response_States[0];
                    break;
                case true:
                    clearText();
                    text = 'You question the witness if they saw anything.';
                    text += `\n\nThey give you a strange stare as if to say "Are you okay? I just told you!"`;
                    text += "\n\n You return with nothing! Type back to return.";
                    typeWriterEffect(text,typingDelay);
                    responseState = response_States[0];
            }
            break;
        case "talk to witness 3":
            switch(witness3_talk){
                case false:
                    clearText();
                    text = 'You question the witness if they saw anything.';
                    text += "\n\nThey gave descriptions of ";
                    text += Suspect_3.name;
                    addDescription(2,0);
                    text += "\nType back to return";
                    witness3_talk = true;
                    typeWriterEffect(text,typingDelay);
                    responseState = response_States[0];
                    break;
                case true:
                    clearText();
                    text = 'You question the witness if they saw anything.';
                    text += `\n\nThey give you a strange stare as if to say "I just told you..."`;
                    text += "\n\n You return with nothing! Type back to return.";
                    typeWriterEffect(text,typingDelay);
                    responseState = response_States[0];
            }

            break;
    }
}

function addDescription(sus,interoevi){
    switch (sus){
        case 0:
            if(interoevi == 0){
                suspect_1_description += "\n\n Appearance: ";
                suspect_1_description += Suspect_1.appearance_1;
            }
            else{
                suspect_1_description += '\n\n Likes: ';
                suspect_1_description += Suspect_1.likes;
            }
            break;
        case 1:
            if(interoevi == 0){
                suspect_2_description += "\n\n Appearance: ";
                suspect_2_description += Suspect_2.appearance_1;
            }
            else{
                suspect_2_description += '\n\n Likes: ';
                suspect_2_description += Suspect_2.likes;
            }
            
            break;
        case 2:
            if(interoevi == 0){
                suspect_3_description += "\n\n Appearance: ";
                suspect_3_description += Suspect_3.appearance_1;
            }
            else{
                suspect_3_description += '\n\n Likes: ';
                suspect_3_description += Suspect_3.likes;
            }
            
            break;
    }
}

function InitializeGame(){
    var text = "Hello Detective. \n\n We have a new case on our hands. A man was murdered yesterday in this warehouse. We have 3 suspects currently in our custody and we need your expertise to help us solve this case!\n\n Are you ready to begin your investigation? [yes/no]";
    typeWriterEffect(text, typingDelay);
    current_room = room[3];
    suspect_1_description = "Name: " + Suspect_1.name;
    suspect_2_description = "Name: " + Suspect_2.name;
    suspect_3_description = "Name: " + Suspect_3.name;
    user_Inventory = [];
    changeImage("https://drive.google.com/uc?export=view&id=1WJjsUXhKVHFUJiAE-Hxvzn1jrO33mhST");
}

function takeRandomItemFromEvidenceArrays(evidenceArrays, userInventory) {
    let allEvidence = [...evidenceArrays[0], ...evidenceArrays[1], ...evidenceArrays[2]];
    let randomItem;
  
    while (true) {
      let randomIndex = Math.floor(Math.random() * allEvidence.length);
      randomItem = allEvidence[randomIndex];
  
      if (!userInventory.includes(randomItem)) {
        break;
      }
  
      console.log(`Item ${randomItem} is already in user inventory. Trying again...`);
    }
  
    userInventory.push(randomItem);
    console.log(`Item ${randomItem} added to user inventory.`);
    return randomItem;
}


//Gameplay actions
//Describe the surroundings
function action_Interview(){
    responseState = response_States[3];
    clearText();
    text = "You see some witnesses, and alibis to the suspects.\n What would you do?";
    text += "\n\ntalk to witness 1\n\ntalk to witness 2\n\n talk to witness 3";
    typeWriterEffect(text,typingDelay);
}

function action_Accuse(){
    if(user_Inventory.length >= 3){
        clearText();
        text = "Gathered enough evidence?\nAlright who do you think the killer is?\n\n";
        text += Suspect_1.name;
        text += '\n';
        text += Suspect_2.name;
        text += '\n';
        text += Suspect_3.name;
        text += '\n im not sure';
        text += '\n\n Be VERY sure. YOUR JOB IS ON THE LINE!'
        typeWriterEffect(text,typingDelay);
        responseState = response_States[4]; 

    }
    else{
        clearText();
        text = "YOU DONT HAVE ENOUGH EVIDENCE TO ACCUSE OTHERS! \nInnocent until proven guilty, man!";
        text += "\n\n What were you thinking, detective?";
        text += "\n\n Type back to go back.";
        typeWriterEffect(text,typingDelay);
    }
}

function action_Explore(){
    responseState = response_States[2];
    clearText();
    text = 'You decided to go explore the crime scene.\n\n\n Explore the loading zone\n Explore the unloading zone\n Explore the warehouse office';
    typeWriterEffect(text,typingDelay);
}

function action_Look(){
    switch(current_room){
        case "Office":
            clearText();
            var text = "You look around..\n\n Its your Office! \n\n You feel a weight of responsibility on your shoulders, knowing that the cases you work on could mean the difference between life and death for the people involved. \n\n But despite the pressure, you feel a sense of pride in the work you do, knowing that your efforts help keep the community safe and bring peace to victims and their families. \n\nWith a renewed sense of determination, you dive back into your work, driven by the knowledge that the truth will prevail. ";
            text += "\ntype back to return";
            typeWriterEffect(text,typingDelay);
            break;
        case "Crime Scene":
            clearText();
            var text = "You look around...\n\n The crime scene is eerie. he air is thick with the smell of rust and decay. The windows are boarded up, leaving the room in near darkness except for the small amount of light that filters through the cracks. Dust and cobwebs cling to every surface, and piles of debris and refuse are scattered throughout the room.";
            text += "\n\nThe walls are covered in peeling paint, and you notice a few spots where it looks like the plaster has crumbled away. The ceiling is high, with exposed metal beams stretching across the space. The floor is made of concrete, and your footsteps echo as you move across it.\n\nOverall, the scene is eerie and unsettling. It's clear that something terrible has happened here, and you can't help but feel a sense of foreboding as you take in the space.";
            text += "\ntype back to return";
            typeWriterEffect(text,typingDelay);
            break;
        case "Interrogation Room":
            clearText();
            var text = "You look around...\n\nIt's a dark place, with only a dim lightbulb hanging from the ceiling to illuminate the room. The air is thick with tension and the smell of stale cigarette smoke. \n\n The room is small and windowless, with rough concrete walls that seem to absorb the light. The floor is made of worn linoleum tiles, scuffed and stained from years of use. The only furniture in the room is the lone metal chair in the center, bolted to the floor.\n\nOn one of the walls, you notice a large mirror that spans the length of the room. \n\n You take a deep breath and try to focus on the task at hand. You need to stay sharp and focused to get the answers you need.";
            text += "\ntype back to return";
            typeWriterEffect(text,typingDelay);
            break;
        default:
            console.log("Nothing");
    }
}

function action_Inventory(){
    console.log("get inventory");
    let inventoryText;
    if(user_Inventory.length > 0){
        for (let i = 0; i < user_Inventory.length; i++) {
            inventoryText += user_Inventory[i] + ", ";
            inventoryText += '\n\n';
        }
        inventoryText += '\n\n type back to return.';
        clearText();
        typeWriterEffect(inventoryText,typingDelay);
    }
    else{
        text = "You have nothing!\n\n\n type back to return.";
        typeWriterEffect(text,typingDelay);
    }
    


}

function action_Go(input){
    userInput = input;
    //Set the current_room to whatever they key.
    //Firstly check what room they are in.
    switch(current_room){
        case "Office":
            switch(userInput){
                case("go interrogation room"):
                    current_room = room[2];
                    enterRoom(current_room);
                    break;
                case("go crime scene"):
                    current_room = room[1];
                    enterRoom(current_room);
                    break;
                default:
                    console.log("nothing");
            }
            break;
        case "Crime Scene":
            switch(userInput){
                case("go interrogation room"):
                    current_room = room[2];
                    enterRoom(current_room);
                    break;
                case("go office"):
                    current_room = room[0];
                    enterRoom(current_room);
                    break;
                default:
                    console.log("nothing");
            }
            break;
        case "Interrogation Room":
            switch(userInput){
                case("go crime scene"):
                    current_room = room[1];
                    enterRoom(current_room);
                    break;
                case("go office"):
                    current_room = room[0];
                    enterRoom(current_room);
                    break;
                default:
                    console.log("nothing");
            }
            break;
        default:
            console.log("nothing");
    }
    
}

function action_REvidence(){
    //firstly check if inventory is empty or not.
    //If empty, say INVENTORY empty!
    //If not, promt for evidence.
    console.log("review_evidence");
}

function action_Back(){
    clearText();
    typeWriterEffect(lastText,typingDelay);
}

function action_CallSuspect(){
    responseState = response_States[1];
    clearText();
    text = "which suspect would you like to call?\n\n";
    text += Suspect_1.name;
    text += '\n';
    text += Suspect_2.name;
    text += '\n';
    text += Suspect_3.name;
    text += '\n';
    typeWriterEffect(text,typingDelay);

}

function gameWin(guilty){
    clearText();
    text = "You.....\n\nWIN!!!";
    text += "\n\nCongrats! You managed to place the true killer in jail!"
    text += "\nYou have been awarded 5 points into your account!"

    text += "\n\n Refresh the browser to restart the game.";
    typeWriterEffect(text,typingDelay);

}

function gameLoose(innocent,guilty){
    clearText();
    text = "You.....\n\nLOSE!";
    text += "The real murder was ";
    text += guilty;
    text += "\n\n You placed poor innocent ";
    text += innocent.name;
    text += "IN JAIL!!!";

    text += "\n\n Refresh the browser to restart the game.";
    typeWriterEffect(text,typingDelay);
}

InitializeGame();