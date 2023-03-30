var socket = io();
let side = 30;

function setup() {
    frameRate(5);
    createCanvas(30 * side, 30 * side);
    background('#acacac');
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
}

socket.on("send matrix", nkarel);
setInterval(
    function () {
        socket.on('send matrix', nkarel)
    }, 1000
);
