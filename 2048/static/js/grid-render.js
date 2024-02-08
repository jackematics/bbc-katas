function renderTiles() {
  const grid = document.getElementById("grid");
  const tileClasses =
    "bg-container-dark-blue relative rounded-lg col-span-1 row-span-1 flex-none border-2 border-black";

  for (row = 0; row < 4; row++) {
    for (col = 0; col < 4; col++) {
      const tile = document.createElement("div");
      tile.className = tileClasses;
      grid.appendChild(tile);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderTiles();
});
