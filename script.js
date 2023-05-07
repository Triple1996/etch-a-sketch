const gridContainer = document.querySelector('#grid-container');
const redrawGridBtn = document.querySelector('#redraw-grid-button');
const resetBtn = document.querySelector('#reset-button');

let squaresPerSide = 16;

redrawGridBtn.addEventListener('click', redrawGrid);
resetBtn.addEventListener('click', resetGrid);
function createGrid(rows, cols){
    for (let i = 0; i < (rows * cols); i++){
        const boxItem = document.createElement('div');
        boxItem.addEventListener('mouseover', hoverEffect);
        // boxItem.setAttribute('filter', 'brightness(0)');
        gridContainer.appendChild(boxItem).className = "grid-box";
    }
}

function redrawGrid(){
    let userNumSquares;
    do {
        userNumSquares = prompt("enter number of squares per side (2-100)");
    } while (userNumSquares > 100 || userNumSquares < 2 || isNaN(userNumSquares))

    squaresPerSide = userNumSquares;
    gridContainer.style.setProperty('--number-rows', squaresPerSide);
    gridContainer.style.setProperty('--number-cols', squaresPerSide);

    resetGrid();
}

function resetGrid(){
    deleteGrid();
    createGrid(squaresPerSide, squaresPerSide);
}
function deleteGrid(){
    while (gridContainer.firstChild){
        gridContainer.removeChild(gridContainer.lastChild);
    }
}

function hoverEffect(e){
    //console.log(e.target.style.background);

    let currentBrightness = e.target.style.filter;
    let newBrightness = currentBrightness + 1;

    console.log("current: " + currentBrightness + " new: " + newBrightness);
    e.target.style.filter = "brightness(" + newBrightness + ")";

    let rgb1 = Math.floor(Math.random() * 255)
    let rgb2 = Math.floor(Math.random() * 255)
    let rgb3 = Math.floor(Math.random() * 255)

    let color = "rgb(" + rgb1+ ", " + rgb2 + ", " + rgb3 + ")";
    e.target.style.background = color;
}

createGrid(squaresPerSide, squaresPerSide);