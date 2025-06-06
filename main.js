const grid = document.getElementById("grid");
const cells = [];
const size = 16;
let start = null;
let end = null;
const min = 6; 
const max = 180;
const redCells = Math.floor(Math.random() * (max - min +1)) + min; 
let pickedIndexes;

for (let i=0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.addEventListener('click', () => handleClick(i));
    grid.appendChild(cell);
    cells.push(cell);
}

generateRedCells();

function generateRedCells() {
    const redCells = Math.floor(Math.random() * (max - min + 1)) + min; 
    pickedIndexes = [];

    for (let i = 0; i < redCells; i++) {
        let index;
        do {
            index = Math.floor(Math.random() * cells.length);
        } while (pickedIndexes.includes(index));
        pickedIndexes.push(index);
        cells[index].style.backgroundColor = 'red';
    }
    
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

function indexToCoordinate(index) {
    return [index % size, Math.floor(index / size)];
}

function coordToIndex(x, y) {
    return y * size + x;
}

function showPath(startIndex, endIndex) {
    const queue = [startIndex];
    const visited = new Set();
    const cameFrom = {};
    visited.add(startIndex);

    while (queue.length > 0) {
        const current = queue.shift();

        if (current === endIndex) {
            break;
        }

        const [x, y] = indexToCoordinate(current);
        const neighbors = [
            [x + 1, y],
            [x - 1, y],
            [x, y + 1],
            [x, y - 1],
        ];

        for (const [nx, ny] of neighbors) {
            if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
                const neighborIndex = coordToIndex(nx, ny);
                
                if (visited.has(neighborIndex) || cells[neighborIndex].style.backgroundColor === 'red')
                { continue;
                }

                queue.push(neighborIndex);
                visited.add(neighborIndex);
                cameFrom[neighborIndex] = current;
            }
        }
    }    

    let current = endIndex;
    const path = [];
    while (current !== startIndex) {
        path.push(current);
        current = cameFrom[current];

        if (current === undefined) {
            alert("No path found.");
            return;
        }
    }
    path.reverse;

    for (const i of path) {
        if (i !== startIndex && i !== endIndex) {
            cells[i].style.backgroundColor = "black";
        }
    }
}

function resetLayout() {
    start = null;
    end = null;

    for (const cell of cells) {
        cell.style.backgroundColor = "";
    }
    generateRedCells();
}

document.getElementById("reset").addEventListener('click', resetLayout);


// Add in Breadth-First Search functionality. - Done
// Consider making the red cells into a set? or list.
// Add a reset button.
// Add a previous layout button.
// Count how many cells the path is.