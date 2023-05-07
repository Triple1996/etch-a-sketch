const SHADING_DARKENING_RATE = 35;
const STARTING_SQUARE_COLOR = "rgb(255, 255, 255)";

const gridContainer = document.querySelector('#grid-container');
const redrawGridBtn = document.querySelector('#redraw-grid-button');
const resetBtn = document.querySelector('#reset-button');
const rainbowBtn = document.querySelector('#rainbow-button');
const shadingBtn = document.querySelector('#shading-button');

redrawGridBtn.addEventListener('click', redrawGrid);
resetBtn.addEventListener('click', resetGrid);
rainbowBtn.addEventListener('click', toggleRainbowMode);
shadingBtn.addEventListener('click', toggleShadingMode);

let shadingMode = false;
let rainbowMode = true;
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

    if (mouseDown){
        if (rainbowMode){
            if (mouseDown){
                let rgb1 = Math.floor(Math.random() * 255);
                let rgb2 = Math.floor(Math.random() * 255);
                let rgb3 = Math.floor(Math.random() * 255);
    
                let color = "rgb(" + rgb1+ ", " + rgb2 + ", " + rgb3 + ")";
                e.target.style.background = color;
            }
        }
        else if (shadingMode){
            if (mouseDown){
                currentColor = e.target.style.background;
                let rgbVals = extractRgbVals(currentColor);
                let currentRGB1 = rgbVals[0];
                let currentRGB2 = rgbVals[1];
                let currentRGB3 = rgbVals[2];
    
                let newColor = "rgb(" 
                    + (currentRGB1 - SHADING_DARKENING_RATE) + ", " 
                    + (currentRGB2 - SHADING_DARKENING_RATE) + ", " 
                    + (currentRGB3 - SHADING_DARKENING_RATE) + ")";
                e.target.style.background = newColor;
            }
        }
        else {
            console.error("rainbowMode and shadingMode both equal to false")
        }
    }
}

function toggleRainbowMode(){
    resetModes();
    rainbowMode = true;
}

function toggleShadingMode(){
    resetModes();
    shadingMode = true;
}

function resetModes(){
    rainbowMode = false;
    shadingMode = false;
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
