var socket = io();
let side = 30;

function setup() {
    frameRate(10);
    createCanvas(20 * side, 20 * side);
    background('#acacac');
}
socket.on("winter", function (data) {
    weath = data;
})
socket.on("summer", function (data) {
    weath = data;
})
socket.on("spring", function (data) {
    weath = data;
})
socket.on("autumn", function (data) {
    weath = data;
})
var weath = "spring";

function nkarel(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                if (weath == "spring") {
                    fill("lightgreen");   
                }
                else if (weath == "summer") {
                    fill("green");   
                }
                if (weath == "autumn") {
                    fill("darkorange")
                }
                if (weath == "winter") {
                    fill("white");   
                }
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
                fill("red");
            }
            else if (matrix[y][x] == 5) {
                fill("lightblue");
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

function winter() {
    socket.emit("winter");
}
function summer() {
    socket.emit("summer");
}
function spring() {
    socket.emit("spring");
}
function autumn() {
    socket.emit("autumn");
}
function killAll(){
    socket.emit("killAll");
}
function addGrass(){
    socket.emit("addGrass");
}
function addGrassEater(){
    socket.emit("addGrassEater");
}
function addPredator(){
    socket.emit("addPredator");
}
function addHunter(){
    socket.emit("addHunter");
}
function addVitamin(){
    socket.emit("addVitamin");
}
