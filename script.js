const gridContainer = document.querySelector('#grid-container');

// create a 16 x 16 grid of divs
for (let i = 0; i < 10; i++){
    const boxItem = document.createElement('div');
    gridContainer.appendChild(boxItem).className = "grid-box";
}
