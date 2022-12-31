const o = Math.round,
  r = Math.random,
  colors = [],
  message = document.getElementById("message"),
  resetBtn = document.getElementById("reset"),
  squaresContainer = document.getElementById("squares-container"),
  title = document.querySelector("h1"),
  easyButton = document.getElementById("easyButton"),
  hardButton = document.getElementById("hardButton"),
  squaresContainerWidth = 80;
let pickedColor;

function random_rgba() {
  const s = 255;
  return "rgb(" + o(r() * s) + ", " + o(r() * s) + ", " + o(r() * s) + ")";
}

function removeAllSquares(parent) {
  while (parent.firstChild) parent.removeChild(parent.firstChild);
}

function startGame(numberOfColors = 6) {
  removeAllSquares(squaresContainer);
  styleSquaresContainer(numberOfColors);
  createSquares(numberOfColors);
  setWinnerColor(numberOfColors);
}

startGame(6);

function styleSquaresContainer(numberOfColors) {
  const percentage =
    (squaresContainerWidth * Math.ceil(numberOfColors / 3)) / 3;
  squaresContainer.style.height = `${percentage}vw`;
}

function setBackgroundColor(el, color) {
  el.style.backgroundColor = color;
}

function setWinnerColor(numberOfColors) {
  pickedColor = colors[o(r() * (numberOfColors - 1))];
  document.getElementById("colorDisplay").textContent = pickedColor;
}

function createSquares(numberOfColors) {
  for (let i = 0; i < numberOfColors; i++) {
    colors[i] = random_rgba();
    const newSquare = document.createElement("div");
    newSquare.classList.add("col", "square");
    setBackgroundColor(newSquare, colors[i]);

    newSquare.addEventListener("click", function (e) {
      if (this.style.backgroundColor !== pickedColor) {
        setBackgroundColor(this, "white");
        message.textContent = "Try again!";
      } else {
        message.style.opacity = 0.95;
        message.textContent = "Correct!";
        paintAll();
        resetBtn.textContent = "Play again?";
        title.style.color = pickedColor;
      }
    });
    squaresContainer.appendChild(newSquare);
  }
}

function paintAll(numberOfColors) {
  const squares = document.querySelectorAll(".square");
  squares.forEach((element) => {
    console.log(element);
    setBackgroundColor(element, pickedColor);
  });
}

function reset(numberOfColors) {
  title.style.color = "black";
  message.textContent = "";
  resetBtn.textContent = "New Colors";
  message.style.opacity = 0;
  if (easyButton.classList.contains("btn-danger")) startGame(3);
  if (hardButton.classList.contains("btn-danger")) startGame(6);
}

resetBtn.addEventListener("click", reset);

function setSelected(e, numberOfColors) {
  if (e.target.isEqualNode(easyButton)) toggleClasses(easyButton, hardButton);
  else toggleClasses(hardButton, easyButton);
  reset(numberOfColors);
}

function toggleClasses(el1, el2) {
  el1.classList.remove("btn-secondary");
  el1.classList.add("btn-danger");
  el2.classList.remove("btn-danger");
  el2.classList.add("btn-secondary");
}

easyButton.addEventListener("click", (e) => setSelected(e, 3));
hardButton.addEventListener("click", (e) => setSelected(e, 6));
