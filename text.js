const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}

function redirect() {
  window.location.href("/start.html");
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

const textNodes = [
  {
    id: 1,
    text: "Welcome to Dusk of Lies!",
    options: [
      {
        text: "Continue",
        nextText: 2,
      },
    ],
  },
  {
    id: 2,
    text: "Hello detective, there has been some strange activities around here.",
    options: [
      {
        text: "Well, what were the strange activities you have noticed?",
        nextText: 3,
      },
      {
        text: "Remain quiet",
        nextText: 4,
      },
    ],
  },
  {
    id: 3,
    text: "I'm not sure really I just heard some loud bangings everynight, it gives me the creep.",
    options: [
      {
        text: "Ok, I'll have a look around, don't you worry",
        nextText: 5,
      },
      {
        text: "HAHA! Must have been a ghost I guess, but anyways I'll have a look around, don't worry",
        nextText: 6,
      },
    ],
  },
  {
    id: 4,
    text: "...Ok but you see, I heard some loud bangings everynight, it just creeps me out.",
    options: [
      {
        text: "Ok, I'll have a look around, don't you worry.",
        nextText: 7,
      },
      {
        text: "Remains quiet",
        nextText: 8,
      },
    ],
  },
  {
    id: 5,
    text: "Thank you detective, stay safe and good luck!",
    options: [
      {
        text: "Continue",
      },
    ],
  },
  {
    id: 6,
    text: "You got some sense of humor detective, but yes thank you and good luck!",
    options: [
      {
        text: "Continue",
      },
    ],
  },
  {
    id: 7,
    text: "Thank you detective, stay safe and good luck!",
    options: [
      {
        text: "Continue",
      },
    ],
  },
  {
    id: 8,
    text: "I guess you are the silent type, but thank you detective and good luck!",
    options: [
      {
        text: "Continue",
      },
    ],
  },
];

startGame();
redirect();
