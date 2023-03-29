

//what to do
//make a function that assembles the board
//make class for wrong tile, selected tile, wrong and selected
//refresh board, make a clear function
//make container for all the tiles
//add click event listener to empty tiles
const boards = [
  [
    ['301086504046521070500000001400800002080347900009050038004090200008734090007208103'],
    ['800134902041096080005070010008605000406310009023040860500709000010080040000401006'],
    ['000003610000015007000008090086000700030800100500120309005060904060900530403701008'],
    ['007300054245080900003040070070960000000020760000801002008294016609108020000007003'],
    ['087002010204017003006800705508001000640008100002050670439180007020900030700023091'],
    ['040000008760020349000470500900000030000036702308947000000004010200700603690001000']
  ],
  [
    ['048301560360008090910670003020000935509010200670020010004002107090100008150834029'],
    ['008317000004205109000040070327160904901450000045700800030001060872604000416070080'],
    ['561092730020780090900005046600000427010070003073000819035900670700103080000000050'],
    ['165293004000001632023060090009175000500900018002030049098000006000000950000429381'],
    ['960405100020060504001703006100004000490130050002007601209006038070218905600079000'],
    ['001408006093520741000010520602080300007060000005039060064052109020000654500607083']
  ],
  [
    ['070000043040009610800634900094052000358460020000800530080070091902100005007040802'],
    ['040890630000136820800740519000467052450020700267010000520003400010280970004050063'],
    ['310450900072986143906010508639178020150090806004003700005731009701829350000645010'],
    ['405001068073628500009003070240790030006102005950000021507064213080217050612300007'],
    ['904520070001890240002643000070960380000108700600000010090080000000750030000312569'],
    ['320090400705021800001060372218037009500480700000005000670000280000873900804000107']
  ]
];


const board = [
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
let boardIndex;
let boardDifficulty = 1;
let wrongStatus = false;
let numberWrong = 0;
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
];*/

let isPaused=false;

function generateRandom(){
  const min=1;
  const max= 6;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

function parseSudoku(difficulty) {
  let index = boardIndex;
  while (index == boardIndex) {
    index = Math.floor(Math.random() * 6); // generates a random number between 0 and 5
  }
  boardIndex = index;
  const boardString = boards[difficulty][boardIndex][0];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      board[i][j] = parseInt(boardString[i * 9 + j]);
    }
  }
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

function addWrong(){
  if(wrongStatus){
    wrongStatus = false;
    numberWrong+=1;
    let mistake = qsa(".mistake");
    mistake[Math.min(3,numberWrong-1)].classList.add("transform1");
    for(let i=0;i<numberWrong&&i<4;i++){
      mistake[i].classList.add('mistake-made');
    }
  }
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
          wrongStatus = true;
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
          wrongStatus = true;
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
            wrongStatus = true;
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
  addWrong();
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

function pause() {
  // Get all tiles
  const tiles = document.querySelectorAll('.tile');
  const blur1 = document.getElementById('blur1');
  blur1.style.display = "flex";
  const play = document.getElementById('play1');
  const pause = document.getElementById('pause');
  pause.style.backgroundImage = 'url("play2.png")';
  // Loop through tiles
  tiles.forEach(tile => {
    // Get background color
    const backgroundColor = window.getComputedStyle(tile).getPropertyValue('background-color');
    // Set text color to background color
    //tile.style.color = backgroundColor;
    tile.style.color = backgroundColor;
    tile.style.pointerEvents = 'none';
    tile.classList.add('transform');
  });
  play.classList.add('transform');
  // Handle pause functionality here
}

function unpause() {
  isPaused = false;
  const blurScreen = document.getElementById("blur-screen");
  const blur1 = document.getElementById('blur1');
  blurScreen.style.display = "none";
  blur1.style.display = "none";
  const pause = document.getElementById('pause');
  const play = document.getElementById('play1');
  pause.style.backgroundImage = 'url("pause1.png")';
  // Get all the tiles on the page
  const tiles = document.querySelectorAll('.tile');
  // Loop through each tile and set the text color back to its original value
  tiles.forEach(tile => {
    //tile.style.color = tile.style.backgroundColor;
    tile.style.color = tile.style.backgroundColor;
    tile.style.pointerEvents = 'auto';
    tile.classList.remove('transform');
  });
  play.classList.remove('transform');

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
  isPaused = false;

  pauseButton.addEventListener("click", () => {
    isPaused = !isPaused;
    blurScreen.style.display = isPaused ? "block" : "none";
    if(isPaused){
      pause();
    } else {
      unpause();
    }
  });
  
  blurScreen.addEventListener("click", () => {
    isPaused = false;
    blurScreen.style.display = "none";
  });
}

function erase(){
  if(!isPaused){
    let tile = qsa(".selected");
    for(let i=0;i<tile.length;i++){
      if(!tile[i].classList.contains('filled')){
        tile[i].textContent = "";
        tile[i].classList.remove('filled1','wrong1');
        checkValid();
      }
    }
  }
}

function difficulty(){
  const easy = document.getElementById("easy");
  const medium = document.getElementById("medium");
  const hard = document.getElementById("hard");
  if(boardDifficulty == 1){
    boardDifficulty +=1;
    easy.classList.remove("easy");
    easy.classList.add("medium");
    medium.classList.add("medium");
  } else if(boardDifficulty == 2){
    boardDifficulty +=1;
    easy.classList.remove("medium");
    medium.classList.remove("medium");
    easy.classList.add("hard");
    medium.classList.add("hard");
    hard.classList.add("hard");
  } else {
    boardDifficulty = 1;
    easy.classList.remove("hard");
    medium.classList.remove("hard");
    hard.classList.remove("hard");
    easy.classList.add("easy");
  }
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
  parseSudoku(1); 
  addAllTiles();

  buttons();
  startAnimation();
  
});

