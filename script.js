const gridContainer = document.querySelector('#grid-container');
const redrawGridBtn = document.querySelector('#redraw-grid-button');
const resetBtn = document.querySelector('#reset-button');

let mouseDown = false;
let squaresPerSide = 16;

redrawGridBtn.addEventListener('click', redrawGrid);
resetBtn.addEventListener('click', resetGrid);

createGrid(squaresPerSide, squaresPerSide);


function createGrid(rows, cols){
    for (let i = 0; i < (rows * cols); i++){
        const boxItem = document.createElement('div');
        boxItem.addEventListener("mousedown", toggleMouseDown);
        boxItem.addEventListener("mouseup", toggleMouseUp);
        boxItem.addEventListener("mouseenter", hoverEffect);
        //boxItem.setAttribute('filter', 'brightness(0)');
        boxItem.style.background = "rgb(255, 255, 255)";
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

function hoverEffect(e){

    // if (mouseDown){
    //     console.log(e.target.style.background);
    //     let rgb1 = Math.floor(Math.random() * 255);
    //     let rgb2 = Math.floor(Math.random() * 255);
    //     let rgb3 = Math.floor(Math.random() * 255);

    //     let color = "rgb(" + rgb1+ ", " + rgb2 + ", " + rgb3 + ")";
    //     e.target.style.background = color;
    // }

    if (mouseDown){
        currentColor = e.target.style.background;
        let rgbVals = extractRgbVals(currentColor);
        console.log("mousedown: " + rgbVals);
        let currentRGB1 = rgbVals[0];
        let currentRGB2 = rgbVals[1];
        let currentRGB3 = rgbVals[2];

        let newColor = "rgb(" + (currentRGB1 - 35) + ", " + (currentRGB2 - 35) + ", " + (currentRGB3 - 35) + ")";
        e.target.style.background = newColor;
    }

}

function extractRgbVals(color){
    // color = rgb(x, y, z)
    color = color.replace(/[a-z(,)]/gi, '');
    let colors = color.split(" ");
    return colors;
}

function deleteGrid(){
    while (gridContainer.firstChild){
        gridContainer.removeChild(gridContainer.lastChild);
    }
}

function resetGrid(){
    deleteGrid();
    createGrid(squaresPerSide, squaresPerSide);
}

function toggleMouseDown(e){
    mouseDown = true;
    hoverEffect(e);
}

function toggleMouseUp(e){
    mouseDown = false;
}
