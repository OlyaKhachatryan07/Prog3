class Add {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 10;
        this.multiply = 0
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    grassEater() {
        this.multiply++;

        if (grassEaterArr.length == 0){
            var emptyCells = this.chooseCell(0);
            var newCell = random(emptyCells);

            if (newCell && this.multiply >= 115) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = 2;
    
                var newGrassEater = new GrassEater(newX, newY);
                grassEaterArr.push(newGrassEater);
                this.multiply = 0;
            }
        }
    }

    grass() {
        this.multiply++;

        if (grassArr.length == 0){
            var emptyCells = this.chooseCell(0);
            var newCell = random(emptyCells);

            if (newCell && this.multiply >= 115) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = 1;
    
                var newGrass = new Grass(newX, newY);
                grassArr.push(newGrass);
                this.multiply = 0;
            }
        }
    }

    predator() {
        this.multiply++;

        if (predatorArr.length == 0){
            var emptyCells = this.chooseCell(0);
            var newCell = random(emptyCells);

            if (newCell && this.multiply >= 115) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = 3;
    
                var newPredator = new Predator(newX, newY);
                predatorArr.push(newPredator);
                this.multiply = 0;
            }
        }
    }

    vitamin() {
        this.multiply++;

        if (vitaminArr.length == 0){
            var emptyCells = this.chooseCell(0);
            var newCell = random(emptyCells);

            if (newCell && this.multiply >= 115) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = 4;
    
                var newVitamin = new Vitamin(newX, newY);
                vitaminArr.push(newVitamin);
                this.multiply = 0;
            }
        }
    }
}