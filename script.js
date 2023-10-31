const colorInput = document.querySelector('[aria-label="select pen color"]');
const rangeInput = document.querySelector('[aria-label="select grid size"]');
const clearButton = document.querySelector('#clearButton');

const sizePicker = document.querySelector('input[type="range"]');
const output = document.querySelector(".output");
const board1 = document.getElementById("board1");
const setColor = document.getElementById('genColor');

let painting = false;

sizePicker.oninput = () => {
    output.textContent = sizePicker.value;
  };

let selectedColor = colorInput.value;
console.log(selectedColor)

const setRandCol = () => {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    while (randomColor.length < 6) {
        randomColor = '0' + randomColor;
      }
    const newColor = document.getElementById('setColor');
    newColor.value = '#' + randomColor;
    selectedColor = newColor.value;
    console.log(newColor.value)
}

setColor.addEventListener("click", setRandCol)

colorInput.addEventListener("input", function() {
    selectedColor = colorInput.value;
});

board1.addEventListener("mousedown", function (event) {
    painting = true;
    paintSquare(event.target);
});

document.addEventListener("mouseup", function () {
    painting = false;
});

document.addEventListener("click", function (event) {
    if (!board1.contains(event.target) && painting) {
        painting = false;
    }
});

board1.addEventListener("mouseover", function (event) {
    if (painting) {
        paintSquare(event.target);
    }
});

function paintSquare(square) {
    if (square.classList.contains("square")) {
        square.style.backgroundColor = selectedColor;
    }
}

rangeInput.addEventListener('input', handleGridSizeChange);
clearButton.addEventListener('click', handleClearButtonClick);

function handleGridSizeChange(event) {
    const gridSize = event.target.value;
    let max = gridSize

    const board1 = document.getElementById("board1");
    const divElements = board1.getElementsByClassName("horizontal");

    for (let i = divElements.length - 1; i >= 0; i--) {
        board1.removeChild(divElements[i]);
    }
    makeGrid(gridSize)
    }

function handleClearButtonClick() {
    const board1 = document.getElementById("board1");
    const divElements = board1.getElementsByClassName("horizontal");

    for (let i = divElements.length - 1; i >= 0; i--) {
        board1.removeChild(divElements[i]);
    }
    makeGrid(max)
    }

function makeGrid(max) {
    const boardGrid = document.querySelector("#board1");
    let amount = 500 / max
    
    for (let i=0; i < max; i++) {
        const newContainer = document.createElement("div");
        newContainer.className = "horizontal"
        // console.log(i)
        boardGrid.appendChild(newContainer)
        for (let j=0; j < max; j++) {
            const newBox = document.createElement("div")
            newBox.className = "square"
            newBox.style.width = amount+"px";
            newBox.style.height = amount+"px";
            newContainer.appendChild(newBox)
            // console.log(j)
        }
    }
}

let max = 4
makeGrid(max)