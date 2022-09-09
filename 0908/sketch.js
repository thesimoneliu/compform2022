/* reference:
https://openprocessing.org/sketch/1232809
https://openprocessing.org/sketch/858895
*/

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

let textptsArray = []; // textpoints Array

let fontSize = 32;
let posXArr = 0;
let posYArr = 0;
let samplefactor = 1.9; // the number of the textpoints

let x = 0;
let y = 0;
let step = 0.1;
let k = 1;

const noiseZoom = 0.006; //how zoomed in the perlin noise is
const noiseOctaves = 4; //The number of octaves for the noise
const noiseFalloff = 0.5; //The falloff for the noise layers

const zOffsetChange = 0; //How much the noise field changes in the z direction each frame
const individualZOffset = 0.1; //how far away the points/lines are from each other in the z noise axies (the bigger the number, the more chaotic)
const lineSpeed = 0.5; //the maximum amount each point can move each frame



function preload() {
    font = loadFont('Archivo-Regular.ttf');
}

function setup() {
    createCanvas(500, 500);
    textFont(font);
    textSize(fontSize);
    angleMode(DEGREES);
    colorMode(HSB);
    background(0);
    //frameRate(10);
    frameCount = 0
    noiseDetail(noiseOctaves, noiseFalloff);
    noiseSeed(100000);

    textptsArray = addZOffset(createPointText('A', posXArr, posYArr, fontSize, samplefactor, 0));
    //followptsArray = createPointText('B', posXArr, posYArr, fontSize, 0.9, 0);
    console.log(textptsArray);
}

function draw() {
    stroke(colorGradient());
    noiseValue(textptsArray);

}


function colorGradient() {
    let col1 = color(293, 14, 95);
    let col2 = color(186, 18, 96); // blue_dark
    col = lerpColor(col1, col2, 0.5);
    return col;
}

function addZOffset(array) {

    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray[i] = array[i];
        newArray[i].zOffset = random();
    }
    return newArray;
}

function noiseValue(array) {
    // if (showText) {
    //     noStroke();
    //     text(string, width / 2 - textWidth(string) / 2, height / 2);
    //     stroke(strokeColor, strokeAlpha);
    // }

    array.forEach(each => {
        let noiseX = each.x * noiseZoom;
        let noiseY = each.y * noiseZoom;
        let noiseZ = frameCount * zOffsetChange + each.zOffset * individualZOffset;
        let param = map(mouseX, 0, width, -1, 1)
        let newPX = each.x + map(noise(noiseX, noiseY, noiseZ), 0, 1, -lineSpeed * param, lineSpeed * param);
        let newPY = each.y + map(noise(noiseX, noiseY, noiseZ + 214), 0, 1, -lineSpeed * param, lineSpeed * param);
        line(each.x, each.y, newPX, newPY);
        each.x = newPX;
        each.y = newPY;
    })

};

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