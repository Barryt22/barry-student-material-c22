const unitLength = 20;
const boxColor = 150;
const strokeColor = 50;
let columns; /* To be determined by window width */
let rows;    /* To be determined by window height */
let currentBoard;
let nextBoard;
let start = true;
let selectedSurvival = "normal";
let reproduction = true;
let prevMouseX = 0
let prevMouseY = 0
let fr = 5;
let a;
let b;

function setup() {

    /* Set the canvas to be under the element #canvas*/
    const canvas = createCanvas(windowWidth, windowHeight - 250);
    canvas.parent(document.querySelector('#canvas'));


    /*Calculate the number of columns and rows */
    columns = floor(width / unitLength);
    rows = floor(height / unitLength);

    /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
    currentBoard = [];
    nextBoard = [];
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = [];
        nextBoard[i] = []
    }
    // Now both currentBoard and nextBoard are array of array of undefined values.
    init();  // Set the initial values of the currentBoard and nextBoard
}

/**
* Initialize/reset the board state
*/
function init() {

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = 0;
            nextBoard[i][j] = 0;

            //random init
            // currentBoard[i][j] = floor(random(0,2));
            // nextBoard[i][j] = 0;

        }
    }
}

function draw() {
    if (!start) {
        return
    }
    background(255);
    frameRate(fr)
    generate();
    drawOnCanvas()

}
function drawOnCanvas() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] == 1) {
                let boxColor = color(255, 0, 0)
                fill(boxColor);
            } else {
                fill(255);
            }
            stroke(strokeColor);
            rect(i * unitLength, j * unitLength, unitLength, unitLength);
        }
    }
}



function generate(selectedSurvivalFromUI) {
    // alert("line85")
    console.log("IB.js    " + selectedSurvivalFromUI);
    //survival difficlut
    if (selectedSurvivalFromUI == "normal") {
        a = 2;
        b = 3;
    } else if (selectedSurvivalFromUI == "easy") {
        a = 1;
        b = 6;
    } else if (selectedSurvivalFromUI == "hard") {
        a = 4;
        b = 1;
    }
    console.log("a => " + a + ", b => " + b);

    //Loop over every single box on the board
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            // Count all living members in the Moore neighborhood(8 boxes surrounding)
            let neighbors = 0;
            for (let i of [-1, 0, 1]) {
                for (let j of [-1, 0, 1]) {
                    if (i == 0 && j == 0) {
                        // the cell itself is not its own neighbor
                        continue;
                    }
                    // The modulo operator is crucial for wrapping on the edge
                    neighbors += currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
                }
            }
            // Rules of Life - Normal
            if (currentBoard[x][y] == 1 && neighbors < a) {
                // Die of Loneliness
                nextBoard[x][y] = 0;

            } else if (currentBoard[x][y] == 1 && neighbors > b) {
                // Die of Overpopulation
                nextBoard[x][y] = 0;

            } else if (currentBoard[x][y] == 0 && neighbors == 3) {
                // New life due to Reproduction

                nextBoard[x][y] = 1;
            } else {
                // Stasis
                nextBoard[x][y] = currentBoard[x][y];
            }


        }
    }

    // Swap the nextBoard to be the current Board
    [currentBoard, nextBoard] = [nextBoard, currentBoard];
}

/**
 * When mouse is dragged
 */

function mouseMoved() {
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    if (prevMouseX != x || prevMouseY != y) {
        cleanShadow()
    }
    drawOnCanvas()
    prevMouseX = x
    prevMouseY = y
    if (selectedPattern || selectedPattern !== 'no') {
        placeShadow(x, y)
    }
}
function mouseDragged() {
    /**
     * If the mouse coordinate is outside the board
     */
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);

    if (!selectedPattern || selectedPattern === 'no') {
        currentBoard[x][y] = 1;
        fill(boxColor);
        stroke(strokeColor);
        rect(x * unitLength, y * unitLength, unitLength, unitLength);
    } else {
        placePattern(x, y)
    }

}

/**
 * When mouse is pressed
 */
function mousePressed() {
    noLoop();
    mouseDragged();
}

/**
 * When mouse is released
 */
function mouseReleased() {
    loop();
}

// document.querySelector('#reset-game')
// 	.addEventListener('click', function() {
// 		init();
// 	});

//start & stop button
const btn = document.querySelector(".start-button");
btn.addEventListener("click", updateBtn);
function updateBtn() {
    // if (btn.textContent === "Start") {
    //     btn.textContent = "Stop";
    // } else {
    //     btn.textContent = "Start";
    // }
    if (start) {
        start = false;
        document.querySelector('.start-button').innerText = 'Start Game';
    } else {
        start = true;
        document.querySelector('.start-button').innerText = 'Stop Game';
    }
}

//survival botton
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// //survival button
// const surbtn = document.querySelector(".sur-normal-btn");
// surbtn.addEventListener("click", updateBtn);
// function updateBtn() {
//     if(survival){ // imcompleted below
//         start = false;
//         document.querySelector('.start-button').innerText = 'Start';
//     }else{
//         start = true;
//         document.querySelector('.start-button').innerText = 'stop';
//     }
// }

//adjust frameRate
document.querySelector('.slider')
    .addEventListener('click', function (event) {
        console.log(event.currentTarget.value);
        fr = parseInt(event.currentTarget.value);
        frameRate(fr);
    });

