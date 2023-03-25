var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, () => {
    console.log('connected');
});


matrix = [];

function generator(matLen, gr, grEat, pred, vit, add=1) {
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    } 
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pred; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < vit; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < add; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    return matrix;
}
matrix = generator(21, 21, 15, 7, 5, 11);

io.sockets.emit('send matrix', matrix);


grassArr = []
grassEaterArr = []
predatorArr = []
vitaminArr = []
addArr = []

const Grass = require("./grass");
const GrassEater = require("./grassEater");
const Add = require("./add");
const Predator = require("./predator");
const Vitamin = require("./vitamin");

function createObject(){
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                let gr = new Grass(j, i)
                grassArr.push(gr)
            }
            else if (matrix[i][j] == 2) {
                let gre = new GrassEater(j, i)
                grassEaterArr.push(gre)
            }
            else if (matrix[i][j] == 3) {
                let pr = new Predator(j, i)
                predatorArr.push(pr)
            }
            else if (matrix[i][j] == 4) {
                let vit = new Vitamin(j, i)
                vitaminArr.push(vit)
            }
            else if (matrix[i][j] == 5) {
                let add = new Add(j, i)
                addArr.push(add)
            }
        }
    }
}
createObject();

function gameMove() {
    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].mul()
        grassEaterArr[i].eat()
    }
    for (let i in predatorArr) {
        predatorArr[i].mul()
        predatorArr[i].eat()
    }
    for (let i in vitaminArr) {
        vitaminArr[i].mul()
        vitaminArr[i].move()
    }
    for (let i in addArr) {
        addArr[i].grass()
        addArr[i].grassEater()
        addArr[i].predator()
        addArr[i].vitamin()
    }
}
setInterval(gameMove, 3000);