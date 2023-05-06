const gridContainer = document.querySelector('#grid-container');

// create a 16 x 16 grid of divs
boxItem = document.createElement('div');
boxItem.setAttribute('class', 'created');

gridContainer.appendChild(boxItem);
gridContainer.appendChild(boxItem);
gridContainer.appendChild(boxItem);
gridContainer.appendChild(boxItem);
gridContainer.appendChild(boxItem);
gridContainer.appendChild(boxItem);
gridContainer.appendChild(boxItem);
gridContainer.appendChild(boxItem);
gridContainer.appendChild(document.createElement('button'));
