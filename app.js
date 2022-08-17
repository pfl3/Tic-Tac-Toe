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
      tileArr.push(tile[i]);
    }
  }
  return {
    tileBoard: makeBoard,
    tileArray: tileArr,
  };
})();
makeGameBoard.tileBoard();

// Factory functions START
// ////////////////////////////////////////////////
// PLAYER FACTORY
const PicIndexArray = [];
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
      // /////
      tilePicIndex2 = [Math.floor(Math.random() * randomPicArray.length)];
      document.querySelector(`.player-2-random`).src =
        randomPicArray[tilePicIndex2];
      PicIndexArray.push(randomPicArray[tilePicIndex2]);
      console.log(PicIndexArray);
    },
  };
};
const bilbo = playerFactory("Bilbo", true);
const frodo = playerFactory("Frodo", false);
// PLAY/START GAME

const startGame = function () {
  const playBtn = document.querySelector(".play-button");
  const modal = document.querySelector(".start-game-modal");
  playBtn.addEventListener("click", function () {
    // const bilbo = playerFactory("Bilbo", true);
    // const frodo = playerFactory("Frodo", false);
    bilbo.generateTilePic();
    modal.classList.add("hidden");
  });
};
const play = startGame();

// Game Logic
const bilbosClicks = [];
const frodosClicks = [];

document.querySelectorAll(".grid-interact").forEach((tile) => {
  tile.addEventListener("click", (e) => {
    if (bilbo.active) {
      let tileId = Number(e.target.getAttribute("tileID"));
      bilbosClicks.push(tileId);
      console.log(`Bilbo clicked tile ${tileId}`, bilbosClicks);

      const name1 = `<img class="dynamic-tile-style" src="${PicIndexArray[0]}" '>`;
      tile.innerHTML = name1;
      checkWinner();
      bilbo.active = false;
      frodo.active = true;
    } else if (frodo.active) {
      let tileId = Number(e.target.getAttribute("tileID"));
      frodosClicks.push(tileId);
      console.log(`Frodo clicked tile ${tileId}`, frodosClicks);
      const name2 = `<img class="dynamic-tile-style" src="${PicIndexArray[1]}" '>`;
      tile.innerHTML = name2;
      frodo.active = false;
      bilbo.active = true;
    }

    // console.log(`You clicked tile ${ID}`);
  });
});

const checkWinner = function () {};
