/* reference:

*/

/* ------------------------------ GUI Parameters ------------------------------ */
// var params = {
//     displayMode: true,
//     test: 12
// };

// var gui = new dat.gui.GUI();
// gui.add(params, "displayMode");
// gui.add(params, "s").min(20).max(350).step(1);


/* ------------------------------ setup ------------------------------ */


let shapeArray = [];
let numShape = 5;


function setup() {
    createCanvas(400, 400);
    colorMode(HSB);
    //rectMode(CENTER);
    //angleMode(DEGREES);
    frameRate(1);
    noStroke();

    for (let i = 0; i < numShape; i++) {
        //let posX = (random(-1, 1) + random(-1, 1)) / 2 * width;
        let posX = random(-1, 1) * random(-1, 1) * width;
        let posY = random(-1, 1) * random(-1, 1) * height;
        let shape = new Shape(posX, posY);
        shapeArray.push(shape);
    }
    //console.log(shapeArray);

}

function draw() {
    //let col = '#F0E9D8'; //colorset1
    //let col = '#789BD6'; // colorset2: blue
    let col = "#B80E25";
    background(250);
    noStroke();


    colorNoise(col);

    /*------------------------- colored quads -------------------------*/
    // push();
    // translate(width / 2, height / 2);

    // let angle = random(0, 360);
    // rotate(angle);

    // shapeArray.forEach(shape => {

    //     //ColorSet1: yellow-ish
    //     // let h = random(20, 50);
    //     // let s = random(60, 90);
    //     // let b = random(30, 100);

    //     //ColorSet2: red
    //     let h = 358;
    //     let s = 100;
    //     let b = random(30, 100);
    //     let col = color(h, s, b);
    //     fill(col);

    //     push();
    //     let angle = random(-5, 5);
    //     rotate(angle);

    //     //num:15-35
    //     // let shapeW = random(20, 100);
    //     // let shapeH = random(1, 120);

    //     //num:0-5
    //     let shapeW = (random(10, 200) + random(10, 200)) / 2;
    //     let shapeH = (random(50, 280) + random(50, 280)) / 2;
    //     shape.drawQuad(shapeW, shapeH);
    //     pop();
    // })
    // pop();


}

function keyPressed() {
    if (keyCode == '83') {
        saveCanvas('img', 'jpg');
    };
}

function colorNoise(col) {
    let paintColor = color(col);
    let paintAlpha;
    //let edge = random(0.1, 0.9)

    for (let i = 0; i < width; i += random(1, 5) * 3) {
        for (let j = 0; j < height; j += random(2, 5)) {

            let centerX = width / 2;
            let centerY = height / 2;
            let d = dist(centerX, centerY, i, j);
            rectMode(CENTER);
            if (d > 100) {

                paintAlpha = random(0.1)
                paintColor.setAlpha(paintAlpha)
                fill(paintColor)
                if (random(3) < 2) {
                    rect(i + random(-5, 10), j + random(-5, 5), random(10), random(5))
                } else {
                    rect(i + random(-15, 10), j + random(-2, 2), random(2), random(20))
                }

            } else {
                paintAlpha = (random(15, 100) + random(15, 100) + random(15, 100)) / 3 / 100;
                paintColor.setAlpha(paintAlpha)
                fill(paintColor)
                if (random(3) < 2) {
                    rect(i + random(-5, 5), j + random(-5, 5), random(20), random(35))
                } else {
                    rect(i + random(-10, 10), j + random(-3, 3), random(20), random(5))
                }
            }
            //console.log(paintAlpha, i, j);
        }
    }

}

function heart(angle) {
    // let R = 10 - pow(random(1), 5) * 10;
    let R = 200;
    let posX = R * (16 * sin(angle) * sin(angle) * sin(angle));
    let posY = -1 * R * (13 * cos(angle) - 5 * cos(2 * angle) - 2 * cos(3 * angle) - cos(4 * angle));
    //ellipse(x, y, radius);
    return { posX, posY }
}

class Shape {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    drawQuad(w, h) {
        this.deltaW = w;
        this.deltaH = h;

        let vertexLean = random(0.95, 1);
        quad(this.x, this.y,
            this.x + this.deltaW, this.y,
            this.x + this.deltaW * vertexLean, this.y + this.deltaH * vertexLean,
            this.x, this.y + this.deltaH);
        // beginShape();
        // vertex(this.x, this.y);
        // vertex(this.x + this.deltaW, this.y);
        // vertex(this.x, this.y + this.deltaH);
        // vertex(this.x + this.deltaW * vertexLean, this.y + this.deltaH * vertexLean);
        // endShape(CLOSE);
    }

}