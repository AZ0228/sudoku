//what to do
//make a function that assembles the board
//make class for wrong tile, selected tile, wrong and selected
//refresh board, make a clear function
//make container for all the tiles
//add click event listener to empty tiles
const board = [
  [0, 0, 2, 8, 0, 1, 3, 4, 9],
  [8, 0, 0, 0, 7, 3, 2, 5, 0],
  [0, 0, 4, 0, 0, 0, 8, 7, 0],
  [0, 9, 7, 0, 0, 0, 1, 3, 2],
  [1, 0, 0, 0, 3, 0, 0, 0, 0],
  [5, 8, 3, 0, 1, 9, 0, 0, 0],
  [9, 0, 0, 5, 6, 0, 0, 0, 7],
  [6, 7, 8, 3, 0, 0, 9, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 8, 3]
];
/*
const board = [
  [5, 3, 0, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];
*/
const wrong = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function parseSudoku(difficulty){
  
}

function printboard(){
  printarr(board);
}

function printarr(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
  console.log();
}

function full(){
  let full = true;
  let tiles = qsa('.empty');
  for(let i=0;i<tiles.length;i++){
    if(tiles[i].textContent==""){
      full = false;
    }
  }
  return full;
}

function checkValid(){
  let valid = true;
  let tiles = qsa('.tile');
  tiles.forEach(el => {el.classList.remove('wrong','wrong1')})
  let wrong = new Set();
  for(let i=0;i<tiles.length;i++){
    let row = new Map();
    let col = new Map();
    let rowtiles = qsa(`[data-row="${i}"]`);
    let coltiles = qsa(`[data-col="${i}"]`);
    rowtiles.forEach(tile => {
      if(tile.classList.contains('filled')||tile.classList.contains('filled1')){
        if(row.has(tile.textContent)){
          valid = false;
          row.get(tile.textContent).push(tile);
          row.get(tile.textContent).forEach(el => {
            if(el.classList.contains('filled1')){
              el.classList.add('wrong1');
            }
            el.classList.add('wrong');
          });
        } else {
          row.set(tile.textContent,[tile]);
        }
      }
    });
    coltiles.forEach(tile => {
      if(tile.classList.contains('filled')||tile.classList.contains('filled1')){
        if(col.has(tile.textContent)){
          valid = false;
          col.get(tile.textContent).push(tile);
          col.get(tile.textContent).forEach(el => {
            if(el.classList.contains('filled1')){
              el.classList.add('wrong1');
            }
            el.classList.add('wrong');
          });
        } else {
          col.set(tile.textContent,[tile]);
        }
      }
    });
  }
  for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
      let cell = new Map();
      let cellTiles = qsa(`[data-cellrow="${i}"][data-cellcol="${j}"]`);
      cellTiles.forEach(tile => {
        if(tile.classList.contains('filled')||tile.classList.contains('filled1')){
          if(cell.has(tile.textContent)){
            valid = false;
            cell.get(tile.textContent).push(tile);
            cell.get(tile.textContent).forEach(el => {
              if(el.classList.contains('filled1')){
                el.classList.add('wrong1');
              }
              el.classList.add('wrong');
            });
            } else {
            cell.set(tile.textContent,[tile]);
          }
        }
      });
    }
    wrong.forEach(el => {
      if(el.classList.contains('filled1')){
        console.log(1);
        el.classList.add('wrong1');
      } 
      el.classList.add('wrong');
    });
  }
  return valid;
}

function addAllTiles(){
  clearprevious();
  const container = document.getElementById('board-container');
  let selectedTile = null;
  for(let i=0; i<board.length;i++){
    for(let j=0;j<board[0].length;j++){
      const newDiv = document.createElement('p');
      newDiv.dataset.row = i;
      newDiv.dataset.col = j;
      newDiv.dataset.cellrow = Math.floor(i/3);
      newDiv.dataset.cellcol = Math.floor(j/3);
      newDiv.classList.add('tile');
      if(board[i][j]==0){
        newDiv.classList.add('empty')
      } else {
        newDiv.textContent = board[i][j];
        newDiv.classList.add('filled');
      }
      if((j+1)%3==0&&(j+1)%9!=0){
        newDiv.classList.add('right');
      }
      if((i+1)%3==0&&(i+1)%9!=0){
        newDiv.classList.add('bottom')
      }
        newDiv.addEventListener('click', function(){
        if (this.classList.contains('selected')) {
          // Tile is already selected, unselect it and all associated tiles
          this.classList.remove('selected');
          const row = this.dataset.row;
          const col = this.dataset.col;
          const cellR = this.dataset.cellrow;
          const cellC = this.dataset.cellcol;
          const rowEls = container.querySelectorAll(`[data-row="${row}"]`);
          const colEls = container.querySelectorAll(`[data-col="${col}"]`);
          const cellREls = container.querySelectorAll(`[data-cellrow="${cellR}"][data-cellcol="${cellC}"]`);
          rowEls.forEach(el => el.classList.remove('associated','associated-filled','filled1-associated'));
          colEls.forEach(el => el.classList.remove('associated','associated-filled','filled1-associated'));
          cellREls.forEach(el => el.classList.remove('associated','associated-filled','filled1-associated'));
          selectedTile = null;
        } else {
        //check if tile is empty
          if (selectedTile !== null) {
            selectedTile.classList.remove('selected');
            const prevRow = selectedTile.dataset.row;
            const prevCol = selectedTile.dataset.col;
            const prevCellR = selectedTile.dataset.cellrow;
            const prevCellC = selectedTile.dataset.cellcol;
            const prevRowEls = container.querySelectorAll(`[data-row="${prevRow}"]`);
            const prevColEls = container.querySelectorAll(`[data-col="${prevCol}"]`);
            const prevCellREls = container.querySelectorAll(`[data-cellrow="${prevCellR}"][data-cellcol="${prevCellC}"]`);
            prevRowEls.forEach(el => el.classList.remove('associated','associated-filled','filled1-associated'));
            prevColEls.forEach(el => el.classList.remove('associated','associated-filled','filled1-associated'));
            prevCellREls.forEach(el => el.classList.remove('associated','associated-filled','filled1-associated'));
          }
          this.classList.add('selected');
          selectedTile = this;
          const row = this.dataset.row;
          const col = this.dataset.col;
          const cellR = this.dataset.cellrow;
          const cellC = this.dataset.cellcol;
          const rowEls = container.querySelectorAll(`[data-row="${row}"]`);
          const colEls = container.querySelectorAll(`[data-col="${col}"]`);
          const cellREls = container.querySelectorAll(`[data-cellrow="${cellR}"][data-cellcol="${cellC}"]`);
          rowEls.forEach(el => {
            el.classList.add('associated');
            if(el.classList.contains('filled')){
              el.classList.add('associated-filled');
            } else if(el.classList.contains('filled1')){
              el.classList.add('filled1-associated');
            }
          });
          colEls.forEach(el => {
            el.classList.add('associated');
            if(el.classList.contains('filled')){
              el.classList.add('associated-filled');
            } else if(el.classList.contains('filled1')){
              el.classList.add('filled1-associated');
            }
          });
          cellREls.forEach(el => {
            el.classList.add('associated');
            if(el.classList.contains('filled')){
              el.classList.add('associated-filled');
            } else if(el.classList.contains('filled1')){
              el.classList.add('filled1-associated');
            }
          });
        }});
        newDiv.addEventListener('mouseover',function(){
          if((this.classList.contains('filled')||this.classList.contains('filled1'))&&!this.classList.contains('associated-filled')){
            this.classList.add('hover-filled')
          } else if(this.classList.contains('associated')){
            if(this.classList.contains('filled')){
              this.classList.add('hover-associated-filled');
            } else {
              this.classList.add('hover-filled');
            }
          } else {
            this.classList.add('hover');
          }
        });
        newDiv.addEventListener('mouseleave',function(){
          this.classList.remove('hover','hover-filled','hover-associated-filled');
        });
      container.appendChild(newDiv);
    }
  }
}

function clearprevious(){
  let tiles = qsa('.tile');
  for(let i=0; i<tiles.length;i++){
      tiles[i].remove();
    
  }

}
function numberButtons1(button){
  let tile = qsa('.selected');
  for(let i=0;i<tile.length;i++){
    if(tile[i].classList.contains('empty')){
      tile[i].textContent = button.textContent;
      tile[i].classList.add('filled1')
    }
  }
  if(checkValid()){
    if(full){
      console.log('done');
    }
  }
}

function noText(){
  let tiles = qsa('.tile');
  for(let i=0;i<tiles.length;i++){
    if((tiles[i].classList.contains('filled')||tiles[i].classList.contains('filled1'))&&!(tiles[i].classList.contains('associated')||tiles[i].classList.contains('wrong'))){
      tiles[i].style.color = "#CED7DD";
      console.log(1);
    } else if(tiles[i].classList.contains('wrong')){
      tiles[i].style.color = "#FFA3A3";
    }
    
  }
}

function qsa(selector){
  return document.querySelectorAll(selector);
}

function buttons(){
  const refreshLink = document.getElementById("refresh-link");
  refreshLink.addEventListener("click", (event) => {
    event.preventDefault(); // prevent the default behavior of the link
    location.reload();
  });

  const pauseButton = document.getElementById("pause");
  const blurScreen = document.getElementById("blur-screen");
  let isPaused = false;

  pauseButton.addEventListener("click", () => {
    isPaused = !isPaused;
    blurScreen.style.display = isPaused ? "block" : "none";
    if(isPaused){
      noText();
    } else {

    }
  });
  
  blurScreen.addEventListener("click", () => {
    //isPaused = false;
    //blurScreen.style.display = "none";
  });
}

function startAnimation(){
  const circle = document.querySelector('.circle');
  setTimeout(function() {
    circle.style.display = "block";
  },970);
  setTimeout(function() {
    circle.classList.add('expand');
  }, 1000);
  setTimeout(function() {
    document.querySelector('#loader').remove();
  },1800)
  setTimeout(function() {
    circle.classList.add('transparent');
  },1700)
  setTimeout(function() {
    circle.remove()
  }, 2500)
}

document.addEventListener("DOMContentLoaded", function() {
  addAllTiles();
  buttons();
  startAnimation();
});

