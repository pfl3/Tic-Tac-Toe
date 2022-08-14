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
document.querySelectorAll(".grid-interact").forEach((tile) => {
  tile.addEventListener("click", () => {
    let ID = tile.getAttribute("tileID");
    tile.classList.add("color");
    console.log(`You clicked tile ${ID}`);
  });
});

// Factory functions START

const playerFactory = function (name) {};
