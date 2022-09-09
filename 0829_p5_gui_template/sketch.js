// paper.js template

// window.onload = function() {
//     const canvas = document.getElementById("myCanvas");
//     paper.setup(canvas);
//     const path = new paper.Path();
//     path.strokeColor = "black";
//     const start = new paper.Point(100, 100);
//     path.moveTo(start);
//     path.lineTo(start.add([200, -50]));
//     paper.view.draw();
// };


/* ------------------------------ GUI Parameters ------------------------------ */
var params = {
    displayMode: true,
    debugMode: false,
    windMode: false,
    n: 4.5,
    d: 12.3,
    t: 80,
    s: 105,
    c: 0,
    angle: 0,
    step: 2,
    p: 20,
    test: 12
};

var gui = new dat.gui.GUI();
gui.add(params, "displayMode");
gui.add(params, "debugMode");
gui.add(params, "windMode");
gui.add(params, "s").min(20).max(350).step(1);
gui.add(params, "angle").min(-5).max(5).step(0.01);
gui.add(params, "t").min(40).max(400).step(1);
gui.add(params, "test").min(1).max(15).step(0.1);


/* ------------------------------ new setup ------------------------------ */

function setup() {
    createCanvas(400, 400);
    let myNumber = 100;
    let myColor = color(255, 0, 0);
    let myChoice = ['one', 'two', 'three'];
    var gui = createGUI('p5.js debug');
    gui.addGlobals('myColor', 'myNumber', 'myChoice');
}

function draw() {
    background(200);
    fill(100);
    ellipse(0, 10, 10);
}



/* ------------------------------ oscillation as speed ------------------------------ */

function osc(scale) {
    if (!scale) {
        scale = 1;
    }
    return abs(sin(frameCount * 0.01 * scale));
}

/* ------------------------------ follow lerp effect ------------------------------ */

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