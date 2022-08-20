let selectedPattern = ""
// bug: `
// // ...........O.......
// // ..........OOOO.....
// // .........O...OO.OO.
// // .......O.....O..OO.
// // .....OOO.......O..O
// // .OO.OO...O.........
// // .OO..O..O..........
// // O..O...............
// // `,
const patternLib = {
    bug: `
O..O..
O..O..
O..O..

`,
    tree: `
........................O...........
......................O.O...........
............OO......OO............OO
...........O...O....OO............OO
OO........O.....O...OO..............
OO........O...O.OO....O.O...........
..........O.....O.......O...........
...........O...O....................
............OO......................
`,
    ship: `
.....................O...
..................OOOO...
.............O..O.OO.....
.............O...........
OOOO........O...O.OO.....
O...O.....OO.OO.O.O.OOOOO
O.........OO.O.O.O..OOOOO
.O..O..OO..O...OOO..O.OO.
......O..O.OO............
......O....OO............
......O..O.OO............
.O..O..OO..O...OOO..O.OO.
O.........OO.O.O.O..OOOOO
O...O.....OO.OO.O.O.OOOOO
OOOO........O...O.OO.....
.............O...........
.............O..O.OO.....
..................OOOO...
.....................O...    
`,
}
// function placeShadow(startX, startY) {

//     if (selectedPattern === 'no' || !selectedPattern) {
//         return
//     }

//     let result = patternLib[selectedPattern].split('\n')

//     result.pop()
//     result.shift()


//     for (let i = 0; i < result.length; i++) {  //row
//         for (let j = 0; j < result[i].length; j++) { //col
//             if (result[i][j] === 'O') {
//                 fill('green')
//                 rect(
//                     ((i + startX)) * unitLength,
//                     ((j + startY)) * unitLength,
//                     unitLength,
//                     unitLength);
//             }
//         }
//     }

// }

// function cleanShadow() {
//     if (selectedPattern === 'no' || !selectedPattern) {
//         return
//     }

//     let result = patternLib[selectedPattern].split('\n')

//     result.pop()
//     result.shift()


//     for (let i = 0; i < result.length; i++) {  //row
//         for (let j = 0; j < result[i].length; j++) { //col
//             if (currentBoard[i + prevMouseX][j + prevMouseY] == 1) {
//                 let boxColor = color(255, 0, 0)
//                 fill(boxColor);
//             } else {
//                 fill(255);
//             }
//             // stroke(strokeColor);
//             rect(i + prevMouseX * unitLength, j + prevMouseY * unitLength, unitLength, unitLength);
//         }
//     }
// }
function placePattern(startX, startY) {
    if (selectedPattern === 'no' || !selectedPattern) {
        return
    }

    let result = patternLib[selectedPattern].split('\n')

    result.pop()
    result.shift()


    for (let i = 0; i < result.length; i++) {  //row
        for (let j = 0; j < result[i].length; j++) { //col
            if (result[i][j] === '.') {
                currentBoard[(j + startX + columns) % columns][(i + startY + rows) % rows] = 0
            } else {
                currentBoard[(j + startX + columns) % columns][(i + startY + rows) % rows] = 1

            }
        }
    }

}

let radioElems = document.querySelectorAll("[type=radio]")
for (let radioElem of radioElems) {
    radioElem.addEventListener('change', () => {
        selectedPattern = document.querySelector('input[name=pattern]:checked').value
    })
}

let radioElems2 = document.querySelectorAll("[type=radio]")
for (let radioElem2 of radioElems2) {
    radioElem2.addEventListener('change', () => {
        selectedSurvival = document.querySelector('input[name=pattern]:checked').value
    })
}