// Gameboard module pattern START
const makeGameBoard = (() => {
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
    makeBoard,
  };
})();

makeGameBoard.makeBoard();

// PLAYER FACTORY
// A player object is created "Bilbo" and "Frodo". A random image is assigned to each player that will serve as "X and O". This is the only part of the code that works well for me.
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

// PLAY/START GAME
// I don't know how to put the new player objects (bilbo and frodo) into the function and return them. If I put them inside the function and try to return them I either get errors or undefined no matter what I do. Ideally I'd like the player objects to be created when the play button is clicked and keep them out of the global scope.
const bilbo = playerFactory("Bilbo", true);
const frodo = playerFactory("Frodo", false);
const startGame = function () {
  const playBtn = document.querySelector(".play-button");
  const modal = document.querySelector(".start-game-modal");
  playBtn.addEventListener("click", function () {
    bilbo.generateTilePic();
    modal.classList.add("hidden");
  });
};

// TILE CLICK FUNCTION
// When a player clicks a tile their assigned picture will be placed on that tile. A class denoting which player clicked the tile will also be set. The active player is then switched. Yes...I know...my code is not "dry".
const tileClick = function () {
  document.querySelectorAll(".grid-interact").forEach((tile) => {
    tile.addEventListener("click", (e) => {
      console.log("clicked");
      if (bilbo.active) {
        const name1 = `<img class="dynamic-tile-style" src="${PicIndexArray[0]}" '>`;
        e.target.classList.add("p1-clicked");
        tile.innerHTML = name1;
        bilbo.active = false;
        frodo.active = true;
      } else if (frodo.active) {
        e.target.classList.add("p2-clicked");
        const name2 = `<img class="dynamic-tile-style" src="${PicIndexArray[1]}" '>`;
        tile.innerHTML = name2;
        frodo.active = false;
        bilbo.active = true;
      }
    });
  });
};

tileClick();
startGame();

// ----------------------------------------------------------
const checkWinner = function () {
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
};
