let LivingCreature = require('./LivingCreature');

module.exports = class Hunter extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 5;
        this.multiplay = 0;
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
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        if (newCell && this.multiply >= 30) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var newHunter = new Hunter(newX, newY);
            hunterArr.push(newHunter);
            this.multiply = 0;
        }
    }

    move() {
        this.energy--;
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
        else {
            if (this.energy < 0) {
                matrix[this.y][this.x] = 1;
            }
        }
    }
    
    eat() {
        var emptyCells = this.chooseCell(3);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        var emptyCells1 = this.chooseCell(4);
        var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)];

        if (newCell) {
            this.energy++;
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;

            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
        } else if (newCell1) {
            this.energy += 2;
            var newX = newCell1[0];
            var newY = newCell1[1];

            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;

            for (var i in vitaminArr) {
                if (newX == vitaminArr[i].x && newY == vitaminArr[i].y) {
                    vitaminArr.splice(i, 1);
                    break;
                }
            }
        }
        else {
            this.move();
        }
    }
}