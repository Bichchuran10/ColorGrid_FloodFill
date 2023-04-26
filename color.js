const colors = [  '#FF0000' ,'#FFA500','#FFFF00','#3CB043','#00BFFF',"#5c6dc9","#192586",'#8F00FF','#FF007F',"#964b00"] // Red ,Orange,Yellow,Green, Blue,Indigo ,dark blue,violet,pink,brown

const colorGrid = document.querySelector('.color-grid');
const numRows = 10;
const numCols = 10;
let grid = [];
const redArray=[0,1,2,3,10,11,12,13,20,21,22,23,30,31,32,33,41,42,51,52,61,62,71,72]
const greenArray=[40,50,60,70,80,81,82,83,84,90,91,92,93,94]
const orangeArray=[4,5,6,7,8,9,14,15,16,17,24,25,26,27,34,35,36,37]
const violetArray=[85,86,87,88,89,95,96,97,98,99]
const pinkArray=[18,19,28,29,38,39,48,49,58,59,68,69,78,79]
const skyBlueArray=[43,44,45,46,47,53,54,55,56,57,63,64,65,66,67,73,74,75,76,77]
// Initialize grid with given colors
for (let i = 0; i < numRows; i++) {
  let row = [];
  const tr = document.createElement('tr');
  for (let j = 0; j < numCols; j++) {
    const cell = document.createElement('td');
    cell.classList.add('color-cell');
    //let color = colors[Math.floor(Math.random() * colors.length)]; //for random grid generation
    let color;
    if(redArray.includes(i*10+j))
    {
        color=colors[0]
    }
    else if(greenArray.includes(i*10+j))
    {
        color=colors[3]
    }
    else if(orangeArray.includes(i*10+j))
    {
        color=colors[1]
    }
    else if(violetArray.includes(i*10+j))
    {
        color=colors[7]
    }
    else if(pinkArray.includes(i*10+j))
    {
        color=colors[8]
    }
    else if(skyBlueArray.includes(i*10+j))
    {
        color=colors[4]
    }
    cell.style.backgroundColor = color;
    row.push(color);
    tr.appendChild(cell);
  }
  grid.push(row);
  colorGrid.appendChild(tr);
}


// Add event listener to color grid
colorGrid.addEventListener('click', (event) => {
  const selectedCell = colorGrid.querySelector('.selected');
  if (selectedCell) {
    selectedCell.classList.remove('selected');
  }
  if (event.target.matches('.color-cell')) {
    event.target.classList.add('selected');
  }
});

// Flood fill algorithm
function floodFill(row, col, newColor, oldColor) {
  if (row < 0 || row >= numRows || col < 0 || col >= numCols) {
    return;
  }
  const cell = colorGrid.rows[row].cells[col];
  const color = grid[row][col];
  if (color !== oldColor || color === newColor) {
    return;
  }
  cell.style.backgroundColor = newColor;
  grid[row][col] = newColor;
  floodFill(row - 1, col, newColor, oldColor); // Fill north
  floodFill(row + 1, col, newColor, oldColor); // Fill south
  floodFill(row, col - 1, newColor, oldColor); // Fill west
  floodFill(row, col + 1, newColor, oldColor); // Fill east
}



//pick color
const colorCells = document.querySelectorAll('.pick-color-cell');
  let customColor;

  colorCells.forEach((cell) => {
    cell.addEventListener('click', (event) => {
      customColor = event.target.getAttribute('bgcolor') //style.bgcolor; //backgroundColor;
      console.log('Selected color:', customColor);

      const selectedCell = colorGrid.querySelector('.selected');
      if (selectedCell) {
      const rowIndex = selectedCell.parentNode.rowIndex;
      const colIndex = selectedCell.cellIndex;
      const oldColor = grid[rowIndex][colIndex];
      floodFill(rowIndex, colIndex, customColor, oldColor);
      grid[rowIndex][colIndex] = customColor;
    }

    });
  });

 