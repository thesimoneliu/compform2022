let col_1, col_2, col_3, col_4, col_5, col_6;

/* ------------------------------ GUI Parameters ------------------------------ */
var params = {
    displayMode: true,
    // radius: 100,
    // length:5,
    bottom: 0.7,
    middle: 0.5,
    top: 0.5,
};

var gui = new dat.gui.GUI();
gui.add(params, "displayMode");
// gui.add(params, "radius").min(100).max(200).step(1);
// gui.add(params, "length").min(1).max(5).step(1);
gui.add(params, "bottom").min(0.1).max(1.5).step(0.01);
gui.add(params, "middle").min(0.1).max(1.5).step(0.01);
gui.add(params, "top").min(0.1).max(1.5).step(0.01);


/* ------------------------------ rectangle shape class ------------------------------ */

function setup() {
    createCanvas(600, 800);
    background(220);
    rectMode(CORNER);
    colorMode(RGB);
    //blendMode(DIFFERENCE);

    col_1 = color(83, 11, 163); //purple-dark
    col_2 = color(140, 50, 240); //purple-light

    col_3 = color(108, 240, 148); //green-light
    col_4 = color(240, 153, 29); //ornage

    col_5 = color(163, 98, 3); //yellow
    col_6 = color(23, 50, 100);

    for (let i = 0; i < height; i++) {
        let n = map(i, 0, height, 0, 1);
        let col_line = lerpColor(col_1, col_2, n);
        stroke(col_line);
        line(0, i, width, i);
    }
}

function draw() {
    //background(col_1);
    noStroke();
    let length = 2;
    let radius = 150;

    // let angle = random(0,100);
    // rotate(sin(angle));



    for (let i = 0; i < 1; i = i + 0.01) {

        let baseline = 450;
        let x = i * length * params.bottom * radius;

        let col_56 = lerpColor(col_3, col_4, i);
        fill(col_56);
        ellipse(width / 2, baseline + x, radius);
        //console.log(i,x);
    };

    for (let i = 0; i < 1; i = i + 0.01) {

        let baseline = 300;
        let x = i * length * params.middle * radius;

        let col_34 = lerpColor(col_2, col_3, i);
        fill(col_34);
        ellipse(width / 2, baseline + x, radius);
    };

    for (let i = 0; i < 1; i = i + 0.01) {

        let baseline = 120;
        let x = i * length * params.top * radius;

        let col_12 = lerpColor(col_1, col_2, i);
        fill(col_12);
        ellipse(width / 2, baseline + x, radius);
    };

}

/* ------------------------------ oscillation as speed ------------------------------ */

function osc(scale) {
    if (!scale) {
        scale = 1;
    }
    //return abs(cos(frameCount * 0.01 * scale));
    return sin(frameCount * 0.01 * scale);
}