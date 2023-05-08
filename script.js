const SHADING_DARKENING_RATE = 35;
const STARTING_SQUARE_COLOR = "rgb(255, 255, 255)";
const RAINBOW_MODE = "rainbow";
const SHADING_MODE = "shading";


const gridContainer = document.querySelector('#grid-container');
const redrawGridBtn = document.querySelector('#redraw-grid-button');
const resetBtn = document.querySelector('#reset-button');
const rainbowBtn = document.querySelector('#rainbow-button');
const shadingBtn = document.querySelector('#shading-button');

redrawGridBtn.addEventListener('click', redrawGrid);
resetBtn.addEventListener('click', resetGrid);
rainbowBtn.addEventListener('click', toggleRainbowMode);
shadingBtn.addEventListener('click', toggleShadingMode);

let drawingMode = RAINBOW_MODE;
let mouseDown = false;
let squaresPerSide = 16;

createGrid(squaresPerSide, squaresPerSide);

function troll(){
    console.error("test");
}
function createGrid(rows, cols){
    for (let i = 0; i < (rows * cols); i++){
        const boxItem = document.createElement('div');
        boxItem.addEventListener("mousedown", toggleMouseDown);
        boxItem.addEventListener("mouseup", toggleMouseUp);
        boxItem.addEventListener("mouseenter", hoverEffect);
        boxItem.style.background = STARTING_SQUARE_COLOR;
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

    if (!mouseDown) return;

    let rgb1, rgb2, rgb3;
    switch (drawingMode){
        case RAINBOW_MODE:
            rgb1 = Math.floor(Math.random() * 255);
            rgb2 = Math.floor(Math.random() * 255);
            rgb3 = Math.floor(Math.random() * 255);
            color = "rgb(" + rgb1+ ", " + rgb2 + ", " + rgb3 + ")";
            e.target.style.background = color;
            break;
        case SHADING_MODE:
            currentColor = e.target.style.background;
            let rgbVals = extractRgbVals(currentColor);
            rgb1 = rgbVals[0];
            rgb2 = rgbVals[1];
            rgb3 = rgbVals[2];
            newColor = "rgb(" 
                + (rgb1 - SHADING_DARKENING_RATE) + ", " 
                + (rgb2 - SHADING_DARKENING_RATE) + ", " 
                + (rgb3 - SHADING_DARKENING_RATE) + ")";   
            e.target.style.background = newColor;
            break;
        default:
            console.error("drawingMode is not set")
    }
}

function toggleRainbowMode(){
 drawingMode = RAINBOW_MODE;
}

function toggleShadingMode(){
    drawingMode = SHADING_MODE;
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
