let Suspect_NameList = ['Nyo','Matthew','Kai','Euan','Jovan','Grace'];
let Suspect_States = ['innocent', 'guilty'];
let Suspect_Appearance = ['Eyeglasses', 'Hat', 'Jacket', 'Shirt', 'Pants', 'Shoes', 'Watch', 'Ring', 'Earrings', 'Necklace', 'Belt', 'Scarf', 'Gloves', 'Bag', 'Umbrella', 'Lipstick', 'Makeup', 'Perfume', 'Hairpin', 'Hairband'];
let Suspect_Likes = ["Reading books","Playing with toys","Listening to music","Traveling","Drawing","Photography","Cooking","Painting","Sculpting","Gardening","Fishing","Hunting"];
let Evidence_list = ["Book","Toy","Music Disk", "Traveling Journal", "Drawing Pen", "Photos", "Frying Pan","Paint Brush", "Clay", "Flower Pot","Fishing Rod", "Hunting Knife"];
let Evidence_Key = [];
let Evidence_ThrowOff = [];
let Evidence_Useless = [];

// 3 Suspects
let Suspect_1 = {
    name: 'Holder',
    status: Suspect_States[0],
    appearance_1: Suspect_Appearance[0],
    likes: Suspect_Likes[0],
    suspect_description: ''
};

let Suspect_2 = {
    name: 'Holder',
    status: Suspect_States[0],
    appearance_1: Suspect_Appearance[0],
    likes: Suspect_Likes[0],
    suspect_description: ''
};

let Suspect_3 = {
    name: 'Holder',
    status: Suspect_States[0],
    appearance_1: Suspect_Appearance[0],
    likes: Suspect_Likes[0],
    suspect_description: ''
};

//Assigning the Suspects
function assignNames(suspects, names) {
    let assignedNames = [];

    for (let i = 0; i < suspects.length; i++) {
        let randomIndex = Math.floor(Math.random() * names.length);
        let randomName = names[randomIndex];

        // check if the randomly selected name has already been assigned
        while (assignedNames.includes(randomName)) {
        randomIndex = Math.floor(Math.random() * names.length);
        randomName = names[randomIndex];
        }

        suspects[i].name = randomName;
        assignedNames.push(randomName);
    }
}

function setGuilty(suspects) {
    let randomIndex = Math.floor(Math.random() * suspects.length);
    suspects[randomIndex].status = Suspect_States[1];
}

function assignAppearance(suspects, appearance) {
    let assignedAppearance = [];

    for (let i = 0; i < suspects.length; i++) {
        let randomIndex1 = Math.floor(Math.random() * appearance.length);
        let randomAppearance1 = appearance[randomIndex1];

        // check if the first randomly selected item has already been assigned
        while (assignedAppearance.includes(randomAppearance1)) {
        randomIndex1 = Math.floor(Math.random() * appearance.length);
        randomAppearance1 = appearance[randomIndex1];
        }

        let randomIndex2 = Math.floor(Math.random() * appearance.length);
        let randomAppearance2 = appearance[randomIndex2];

        suspects[i].appearance_1 = randomAppearance1;
        assignedAppearance.push(randomAppearance1);
    }
}

function assignLikes() {
    Suspect_1.likes = Suspect_Likes[Math.floor(Math.random() * Suspect_Likes.length)];
    do {
      Suspect_2.likes = Suspect_Likes[Math.floor(Math.random() * Suspect_Likes.length)];
    } while (Suspect_2.likes === Suspect_1.likes);
    do {
      Suspect_3.likes = Suspect_Likes[Math.floor(Math.random() * Suspect_Likes.length)];
    } while (Suspect_3.likes === Suspect_1.likes || Suspect_3.likes === Suspect_2.likes);
}

//Assigning Evidence
function assignKeyEvidence(Suspect_1, Suspect_2, Suspect_3) {
    let suspects = [Suspect_1, Suspect_2, Suspect_3];
    for (let i = 0; i < suspects.length; i++) {
        let suspect = suspects[i];
        if (suspect.status === 'guilty') {
            Evidence_Key.push(suspect.appearance_1);
            let index = Suspect_Likes.indexOf(suspect.likes);
            if (index !== -1) {
                Evidence_Key.push(Evidence_list[index]);
            }
        }
    }
}

function assignThrowOffEvidence(Suspect_1, Suspect_2, Suspect_3) {
    let suspects = [Suspect_1, Suspect_2, Suspect_3];
    for (let i = 0; i < suspects.length; i++) {
        let suspect = suspects[i];
        if (suspect.status === 'innocent') {
            let evidenceToAdd;
            if (suspect.likes && Suspect_Likes.includes(suspect.likes)) {
                // If the suspect has a "likes" property that is also in the Suspect_Likes array,
                // add the corresponding evidence to the Evidence_ThrowOff array
                let likeIndex = Suspect_Likes.indexOf(suspect.likes);
                evidenceToAdd = Evidence_list[likeIndex];
            } else {
                // Otherwise, add the suspect's "appearance_1" property to the Evidence_ThrowOff array
                evidenceToAdd = suspect.appearance_1;
            }
            Evidence_ThrowOff.push(evidenceToAdd);
        }
    }
}

function assignUselessEvidence() {
    let Evidence_Useless = [];
    let allEvidence = Suspect_Appearance.concat(Evidence_list);
    for (let i = 0; i < allEvidence.length && Evidence_Useless.length < 2; i++) {
        let item = allEvidence[i];
        if (Evidence_Key.indexOf(item) === -1 && Evidence_ThrowOff.indexOf(item) === -1) {
            Evidence_Useless.push(item);
        }
      }
    return Evidence_Useless;
}

function createSuspectDescription(name, likes, appearance) {
    let description = `Name: ${name}\n\nLikes: ${likes}\n\nAppearance: ${appearance}`;
    return description;
}



assignAppearance([Suspect_1, Suspect_2, Suspect_3], Suspect_Appearance);
setGuilty([Suspect_1, Suspect_2, Suspect_3]);
assignNames([Suspect_1, Suspect_2, Suspect_3], Suspect_NameList);
assignLikes()
assignKeyEvidence(Suspect_1, Suspect_2, Suspect_3);
assignThrowOffEvidence(Suspect_1, Suspect_2, Suspect_3);
Evidence_Useless = assignUselessEvidence();
Suspect_1.suspect_description = createSuspectDescription(Suspect_1.name, Suspect_1.likes, Suspect_1.appearance_1);
Suspect_2.suspect_description = createSuspectDescription(Suspect_2.name, Suspect_2.likes, Suspect_2.appearance_1);
Suspect_3.suspect_description = createSuspectDescription(Suspect_3.name, Suspect_3.likes, Suspect_3.appearance_1);



console.log(Suspect_1);
console.log(Suspect_2);
console.log(Suspect_3);
console.log(Evidence_Key);
console.log(Evidence_ThrowOff);
console.log(Evidence_Useless);

document.getElementById("bottom-text-1").innerHTML = Suspect_1.name;
document.getElementById("bottom-text-2").innerHTML = Suspect_2.name;
document.getElementById("bottom-text-3").innerHTML = Suspect_3.name;
