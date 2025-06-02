const grid = document.getElementById("grid");
const cells = [];
const size = 16;
let start = null;
let end = null;

for (let i=0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.addEventListener('click', () => handleClick(i));
    grid.appendChild(cell);
    cells.push(cell);
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