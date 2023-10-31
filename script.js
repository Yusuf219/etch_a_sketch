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
    removeColoredClassFromSquares();
    console.log(newColor.value)
}

setColor.addEventListener("click", setRandCol)

function removeColoredClassFromSquares() {
    const squareElements = document.querySelectorAll(".square");

    squareElements.forEach((square) => {
        square.classList.remove("colored");
    });
}

colorInput.addEventListener("input", function() {
    selectedColor = colorInput.value;
    removeColoredClassFromSquares();
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

// function paintSquare(square) {
//     if (square.classList.contains("square")) {
//         square.style.backgroundColor = selectedColor;
//     }
// }

function rgbToHex(r, g, b) {
    const toHex = (value) => value.toString(16).padStart(2, '2');
    const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    return hexColor;
}

function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
}

// function darkenColor(color, percentage) {
//     const rgbValues = color.match(/\d+/g);
//     let r = parseInt(rgbValues[0]);
//     let g = parseInt(rgbValues[1]);
//     let b = parseInt(rgbValues[2]);

//     r = Math.max(0, Math.floor(r * (1 - percentage / 100)));
//     g = Math.max(0, Math.floor(g * (1 - percentage / 100)));
//     b = Math.max(0, Math.floor(b * (1 - percentage / 100)));

//     return `rgb(${r}, ${g}, ${b})`;
// }

function paintSquare(square) {
    let currentColor = square.style.backgroundColor;
    let newSelectedColor = hexToRgb(selectedColor)
    let currentColorClass = currentColor.replace(/[^a-zA-Z0-9]/g, '_');
    // if (currentColor === newSelectedColor || square.classList.contains(currentColorClass)) {
    if (square.classList.contains("square")) { 
        console.log("one")
        if (!square.classList.contains("colored")) {
            square.style.backgroundColor = selectedColor
            square.classList.add("colored")
        }
        else {
            const rgbValues = currentColor.match(/\d+/g);
            const r = Math.floor(rgbValues[0] * 0.9);
            const g = Math.floor(rgbValues[1] * 0.9);
            const b = Math.floor(rgbValues[2] * 0.9);
            square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        }
    }
    else {
        // console.log(currentColor)
        // console.log(newSelectedColor)
        // square.style.backgroundColor = selectedColor
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