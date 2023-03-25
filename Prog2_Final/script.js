//function generator(matLen, gr, grEat, pred, vit, add=1) {
//  let matrix = [];
//for (let i = 0; i < matLen; i++) {
//  matrix[i] = [];
//for (let j = 0; j < matLen; j++) {
//  matrix[i][j] = 0;
//}
//    } 
//    for (let i = 0; i < gr; i++) {
//        let x = Math.floor(Math.random() * matLen);
//      let y = Math.floor(Math.random() * matLen);
//    if (matrix[x][y] == 0) {
//      matrix[x][y] = 1;
//}
//  }
//for (let i = 0; i < grEat; i++) {
//  let x = Math.floor(Math.random() * matLen);
//let y = Math.floor(Math.random() * matLen);
// if (matrix[x][y] == 0) {
//     matrix[x][y] = 2;
//}
//}
//for (let i = 0; i < pred; i++) {
//    let x = Math.floor(Math.random() * matLen);
//    let y = Math.floor(Math.random() * matLen);
//    if (matrix[x][y] == 0) {
//        matrix[x][y] = 3;
//    }
//}
//     for (let i = 0; i < vit; i++) {
//         let x = Math.floor(Math.random() * matLen);
//         let y = Math.floor(Math.random() * matLen);
//         if (matrix[x][y] == 0) {
//             matrix[x][y] = 4;
//         }
//     }
//     for (let i = 0; i < add; i++) {
//         let x = Math.floor(Math.random() * matLen);
//         let y = Math.floor(Math.random() * matLen);
//         if (matrix[x][y] == 0) {
//             matrix[x][y] = 5;
//         }
//     }
//     return matrix;
// }

var socket = io();
let side = 30;
// let matrix = generator(21, 21, 15, 7, 5, 11);
// let grassArr = []
// let grassEaterArr = []
// let predatorArr = []
// let vitaminArr = []
// let addArr = []

function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    // for (let i = 0; i < matrix.length; i++) {
    //     for (let j = 0; j < matrix[i].length; j++) {
    //         if (matrix[i][j] == 1) {
    //             let gr = new Grass(j, i)
    //             grassArr.push(gr)
    //         }
    //         else if (matrix[i][j] == 2) {
    //             let gre = new GrassEater(j, i)
    //             grassEaterArr.push(gre)
    //         }
    //         else if (matrix[i][j] == 3) {
    //             let pr = new Predator(j, i)
    //             predatorArr.push(pr)
    //         }
    //         else if (matrix[i][j] == 4) {
    //             let vit = new Vitamin(j, i)
    //             vitaminArr.push(vit)
    //         }
    //         else if (matrix[i][j] == 5) {
    //             let add = new Add(j, i)
    //             addArr.push(add)
    //         }
    //     }
    // }
}

function nkarel(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 3) {
                fill("blue");
            }
            else if (matrix[y][x] == 4) {
                fill("white");
            }
            else if (matrix[y][x] == 5) {
                fill("#acacac");
            }
            strokeWeight(5)
            rect(x * side, y * side, side, side);
        }
    }

    // for (let i in grassArr) {
    //     grassArr[i].mul()
    // }
    // for (let i in grassEaterArr) {
    //     grassEaterArr[i].mul()
    //     grassEaterArr[i].eat()
    // }
    // for (let i in predatorArr) {
    //     predatorArr[i].mul()
    //     predatorArr[i].eat()
    // }
    // for (let i in vitaminArr) {
    //     vitaminArr[i].mul()
    //     vitaminArr[i].move()
    // }
    // for (let i in addArr) {
    //     addArr[i].grass()
    //     addArr[i].grassEater()
    //     addArr[i].predator()
    //     addArr[i].vitamin()
    // }
}

setInterval(
    function () {
        socket.on('send matrix', nkarel)
    }, 1000
);