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

function matrixGenerator(matLen, gr, grEat, pred, vit, hun, add = 1) {
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
    for (let i = 0; i < hun; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    for (let i = 0; i < add; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 6;
        }
    }
    io.emit("send matrix", matrix);
    return matrix;
}
matrix = matrixGenerator(21, 21, 15, 7, 5, 11);

io.sockets.emit('send matrix', matrix);


grassArr = [];
grassEaterArr = [];
predatorArr = [];
vitaminArr = [];
hunterArr = [];
addArr = [];

const Grass = require("./grass");
const GrassEater = require("./grassEater");
const Add = require("./add");
const Predator = require("./predator");
const Hunter = require("./hunter");
const Vitamin = require("./vitamin");

function createObject(){
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                let gr = new Grass(j, i);
                grassArr.push(gr);
            }
            else if (matrix[i][j] == 2) {
                let gre = new GrassEater(j, i);
                grassEaterArr.push(gre);
            }
            else if (matrix[i][j] == 3) {
                let pr = new Predator(j, i);
                predatorArr.push(pr);
            }
            else if (matrix[i][j] == 4) {
                let vit = new Vitamin(j, i);
                vitaminArr.push(vit);
            }
            else if (matrix[i][j] == 5) {
                let hun = new Hunter(j, i);
                hunterArr.push(hun);
            }
            else if (matrix[i][j] == 6) {
                let add = new Add(j, i);
                addArr.push(add);
            }
        }
    }
    io.emit("send matrix", matrix);
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
        addArr[i].hunter()
    }
    for (let i in hunterArr) {
        hunterArr[i].mul()
        hunterArr[i].eat()
    }
    io.emit("send matrix", matrix);
}
setInterval(gameMove, 500);


var weath;

function winter() {
    weath = "winter";
    io.sockets.emit('winter', weath);
}

function spring() {
    weath = "spring";
    io.sockets.emit('spring', weath);
}

function summer() {
    weath = "summer";
    io.sockets.emit('summer', weath);
}

function autumn() {
    weath = "autumn";
    io.sockets.emit('autumn', weath);
}

function kill() {
    grassArr = [];
    grassEaterArr = [];
    gishatichner = [];
    hrashagorcarr = [];
    xotabuysarr = [];
    vorsordarr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addGrass() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
            var gr = new Grass(x, y);
            grassArr.push(gr);
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
    let count = 0;
    for (var i = 0; i < 50; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (count < 7) {
            if (i < 30) {
                if (matrix[y][x] == 0) {
                    count++;
                    matrix[y][x] = 2;
                    var grEater = new GrassEater(x, y);
                    grassEaterArr.push(grEater);
                }

            } else if (i >= 30) {
                if (matrix[y][x] == 0 || matrix[y][x] == 1) {
                    count++;
                    matrix[y][x] = 2;
                    var grEater = new GrassEater(x, y);
                    grassEaterArr.push(grEater);
                }
            }
        }


    }

    io.sockets.emit("send matrix", matrix);
}
function addPredator() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
            var predator = new Predator(x, y);
            predatorArr.push(predator);
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addHunter() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
            var hunter = new Hunter(x, y);
            hunterArr.push(hunter);
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addVitamin() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
            var vitamin = new Vitamin(x, y);
            vitaminArr.push(vitamin);
        }
    }
    io.sockets.emit("send matrix", matrix);
}

io.on('connection', function (socket) {
    socket.on("spring", spring);
    socket.on("summer", summer);
    socket.on("autumn", autumn);
    socket.on("winter", winter);
    socket.on("killAll", kill);
    socket.on("addGrass", addGrass);
    socket.on("addGrassEater", addGrassEater);
    socket.on("addPredator", addPredator);
    socket.on("addHunter", addHunter);
    socket.on("addVitamin", addVitamin);
})

var statistics = {};
setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predator = predatorArr.length;
    statistics.hunter = hunterArr.length;
    statistics.vitamin = vitaminArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000);