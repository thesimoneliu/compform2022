/* ------------------------------ GUI Parameters ------------------------------ */
// var params = {
//     displayMode: true,
//     debugMode: false,
//     windMode: false,
//     n: 4.5,
//     d: 12.3,
//     t: 80,
//     s: 105,
//     c: 0,
//     angle: 0,
//     step: 2,
//     p: 20,
//     test: 12
// };

// var gui = new dat.gui.GUI();
// gui.add(params, "displayMode");
// gui.add(params, "debugMode");
// gui.add(params, "windMode");
// gui.add(params, "s").min(20).max(350).step(1);
// gui.add(params, "angle").min(-5).max(5).step(0.01);
// gui.add(params, "t").min(40).max(400).step(1);
// gui.add(params, "test").min(1).max(15).step(0.1);


/* ------------------------------ setup ------------------------------ */

let font;
let fontSize = 32;
let tptsArray = []; // textpoints Array
let tptsBox = []; // textpoints borderbox
let posXArr = 0;
let posYArr = 0;
let followptsArray = []; // followpoints Array
let followPoints = [];
let x = 0;
let y = 0;
let step = 0.1;
let k = 1;
let col;

function preload() {
    font = loadFont('Archivo-Regular.ttf');
}

function setup() {
    createCanvas(500, 500);
    textFont(font);
    textSize(fontSize);
    angleMode(DEGREES);
    colorMode(HSB);
    frameRate(10);

    tptsArray = createPointText('A', posXArr, posYArr, fontSize, 1, 0);
    followptsArray = createPointText('B', posXArr, posYArr, fontSize, 0.9, 0);
}

function draw() {
    let col1 = color(301, 19, 100); //type
    let col3 = color(279, 67, 62);
    let col2 = color(192, 60, 92); // color(100, 29, 92);
    col = lerpColor(col2, col3, k / 10);
    background(col);
    //text(txt, posXArr, posYArr);

    let n = map(x, 0, width, 0, 360);
    let m = map(y, 0, height, 0.5, 10);
    k = map(y, 0, height, 10, 0.1);

    /* ----------------------- text2point testing ----------------------- */
    //beginShape();
    for (let i = 0; i < tptsArray.length; i++) {

        push();
        translate(tptsArray[i].x, tptsArray[i].y);
        // let n = map(mouseX, 0, width, 0, 360);
        // let m = map(mouseY, 0, height, 1, 10);
        // let k = map(mouseY, height, 0, 1, 10);

        rotate(n);
        blendMode(OVERLAY);
        stroke(col1);
        strokeWeight(k / 10);
        line(5 * m, 5 * m, -5 * m, -5 * m);
        line(5 * m, -5 * m, -5 * m, 5 * m);
        pop();

        x = x + step;
        y = y + step;
        //console.log(i, x, y, step, k);

        if (x >= width || x <= 0) {
            step = -step;
        }

        // vertex(tptsArray[i].x, tptsArray[i].y);

        // tptsArray[i].x = tptsArray[i].x + osc(1);
        // tptsArray[i].y = tptsArray[i].y + osc(1);

        // if (i < tptsArray.length / 2) {
        //     //vertex(tptsArray[i].x, tptsArray[i].y);
        //     //ellipse(tptsArray[i].x, tptsArray[i].y, 10);
        //     line(0, 0, tptsArray[i].x, tptsArray[i].y);
        //     line(width, 0, tptsArray[i].x, tptsArray[i].y);
        // } else if (i > tptsArray.length / 4 * 3) {
        //     line(width / 2, y, tptsArray[i].x, tptsArray[i].y);
        // }

        // ellipse(tptsArray[i].x, tptsArray[i].y, 10);
        // point(tptsArray[i].x, tptsArray[i].y);
    }
    //endShape(CLOSE);



}


/* --------- returns an array of text points with an x and y for the given text ----------- */

function createPointText(text, x, y, fontSize, sampleFactor, simplifyThreshold) {
    let textPoints = font.textToPoints(text, x, y, fontSize, {
        sampleFactor: sampleFactor,
        simplifyThreshold: simplifyThreshold
    });
    let bounds = font.textBounds(text, x, y, fontSize);
    // console.log(bounds,bounds.w,bounds.h);

    // scale each letter to fit the screen
    textPoints.forEach(letter => {
        letter.x = letter.x * (width - 100) / bounds.w + 40;
        letter.y = letter.y * (height - 100) / bounds.h + (height - 50);
    });
    return textPoints;
}

/* ---------- Creates an osscilator that transitions between 0 an 1 a the given scale ----------- */

function osc(scale) {
    if (!scale) {
        scale = 1;
    }
    //return abs(sin(frameCount * 0.01 * scale));
    return sin(frameCount * 0.01 * scale);
}

/* ---------- build animation index ----------- */
// function mousePressed() {
//     animationIndex += 1;
//     animationIndex = animationIndex % 6;
// }

/* ------------------------------ follow lerp effect ------------------------------ */
// Handels interpolating a point towards the a give position using setPos.
// requires: update() to be called every frame and a function for drawing
// to be passed into draw().
class Follow {

    constructor(x, y) {
        this.currPos = createVector(x, y);
        this.finalPos = createVector(x, y);
        this.speed = random(0.1, .2);
    }

    setPos(x, y) {
        this.finalPos.set(x, y);
    }

    update() {
        this.currPos = p5.Vector.lerp(this.currPos, this.finalPos, this.speed); // follow shadow effect
    }

    draw(functionToDraw) {
        // functionToDraw(this.currPos.x, this.currPos.y);
        functionToDraw(this.currPos.x, this.currPos.y);
        // ellipse(this.currPos.x, this.currPos.y, 25, 25);
    }

}