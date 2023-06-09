const SHADING_DARKENING_RATE = 35;
const STARTING_SQUARE_COLOR = "rgb(255, 255, 255)";
const RAINBOW_MODE = "rainbow";
const SHADING_MODE = "shading";
const COLOR_MODE = "color";
const DEFAULT_SQUARES_PER_SIDE = 16;

const gridContainer = document.querySelector('#grid-container');
const slider = document.querySelector('#slider');
const sliderDisplay = document.querySelector('#slider-display');
const colorSelector = document.querySelector('#color-picker');
const colorBtn = document.querySelector('#color-button');
const rainbowBtn = document.querySelector('#rainbow-button');
const shadingBtn = document.querySelector('#shading-button');
const resetBtn = document.querySelector('#reset-button');

resetBtn.addEventListener('click', resetGrid);
rainbowBtn.addEventListener('click', toggleRainbowMode);
shadingBtn.addEventListener('click', toggleShadingMode);

let drawingMode = RAINBOW_MODE;
let mouseDown = false;
let squaresPerSide = slider.value;

slider.oninput  = function(){
    squaresPerSide = this.value;
    gridContainer.style.setProperty('--number-rows', squaresPerSide);
    gridContainer.style.setProperty('--number-cols', squaresPerSide);
    sliderDisplay.innerHTML = squaresPerSide + " x " + squaresPerSide;
    resetGrid();
}

function refresh(){
    slider.value = squaresPerSide;
    gridContainer.style.setProperty('--number-rows', squaresPerSide);
    gridContainer.style.setProperty('--number-cols', squaresPerSide);
    if (rainbowBtn.checked){
        drawingMode = RAINBOW_MODE;
    }
    else if (shadingBtn.checked){
        drawingMode = SHADING_MODE;
    }
    else if (colorBtn.checked){
        drawingMode = COLOR_MODE;
    }
    sliderDisplay.innerHTML = squaresPerSide + " x " + squaresPerSide;
}

function createGrid(rows, cols){
    for (let i = 0; i < (rows * cols); i++){
        const boxItem = document.createElement('div');
        boxItem.addEventListener("mousedown", toggleMouseDown);
        boxItem.addEventListener("mouseup", toggleMouseUp);
        boxItem.addEventListener("mouseenter", hoverEffect);
        boxItem.addEventListener("mouseexit", hoverEffect);
        boxItem.style.background = STARTING_SQUARE_COLOR;
        gridContainer.appendChild(boxItem).className = "grid-box";
    }
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

function hoverEffect(e){
    if (!mouseDown) return;

    switch (drawingMode){
        case RAINBOW_MODE:
            let rgb1, rgb2, rgb3;
            rgb1 = Math.floor(Math.random() * 255);
            rgb2 = Math.floor(Math.random() * 255);
            rgb3 = Math.floor(Math.random() * 255);
            color = "rgb(" + rgb1 + ", " + rgb2 + ", " + rgb3 + ")";
            e.target.style.background = color;
            break;
        case SHADING_MODE:
            currentColor = e.target.style.background;
            let rgbVals = extractRgbVals(currentColor);
            newColor = "rgb(" 
                + (rgbVals[0] - SHADING_DARKENING_RATE) + ", " 
                + (rgbVals[1] - SHADING_DARKENING_RATE) + ", " 
                + (rgbVals[2] - SHADING_DARKENING_RATE) + ")";   
            e.target.style.background = newColor;
            break;
        case COLOR_MODE:
            e.target.style.background = colorSelector.value;
            break;
        default:
            console.error("drawingMode is not set")
            break;
    }
}

function extractRgbVals(color){
    // color = rgb(x, y, z)
    color = color.replace(/[a-z(,)]/gi, '');
    let colors = color.split(" ");
    return colors;
}


function toggleColorMode(){
    if (!colorBtn.checked) colorBtn.checked = true;
    drawingMode = COLOR_MODE;
}

function toggleRainbowMode(){
    drawingMode = RAINBOW_MODE;
}
   
function toggleShadingMode(){
    drawingMode = SHADING_MODE;
}
   
function toggleMouseDown(e){
    mouseDown = true;
    hoverEffect(e);
}

function toggleMouseUp(e){
    mouseDown = false;
}

refresh();
createGrid(squaresPerSide, squaresPerSide);
