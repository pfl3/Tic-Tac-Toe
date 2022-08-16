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
      console.log(tile);
    }
  }
  return {
    tileBoard: makeBoard,
    tileArray: tileArr,
  };
})();
makeGameBoard.tileBoard();
// click tile
document.querySelectorAll(".grid-interact").forEach((tile) => {
  tile.addEventListener("click", () => {
    let ID = tile.getAttribute("tileID");
    tile.classList.add("color");

    console.log(`You clicked tile ${ID}`);
  });
});

// Factory functions START

const playerFactory = function (name) {
  function generateTilePic() {
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
    tilePicIndex = [Math.floor(Math.random() * randomPicArray.length)];
    document.querySelector(".player-1-random").src =
      randomPicArray[tilePicIndex];
    console.log(tilePicIndex);
  }
  return { name };
};

const playGame = function () {
  const sam = playerFactory("Sam");
  const frodo = playerFactory("Frodo");
  // function generateTilePic() {
  //   tilePic = Math.random(Math.floor() * makeGameBoard.tileArray.length);
  //   return tilePic;
  // }
};
const play = playGame;
play();

const gamePlay = function () {};
