let Suspect_NameList = ["Nyo", "Matthew", "Kai", "Euan", "Jovan", "Grace"];
let Suspect_States = ["innocent", "guilty"];
let Suspect_Appearance = [
  "Eyeglasses",
  "Hat",
  "Jacket",
  "Shirt",
  "Pants",
  "Shoes",
  "Watch",
  "Ring",
  "Earrings",
  "Necklace",
  "Belt",
  "Scarf",
  "Gloves",
  "Bag",
  "Umbrella",
  "Lipstick",
  "Makeup",
  "Perfume",
  "Hairpin",
  "Hairband",
];
let Suspect_Likes = [
  "Reading books",
  "Playing with toys",
  "Listening to music",
  "Traveling",
  "Drawing",
  "Photography",
  "Cooking",
  "Painting",
  "Sculpting",
  "Gardening",
  "Fishing",
  "Hunting",
];
let Evidence_list = [
  "Book",
  "Toy",
  "Music Disk",
  "Traveling Journal",
  "Drawing Pen",
  "Photos",
  "Frying Pan",
  "Paint Brush",
  "Clay",
  "Flower Pot",
  "Fishing Rod",
  "Hunting Knife",
];
let Evidence_Key = [];
let Evidence_ThrowOff = [];
let Evidence_Useless = [];

// 3 Suspects
let Suspect_1 = {
  name: "Holder",
  status: Suspect_States[0],
  appearance_1: Suspect_Appearance[0],
  appearance_2: Suspect_Appearance[1],
  appearance_3: Suspect_Appearance[1],
  appearance_4: Suspect_Appearance[1],
  likes: Suspect_Likes[0],
};

let Suspect_2 = {
  name: "Holder",
  status: Suspect_States[0],
  appearance_1: Suspect_Appearance[0],
  appearance_2: Suspect_Appearance[1],
  appearance_3: Suspect_Appearance[1],
  appearance_4: Suspect_Appearance[1],
  likes: Suspect_Likes[0],
};

let Suspect_3 = {
  name: "Holder",
  status: Suspect_States[0],
  appearance_1: Suspect_Appearance[0],
  appearance_2: Suspect_Appearance[1],
  appearance_3: Suspect_Appearance[1],
  appearance_4: Suspect_Appearance[1],
  likes: Suspect_Likes[0],
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

    // check if the second randomly selected item has already been assigned
    while (
      assignedAppearance.includes(randomAppearance2) ||
      randomAppearance1 === randomAppearance2
    ) {
      randomIndex2 = Math.floor(Math.random() * appearance.length);
      randomAppearance2 = appearance[randomIndex2];
    }

    let randomIndex3 = Math.floor(Math.random() * appearance.length);
    let randomAppearance3 = appearance[randomIndex3];

    // check if the third randomly selected item has already been assigned
    while (
      assignedAppearance.includes(randomAppearance3) ||
      randomAppearance1 === randomAppearance3 ||
      randomAppearance2 === randomAppearance3
    ) {
      randomIndex3 = Math.floor(Math.random() * appearance.length);
      randomAppearance3 = appearance[randomIndex3];
    }

    let randomIndex4 = Math.floor(Math.random() * appearance.length);
    let randomAppearance4 = appearance[randomIndex4];

    // check if the fourth randomly selected item has already been assigned
    while (
      assignedAppearance.includes(randomAppearance4) ||
      randomAppearance1 === randomAppearance4 ||
      randomAppearance2 === randomAppearance4 ||
      randomAppearance3 === randomAppearance4
    ) {
      randomIndex4 = Math.floor(Math.random() * appearance.length);
      randomAppearance4 = appearance[randomIndex4];
    }

    suspects[i].appearance_1 = randomAppearance1;
    suspects[i].appearance_2 = randomAppearance2;
    suspects[i].appearance_3 = randomAppearance3;
    suspects[i].appearance_4 = randomAppearance4;
    assignedAppearance.push(
      randomAppearance1,
      randomAppearance2,
      randomAppearance3,
      randomAppearance4
    );
  }
}

function assignLikes() {
  Suspect_1.likes =
    Suspect_Likes[Math.floor(Math.random() * Suspect_Likes.length)];
  do {
    Suspect_2.likes =
      Suspect_Likes[Math.floor(Math.random() * Suspect_Likes.length)];
  } while (Suspect_2.likes === Suspect_1.likes);
  do {
    Suspect_3.likes =
      Suspect_Likes[Math.floor(Math.random() * Suspect_Likes.length)];
  } while (
    Suspect_3.likes === Suspect_1.likes ||
    Suspect_3.likes === Suspect_2.likes
  );
}

//Assigning Evidence
function assignKeyEvidence(Suspect_1, Suspect_2, Suspect_3) {
  let suspects = [Suspect_1, Suspect_2, Suspect_3];
  for (let i = 0; i < suspects.length; i++) {
    let suspect = suspects[i];
    if (suspect.status === "guilty") {
      Evidence_Key.push(
        suspect.appearance_1,
        suspect.appearance_2,
        suspect.appearance_3,
        suspect.appearance_4
      );
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
    if (suspect.status === "innocent") {
      Evidence_ThrowOff.push(
        suspect.appearance_1,
        suspect.appearance_2,
        suspect.appearance_3,
        suspect.appearance_4
      );
      let likeIndex = Suspect_Likes.indexOf(suspect.likes);
      if (likeIndex > -1) {
        Evidence_ThrowOff.push(Evidence_list[likeIndex]);
      }
    }
  }
}

function assignUselessEvidence() {
  let Evidence_Useless = [];
  let allEvidence = Suspect_Appearance.concat(Evidence_list);
  for (let i = 0; i < allEvidence.length && Evidence_Useless.length < 3; i++) {
    let item = allEvidence[i];
    if (
      Evidence_Key.indexOf(item) === -1 &&
      Evidence_ThrowOff.indexOf(item) === -1
    ) {
      Evidence_Useless.push(item);
    }
  }
  return Evidence_Useless;
}

assignAppearance([Suspect_1, Suspect_2, Suspect_3], Suspect_Appearance);
setGuilty([Suspect_1, Suspect_2, Suspect_3]);
assignNames([Suspect_1, Suspect_2, Suspect_3], Suspect_NameList);
assignLikes();
assignKeyEvidence(Suspect_1, Suspect_2, Suspect_3);
assignThrowOffEvidence(Suspect_1, Suspect_2, Suspect_3);
Evidence_Useless = assignUselessEvidence();

console.log(Suspect_1);
console.log(Suspect_2);
console.log(Suspect_3);
console.log(Evidence_Key);
console.log(Evidence_ThrowOff);
console.log(Evidence_Useless);
