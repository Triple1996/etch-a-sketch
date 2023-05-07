const gridContainer = document.querySelector('#grid-container');
const redrawGridBtn = document.querySelector('#redraw-grid-button');

let squaresPerSide = 16;

redrawGridBtn.addEventListener('click', redrawGrid);

function createGrid(rows, cols){
    for (let i = 0; i < (rows * cols); i++){
        const boxItem = document.createElement('div');
        boxItem.addEventListener('mouseover', hoverEffect);
        gridContainer.appendChild(boxItem).className = "grid-box";
    }
}

function redrawGrid(){
    let userNumSquares = prompt("enter number of squares per side");
    squaresPerSide = userNumSquares;
    gridContainer.style.setProperty('--number-rows', squaresPerSide);
    gridContainer.style.setProperty('--number-cols', squaresPerSide);
    console.log("changed sides");
    deleteGrid();
    createGrid(squaresPerSide, squaresPerSide);
}

function deleteGrid(){
    while (gridContainer.firstChild){
        gridContainer.removeChild(gridContainer.lastChild);
    }
}

function hoverEffect(e){
    console.log("hovering");   
    e.target.style.background = 'red';
}

createGrid(squaresPerSide, squaresPerSide);