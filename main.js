const grid = document.getElementById("grid");
const cells = [];
const size = 16;
let start = null;
let end = null;
const min = 6; 
const max = 200;
const redCells = Math.floor(Math.random() * (max - min +1)) + min; 
let pickedIndexes = [];

for (let i=0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.addEventListener('click', () => handleClick(i));
    grid.appendChild(cell);
    cells.push(cell);
}

for (let i = 0; i < redCells; i++) {
    let index;
    do {
        index = Math.floor(Math.random() * cells.length);
    } while (pickedIndexes.includes(index));
    pickedIndexes.push(index);
    cells[index].style.backgroundColor = 'red';
}


function handleClick(index) {
    if (start === null) {
        start = index;
        cells[index].style.backgroundColor = "blue";
    } else if (end === null && index !== start) {
        end = index;
        cells[index].style.backgroundColor = "blue";
        showPath(start, end);
    }        
}

function showPath(startIndex, endIndex) {
    const path = [startIndex, endIndex];
    for (const i of path) {
        if (i !== startIndex && i !== endIndex) {
            cells[i].style.backgroundColor = "green";
        }
    }
} 