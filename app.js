// Gameboard module pattern START
const makeGameBoard = (() => {
  const gameActive = true;
  const tileArr = [];
  const gameboardDiv = document.querySelector(".gameboard");
  function makeBoard() {
    for (let i = 0; i < 9; i++) {
      const tile = document.createElement("div");
      tile.setAttribute("tileID", [i]);
      tile.classList.add("tileStyle", "grid-interact");
      gameboardDiv.appendChild(tile);
      tileArr.push(tile);
    }
  }
  return {
    tileArr,
    gameActive,
    makeBoard,
  };
})();
makeGameBoard.makeBoard();

// PLAYER FACTORY

let PicIndexArray = [];
const playerFactory = function (name, active) {
  return {
    name,
    active,
    generateTilePic() {
      const randomPicArray = [
        "./img/autumn 1.jpeg",
        "./img/autumn 4.jpeg",
        "./img/autumn 5.jpeg",
        "./img/autumn 9.jpeg",
        "./img/autumn 10.jpeg",
        "./img/autumn 11.jpeg",
        "./img/autumn 12.jpeg",
        "./img/autumn 13.jpeg",
        "./img/autumn 14.png",
        "./img/autumn 15.png",
        "./img/autumn 16.png",
        "./img/autumn 17.png",
        "./img/autumn 18.png",
        "./img/autumn 19.png",
        "./img/autumn 20.png",
        "./img/hobbiton autumn.png",
        "./img/shirepump.png",
      ];
      tilePicIndex1 = [Math.floor(Math.random() * randomPicArray.length)];
      document.querySelector(`.player-1-random`).src =
        randomPicArray[tilePicIndex1];
      PicIndexArray.push(randomPicArray[tilePicIndex1]);
      randomPicArray.splice(tilePicIndex1, 1);

      tilePicIndex2 = [Math.floor(Math.random() * randomPicArray.length)];
      document.querySelector(`.player-2-random`).src =
        randomPicArray[tilePicIndex2];
      PicIndexArray.push(randomPicArray[tilePicIndex2]);
    },
  };
};

const bilbo = playerFactory("Bilbo", true);
const frodo = playerFactory("Frodo", false);
const startGame = function () {
  const playBtn = document.querySelector(".play-button");
  const modal = document.querySelector(".start-game-modal");
  const activeBilbo = document.querySelector(".player-1-random");
  playBtn.addEventListener("click", function () {
    bilbo.generateTilePic();

    modal.classList.add("hidden");
    activeBilbo.classList.add("player-one-active");
  });
};

const tileClick = function () {
  const totalTilesClicked = [];
  const activeBilboStyle = document.querySelector(".player-1-random");
  const activeFrodoStyle = document.querySelector(".player-2-random");
  document.querySelectorAll(".grid-interact").forEach((tile) => {
    tile.addEventListener("click", (e) => {
      if (bilbo.active) {
        const name1 = `<img class="dynamic-tile-style" src="${PicIndexArray[0]}" '>`;
        e.target.classList.add("p1-clicked");
        tile.innerHTML = name1;
        totalTilesClicked.push("0");
        if (checkBilbo()) {
          const winMessage = document.querySelector(".dynamic-ending");
          winMessage.textContent = "Bilbo Wins!";
          document
            .querySelector(".game-finished-modal")
            .classList.remove("hidden");
        }
        checkTie(totalTilesClicked);
        e.target.classList.add("event-cancel");
        activeBilboStyle.classList.remove("player-one-active");
        activeFrodoStyle.classList.add("player-two-active");
        bilbo.active = false;
        frodo.active = true;
      } else if (frodo.active) {
        e.target.classList.add("p2-clicked");
        const name2 = `<img class="dynamic-tile-style" src="${PicIndexArray[1]}" '>`;
        tile.innerHTML = name2;
        totalTilesClicked.push("0");
        if (checkFrodo()) {
          const winMessage = document.querySelector(".dynamic-ending");
          winMessage.textContent = "Frodo Wins!";
          document
            .querySelector(".game-finished-modal")
            .classList.remove("hidden");
        }
        checkTie(totalTilesClicked);
        e.target.classList.add("event-cancel");
        activeBilboStyle.classList.add("player-one-active");
        activeFrodoStyle.classList.remove("player-two-active");
        frodo.active = false;
        bilbo.active = true;
      }
    });
  });
};

tileClick();
startGame();
const checkTie = function (arr) {
  if (arr.length == 9 && !checkBilbo() && !checkFrodo()) {
    const winMessage = document.querySelector(".dynamic-ending");
    winMessage.textContent = "Tie!";
    document.querySelector(".game-finished-modal").classList.remove("hidden");
  }
};

const checkBilbo = function () {
  const bilboDivs = [];

  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  makeGameBoard.tileArr.forEach((div) => {
    if (bilbo.active && div.classList.contains("p1-clicked")) {
      let tileNum = div.getAttribute("tileID");
      bilboDivs.push(tileNum);
    }
  });
  const bilboToNum = bilboDivs.map((str) => {
    return Number(str);
  });
  for (const arr of winCombos) {
    let allMatch = true;
    for (const el of arr) {
      if (!bilboToNum.includes(el)) {
        allMatch = false;
        break;
      }
    }
    if (allMatch) return true;
  }
  return false;
};
const checkFrodo = function () {
  const frodoDivs = [];
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  makeGameBoard.tileArr.forEach((div) => {
    if (frodo.active && div.classList.contains("p2-clicked")) {
      let tileNum = div.getAttribute("tileID");
      frodoDivs.push(tileNum);
    }
  });
  const frodoToNum = frodoDivs.map((str) => {
    return Number(str);
  });
  for (const arr of winCombos) {
    let allMatch = true;
    for (const el of arr) {
      if (!frodoToNum.includes(el)) {
        allMatch = false;
        break;
      }
    }
    if (allMatch) return true;
  }
  return false;
};
const exitGame = function () {
  let exitBtn = document.querySelector(".reset");
  exitBtn.addEventListener("click", function () {
    window.location.reload();
  });
};
exitGame();
